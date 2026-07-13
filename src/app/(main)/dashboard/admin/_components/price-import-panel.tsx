"use client";

import * as React from "react";

import { AlertCircle, CheckCircle2, Download, Upload } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { bulkImportPricesAction } from "@/server/pricing-actions";

type ParsedRow = { salesmanCode: string; productSku: string; price: number };
type ParseError = { row: number; message: string };

function parseCsv(text: string): { rows: ParsedRow[]; errors: ParseError[] } {
  const lines = text.trim().split(/\r?\n/);
  const rows: ParsedRow[] = [];
  const errors: ParseError[] = [];

  // Skip header row if it looks like a header
  const startIdx = lines[0]?.toLowerCase().includes("salesman") ? 1 : 0;

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (!line) continue;
    const cols = line.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
    if (cols.length < 3) {
      errors.push({ row: i + 1, message: `Expected 3 columns, got ${cols.length}` });
      continue;
    }
    const salesmanCode = cols[0] ?? "";
    const productSku = cols[1] ?? "";
    const priceRaw = cols[2] ?? "";
    const price = Number(priceRaw);
    if (!salesmanCode) {
      errors.push({ row: i + 1, message: "Salesman code is empty." });
      continue;
    }
    if (!productSku) {
      errors.push({ row: i + 1, message: "Product SKU is empty." });
      continue;
    }
    if (Number.isNaN(price) || price <= 0) {
      errors.push({ row: i + 1, message: `Invalid price: "${priceRaw}"` });
      continue;
    }
    rows.push({ salesmanCode, productSku, price });
  }

  return { rows, errors };
}

function downloadTemplate() {
  const csv = `salesman_code,product_sku,price\nSM001,PROD-001,25.50\nSM001,PROD-002,18.00\nSM002,PROD-001,24.00\n`;
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "price-matrix-template.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function PriceImportPanel() {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<{ rows: ParsedRow[]; errors: ParseError[] } | null>(null);
  const [importing, setImporting] = React.useState(false);
  const [result, setResult] = React.useState<{ created: number; errors: string[] } | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  async function handleFile(f: File) {
    setFile(f);
    setResult(null);
    const text = await f.text();
    setPreview(parseCsv(text));
  }

  async function handleImport() {
    if (!preview || preview.rows.length === 0) return;
    setImporting(true);
    const res = await bulkImportPricesAction(preview.rows);
    setImporting(false);
    if (res.success) {
      setResult({ created: res.created, errors: res.errors });
      setFile(null);
      setPreview(null);
      if (res.errors.length === 0) {
        toast.success(`Imported ${res.created} price entries.`);
      } else {
        toast.warning(`Imported ${res.created} entries with ${res.errors.length} error(s).`);
      }
    } else {
      toast.error("Import failed", { description: res.error });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Price Matrix Import</CardTitle>
        <CardDescription>
          Upload a CSV with columns: <code className="rounded bg-muted px-1 text-xs">salesman_code, product_sku, price</code>.
          Existing active prices are expired and replaced — all changes are auditable.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Template download */}
        <Button size="sm" variant="outline" className="w-fit gap-2" onClick={downloadTemplate}>
          <Download className="size-3.5" />
          Download CSV template
        </Button>

        <Separator />

        {/* File upload */}
        <div
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 transition-colors hover:bg-muted/30"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files[0];
            if (f) void handleFile(f);
          }}
        >
          <Upload className="mb-2 size-8 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            {file ? file.name : "Drop your CSV here, or click to browse"}
          </p>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
            }}
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{preview.rows.length} valid rows</Badge>
              {preview.errors.length > 0 && (
                <Badge variant="destructive">{preview.errors.length} parse errors</Badge>
              )}
            </div>

            {preview.errors.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>Parse errors (these rows will be skipped)</AlertTitle>
                <AlertDescription>
                  <ul className="mt-1 list-disc pl-4 text-xs">
                    {preview.errors.slice(0, 10).map((e, i) => (
                      <li key={i}>Row {e.row}: {e.message}</li>
                    ))}
                    {preview.errors.length > 10 && <li>…and {preview.errors.length - 10} more</li>}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {preview.rows.length > 0 && (
              <>
                <div className="max-h-48 overflow-y-auto rounded border text-xs">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-muted text-left">
                      <tr>
                        <th className="px-3 py-1.5 font-medium">Salesman code</th>
                        <th className="px-3 py-1.5 font-medium">Product SKU</th>
                        <th className="px-3 py-1.5 text-right font-medium">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {preview.rows.slice(0, 100).map((r, i) => (
                        <tr key={i}>
                          <td className="px-3 py-1">{r.salesmanCode}</td>
                          <td className="px-3 py-1">{r.productSku}</td>
                          <td className="px-3 py-1 text-right font-mono">{r.price.toFixed(2)}</td>
                        </tr>
                      ))}
                      {preview.rows.length > 100 && (
                        <tr>
                          <td colSpan={3} className="px-3 py-1 text-center text-muted-foreground">
                            …and {preview.rows.length - 100} more rows
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <Button
                  size="sm"
                  disabled={importing}
                  onClick={() => void handleImport()}
                  className="gap-2"
                >
                  {importing ? <Spinner className="size-3.5" /> : <Upload className="size-3.5" />}
                  {importing ? "Importing…" : `Import ${preview.rows.length} rows`}
                </Button>
              </>
            )}
          </div>
        )}

        {/* Result */}
        {result && (
          <Alert>
            <CheckCircle2 className="size-4" />
            <AlertTitle>Import complete — {result.created} entries created</AlertTitle>
            {result.errors.length > 0 && (
              <AlertDescription>
                <ul className="mt-1 list-disc pl-4 text-xs">
                  {result.errors.slice(0, 5).map((e, i) => <li key={i}>{e}</li>)}
                  {result.errors.length > 5 && <li>…and {result.errors.length - 5} more errors</li>}
                </ul>
              </AlertDescription>
            )}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
