"use client";

import * as React from "react";

import { Upload } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { bulkImportAction } from "@/server/bulk-import-actions";

type ImportType = "salesmen" | "products";

const SCHEMAS: Record<ImportType, { fields: string[]; example: string }> = {
  salesmen: {
    fields: ["name", "code", "phone", "email", "address"],
    example: "name,code,phone\nAhmed Hassan,SM001,01012345678",
  },
  products: {
    fields: ["name", "sku", "unit", "base_price", "category"],
    example: "name,sku,unit,base_price\nKaiser Roll,PROD001,piece,2.50",
  },
};

export function BulkImportPanel() {
  const [importType, setImportType] = React.useState<ImportType>("salesmen");
  const [rows, setRows] = React.useState<Record<string, string>[]>([]);
  const [headers, setHeaders] = React.useState<string[]>([]);
  const [fileName, setFileName] = React.useState<string>("");
  const [submitting, setSubmitting] = React.useState(false);
  const [resultSummary, setResultSummary] = React.useState<{
    inserted: number;
    skipped: number;
    errors: string[];
  } | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResultSummary(null);
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setHeaders(results.meta.fields ?? []);
        setRows(results.data.slice(0, 200));
      },
    });
  }

  async function handleImport() {
    if (rows.length === 0) {
      toast.error("No data to import");
      return;
    }
    setSubmitting(true);
    const result = await bulkImportAction(importType, rows);
    setSubmitting(false);
    if (result.success) {
      setResultSummary(result.summary);
      toast.success("Import complete", {
        description: `${result.summary.inserted} inserted, ${result.summary.skipped} skipped`,
      });
      setRows([]);
      setHeaders([]);
      setFileName("");
      if (fileRef.current) fileRef.current.value = "";
    } else {
      toast.error("Import failed", { description: result.error });
    }
  }

  const schema = SCHEMAS[importType];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="size-4" />
          Bulk CSV Import
        </CardTitle>
        <CardDescription>
          Upload a CSV file to bulk-import salesmen or products. Maximum 200 rows per upload. Duplicates (by code/SKU)
          are skipped.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Import Type</span>
            <Select
              value={importType}
              onValueChange={(v) => {
                setImportType(v as ImportType);
                setRows([]);
                setHeaders([]);
                setFileName("");
                setResultSummary(null);
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="salesmen">Salesmen</SelectItem>
                  <SelectItem value="products">Products</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">CSV File</span>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleFile}
              className="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-1.5 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
            />
          </div>
        </div>

        <Alert className="text-xs">
          <AlertDescription>
            <strong>Expected columns:</strong>{" "}
            {schema.fields.map((f) => (
              <Badge key={f} variant="outline" className="mr-1 text-xs">
                {f}
              </Badge>
            ))}
            <br />
            <strong>Example:</strong>
            <code className="ml-1 text-xs">{schema.example.split("\n")[0]}</code>
          </AlertDescription>
        </Alert>

        {rows.length > 0 && (
          <>
            <div className="text-muted-foreground text-sm">
              Preview: {rows.length} row{rows.length !== 1 ? "s" : ""} from <strong>{fileName}</strong>
            </div>
            <div className="max-h-52 overflow-auto rounded-md border border-border/60">
              <Table>
                <TableHeader>
                  <TableRow>
                    {headers.map((h) => (
                      <TableHead key={h} className="whitespace-nowrap text-xs">
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.slice(0, 10).map((row, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: preview table — row index is stable
                    <TableRow key={i}>
                      {headers.map((h) => (
                        <TableCell key={h} className="max-w-32 truncate py-1.5 text-xs">
                          {row[h] ?? ""}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {rows.length > 10 && <p className="text-muted-foreground text-xs">…and {rows.length - 10} more rows</p>}
          </>
        )}

        {resultSummary && (
          <Alert>
            <AlertDescription className="text-sm">
              ✓ Inserted <strong>{resultSummary.inserted}</strong> rows. Skipped{" "}
              <strong>{resultSummary.skipped}</strong> (duplicates).
              {resultSummary.errors.length > 0 && (
                <div className="mt-1 text-destructive text-xs">{resultSummary.errors.slice(0, 5).join("; ")}</div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <div>
          <Button onClick={handleImport} disabled={rows.length === 0 || submitting}>
            {submitting && <Spinner className="size-4" />}
            Import {rows.length > 0 ? `${rows.length} rows` : ""}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
