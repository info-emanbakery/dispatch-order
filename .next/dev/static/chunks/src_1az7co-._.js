(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/chart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChartContainer",
    ()=>ChartContainer,
    "ChartLegend",
    ()=>ChartLegend,
    "ChartLegendContent",
    ()=>ChartLegendContent,
    "ChartStyle",
    ()=>ChartStyle,
    "ChartTooltip",
    ()=>ChartTooltip,
    "ChartTooltipContent",
    ()=>ChartTooltipContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = {
    light: "",
    dark: ".dark"
};
const INITIAL_DIMENSION = {
    width: 320,
    height: 200
};
const ChartContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](null);
function useChart() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(1);
    if ($[0] !== "c4801064f56b18fe3abccfda348a842ef42fc78815f01aa1a4de783a20e51ad5") {
        for(let $i = 0; $i < 1; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c4801064f56b18fe3abccfda348a842ef42fc78815f01aa1a4de783a20e51ad5";
    }
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](ChartContext);
    if (!context) {
        throw new Error("useChart must be used within a <ChartContainer />");
    }
    return context;
}
_s(useChart, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function ChartContainer(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(30);
    if ($[0] !== "c4801064f56b18fe3abccfda348a842ef42fc78815f01aa1a4de783a20e51ad5") {
        for(let $i = 0; $i < 30; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c4801064f56b18fe3abccfda348a842ef42fc78815f01aa1a4de783a20e51ad5";
    }
    let children;
    let className;
    let config;
    let id;
    let props;
    let t1;
    if ($[1] !== t0) {
        ({ id, className, children, config, initialDimension: t1, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = config;
        $[5] = id;
        $[6] = props;
        $[7] = t1;
    } else {
        children = $[2];
        className = $[3];
        config = $[4];
        id = $[5];
        props = $[6];
        t1 = $[7];
    }
    const initialDimension = t1 === undefined ? INITIAL_DIMENSION : t1;
    const uniqueId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]();
    let t2;
    if ($[8] !== id || $[9] !== uniqueId) {
        t2 = id ?? uniqueId.replace(/:/g, "");
        $[8] = id;
        $[9] = uniqueId;
        $[10] = t2;
    } else {
        t2 = $[10];
    }
    const chartId = `chart-${t2}`;
    let t3;
    if ($[11] !== config) {
        t3 = {
            config
        };
        $[11] = config;
        $[12] = t3;
    } else {
        t3 = $[12];
    }
    let t4;
    if ($[13] !== className) {
        t4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden", className);
        $[13] = className;
        $[14] = t4;
    } else {
        t4 = $[14];
    }
    let t5;
    if ($[15] !== chartId || $[16] !== config) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartStyle, {
            id: chartId,
            config: config
        }, void 0, false, {
            fileName: "[project]/src/components/ui/chart.tsx",
            lineNumber: 117,
            columnNumber: 10
        }, this);
        $[15] = chartId;
        $[16] = config;
        $[17] = t5;
    } else {
        t5 = $[17];
    }
    let t6;
    if ($[18] !== children || $[19] !== initialDimension) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
            initialDimension: initialDimension,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/ui/chart.tsx",
            lineNumber: 126,
            columnNumber: 10
        }, this);
        $[18] = children;
        $[19] = initialDimension;
        $[20] = t6;
    } else {
        t6 = $[20];
    }
    let t7;
    if ($[21] !== chartId || $[22] !== props || $[23] !== t4 || $[24] !== t5 || $[25] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-slot": "chart",
            "data-chart": chartId,
            className: t4,
            ...props,
            children: [
                t5,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/chart.tsx",
            lineNumber: 135,
            columnNumber: 10
        }, this);
        $[21] = chartId;
        $[22] = props;
        $[23] = t4;
        $[24] = t5;
        $[25] = t6;
        $[26] = t7;
    } else {
        t7 = $[26];
    }
    let t8;
    if ($[27] !== t3 || $[28] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartContext.Provider, {
            value: t3,
            children: t7
        }, void 0, false, {
            fileName: "[project]/src/components/ui/chart.tsx",
            lineNumber: 147,
            columnNumber: 10
        }, this);
        $[27] = t3;
        $[28] = t7;
        $[29] = t8;
    } else {
        t8 = $[29];
    }
    return t8;
}
_s1(ChartContainer, "j7NPILheLIfrWAvm8S/GM4Sml/8=");
_c = ChartContainer;
const ChartStyle = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "c4801064f56b18fe3abccfda348a842ef42fc78815f01aa1a4de783a20e51ad5") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c4801064f56b18fe3abccfda348a842ef42fc78815f01aa1a4de783a20e51ad5";
    }
    const { id, config } = t0;
    let t1;
    if ($[1] !== config) {
        t1 = Object.entries(config).filter(_temp);
        $[1] = config;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const colorConfig = t1;
    if (!colorConfig.length) {
        return null;
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = Object.entries(THEMES);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== colorConfig || $[5] !== id) {
        t3 = t2.map((t4)=>{
            const [theme, prefix] = t4;
            return `
${prefix} [data-chart=${id}] {
${colorConfig.map((t5)=>{
                const [key, itemConfig] = t5;
                const color = itemConfig.theme?.[theme] ?? itemConfig.color;
                return color ? `  --color-${key}: ${color};` : null;
            }).join("\n")}
}
`;
        });
        $[4] = colorConfig;
        $[5] = id;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    const t4 = t3.join("\n");
    let t5;
    if ($[7] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
            dangerouslySetInnerHTML: {
                __html: t4
            }
        }, void 0, false, {
            fileName: "[project]/src/components/ui/chart.tsx",
            lineNumber: 210,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[7] = t4;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    return t5;
};
_c1 = ChartStyle;
const ChartTooltip = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"];
function ChartTooltipContent(t0) {
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(46);
    if ($[0] !== "c4801064f56b18fe3abccfda348a842ef42fc78815f01aa1a4de783a20e51ad5") {
        for(let $i = 0; $i < 46; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c4801064f56b18fe3abccfda348a842ef42fc78815f01aa1a4de783a20e51ad5";
    }
    const { active, payload, className, indicator: t1, hideLabel: t2, hideIndicator: t3, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey } = t0;
    const indicator = t1 === undefined ? "dot" : t1;
    const hideLabel = t2 === undefined ? false : t2;
    const hideIndicator = t3 === undefined ? false : t3;
    const { config } = useChart();
    let t4;
    bb0: {
        if (hideLabel || !payload?.length) {
            t4 = null;
            break bb0;
        }
        const [item] = payload;
        const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
        let t5;
        if ($[1] !== config || $[2] !== item || $[3] !== key) {
            t5 = getPayloadConfigFromPayload(config, item, key);
            $[1] = config;
            $[2] = item;
            $[3] = key;
            $[4] = t5;
        } else {
            t5 = $[4];
        }
        const itemConfig = t5;
        const value = !labelKey && typeof label === "string" ? config[label]?.label ?? label : itemConfig?.label;
        if (labelFormatter) {
            let t6;
            if ($[5] !== labelClassName) {
                t6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-medium", labelClassName);
                $[5] = labelClassName;
                $[6] = t6;
            } else {
                t6 = $[6];
            }
            let t7;
            if ($[7] !== labelFormatter || $[8] !== payload || $[9] !== value) {
                t7 = labelFormatter(value, payload);
                $[7] = labelFormatter;
                $[8] = payload;
                $[9] = value;
                $[10] = t7;
            } else {
                t7 = $[10];
            }
            let t8;
            if ($[11] !== t6 || $[12] !== t7) {
                t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: t6,
                    children: t7
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/chart.tsx",
                    lineNumber: 291,
                    columnNumber: 14
                }, this);
                $[11] = t6;
                $[12] = t7;
                $[13] = t8;
            } else {
                t8 = $[13];
            }
            t4 = t8;
            break bb0;
        }
        if (!value) {
            t4 = null;
            break bb0;
        }
        let t6;
        if ($[14] !== labelClassName) {
            t6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-medium", labelClassName);
            $[14] = labelClassName;
            $[15] = t6;
        } else {
            t6 = $[15];
        }
        let t7;
        if ($[16] !== t6 || $[17] !== value) {
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: t6,
                children: value
            }, void 0, false, {
                fileName: "[project]/src/components/ui/chart.tsx",
                lineNumber: 315,
                columnNumber: 12
            }, this);
            $[16] = t6;
            $[17] = value;
            $[18] = t7;
        } else {
            t7 = $[18];
        }
        t4 = t7;
    }
    const tooltipLabel = t4;
    if (!active || !payload?.length) {
        return null;
    }
    const nestLabel = payload.length === 1 && indicator !== "dot";
    let t5;
    if ($[19] !== className) {
        t5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className);
        $[19] = className;
        $[20] = t5;
    } else {
        t5 = $[20];
    }
    const t6 = !nestLabel ? tooltipLabel : null;
    let t7;
    if ($[21] !== color || $[22] !== config || $[23] !== formatter || $[24] !== hideIndicator || $[25] !== indicator || $[26] !== nameKey || $[27] !== nestLabel || $[28] !== payload || $[29] !== tooltipLabel) {
        let t8;
        if ($[31] !== color || $[32] !== config || $[33] !== formatter || $[34] !== hideIndicator || $[35] !== indicator || $[36] !== nameKey || $[37] !== nestLabel || $[38] !== tooltipLabel) {
            t8 = ({
                "ChartTooltipContent[(anonymous)()]": (item_1, index)=>{
                    const key_0 = `${nameKey ?? item_1.name ?? item_1.dataKey ?? "value"}`;
                    const itemConfig_0 = getPayloadConfigFromPayload(config, item_1, key_0);
                    const indicatorColor = color ?? item_1.payload?.fill ?? item_1.color;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground", indicator === "dot" && "items-center"),
                        children: formatter && item_1?.value !== undefined && item_1.name ? formatter(item_1.value, item_1.name, item_1, index, item_1.payload) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                itemConfig_0?.icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(itemConfig_0.icon, {}, void 0, false, {
                                    fileName: "[project]/src/components/ui/chart.tsx",
                                    lineNumber: 347,
                                    columnNumber: 345
                                }, this) : !hideIndicator && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", {
                                        "h-2.5 w-2.5": indicator === "dot",
                                        "w-1": indicator === "line",
                                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                                        "my-0.5": nestLabel && indicator === "dashed"
                                    }),
                                    style: {
                                        "--color-bg": indicatorColor,
                                        "--color-border": indicatorColor
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/chart.tsx",
                                    lineNumber: 347,
                                    columnNumber: 387
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid gap-1.5",
                                            children: [
                                                nestLabel ? tooltipLabel : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: itemConfig_0?.label ?? item_1.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ui/chart.tsx",
                                                    lineNumber: 355,
                                                    columnNumber: 213
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ui/chart.tsx",
                                            lineNumber: 355,
                                            columnNumber: 150
                                        }, this),
                                        item_1.value != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono font-medium text-foreground tabular-nums",
                                            children: typeof item_1.value === "number" ? item_1.value.toLocaleString() : String(item_1.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ui/chart.tsx",
                                            lineNumber: 355,
                                            columnNumber: 327
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ui/chart.tsx",
                                    lineNumber: 355,
                                    columnNumber: 44
                                }, this)
                            ]
                        }, void 0, true)
                    }, index, false, {
                        fileName: "[project]/src/components/ui/chart.tsx",
                        lineNumber: 347,
                        columnNumber: 18
                    }, this);
                }
            })["ChartTooltipContent[(anonymous)()]"];
            $[31] = color;
            $[32] = config;
            $[33] = formatter;
            $[34] = hideIndicator;
            $[35] = indicator;
            $[36] = nameKey;
            $[37] = nestLabel;
            $[38] = tooltipLabel;
            $[39] = t8;
        } else {
            t8 = $[39];
        }
        t7 = payload.filter(_ChartTooltipContentPayloadFilter).map(t8);
        $[21] = color;
        $[22] = config;
        $[23] = formatter;
        $[24] = hideIndicator;
        $[25] = indicator;
        $[26] = nameKey;
        $[27] = nestLabel;
        $[28] = payload;
        $[29] = tooltipLabel;
        $[30] = t7;
    } else {
        t7 = $[30];
    }
    let t8;
    if ($[40] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-1.5",
            children: t7
        }, void 0, false, {
            fileName: "[project]/src/components/ui/chart.tsx",
            lineNumber: 386,
            columnNumber: 10
        }, this);
        $[40] = t7;
        $[41] = t8;
    } else {
        t8 = $[41];
    }
    let t9;
    if ($[42] !== t5 || $[43] !== t6 || $[44] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t5,
            children: [
                t6,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/chart.tsx",
            lineNumber: 394,
            columnNumber: 10
        }, this);
        $[42] = t5;
        $[43] = t6;
        $[44] = t8;
        $[45] = t9;
    } else {
        t9 = $[45];
    }
    return t9;
}
_s2(ChartTooltipContent, "NieUY0Ve7cD6UfQwSGHz8JXgxAc=", false, function() {
    return [
        useChart
    ];
});
_c2 = ChartTooltipContent;
function _ChartTooltipContentPayloadFilter(item_0) {
    return item_0.type !== "none";
}
const ChartLegend = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"];
function ChartLegendContent(t0) {
    _s3();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "c4801064f56b18fe3abccfda348a842ef42fc78815f01aa1a4de783a20e51ad5") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c4801064f56b18fe3abccfda348a842ef42fc78815f01aa1a4de783a20e51ad5";
    }
    const { className, hideIcon: t1, payload, verticalAlign: t2, nameKey } = t0;
    const hideIcon = t1 === undefined ? false : t1;
    const verticalAlign = t2 === undefined ? "bottom" : t2;
    const { config } = useChart();
    if (!payload?.length) {
        return null;
    }
    const t3 = verticalAlign === "top" ? "pb-3" : "pt-3";
    let t4;
    if ($[1] !== className || $[2] !== t3) {
        t4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-center gap-4", t3, className);
        $[1] = className;
        $[2] = t3;
        $[3] = t4;
    } else {
        t4 = $[3];
    }
    let t5;
    if ($[4] !== config || $[5] !== hideIcon || $[6] !== nameKey || $[7] !== payload) {
        let t6;
        if ($[9] !== config || $[10] !== hideIcon || $[11] !== nameKey) {
            t6 = ({
                "ChartLegendContent[(anonymous)()]": (item_0, index)=>{
                    const key = `${nameKey ?? item_0.dataKey ?? "value"}`;
                    const itemConfig = getPayloadConfigFromPayload(config, item_0, key);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"),
                        children: [
                            itemConfig?.icon && !hideIcon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(itemConfig.icon, {}, void 0, false, {
                                fileName: "[project]/src/components/ui/chart.tsx",
                                lineNumber: 449,
                                columnNumber: 166
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-2 w-2 shrink-0 rounded-[2px]",
                                style: {
                                    backgroundColor: item_0.color
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/chart.tsx",
                                lineNumber: 449,
                                columnNumber: 188
                            }, this),
                            itemConfig?.label
                        ]
                    }, index, true, {
                        fileName: "[project]/src/components/ui/chart.tsx",
                        lineNumber: 449,
                        columnNumber: 18
                    }, this);
                }
            })["ChartLegendContent[(anonymous)()]"];
            $[9] = config;
            $[10] = hideIcon;
            $[11] = nameKey;
            $[12] = t6;
        } else {
            t6 = $[12];
        }
        t5 = payload.filter(_ChartLegendContentPayloadFilter).map(t6);
        $[4] = config;
        $[5] = hideIcon;
        $[6] = nameKey;
        $[7] = payload;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[13] !== t4 || $[14] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t4,
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/components/ui/chart.tsx",
            lineNumber: 472,
            columnNumber: 10
        }, this);
        $[13] = t4;
        $[14] = t5;
        $[15] = t6;
    } else {
        t6 = $[15];
    }
    return t6;
}
_s3(ChartLegendContent, "NieUY0Ve7cD6UfQwSGHz8JXgxAc=", false, function() {
    return [
        useChart
    ];
});
_c3 = ChartLegendContent;
function _ChartLegendContentPayloadFilter(item) {
    return item.type !== "none";
}
function getPayloadConfigFromPayload(config, payload, key) {
    if (typeof payload !== "object" || payload === null) {
        return undefined;
    }
    const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : undefined;
    let configLabelKey = key;
    if (key in payload && typeof payload[key] === "string") {
        configLabelKey = payload[key];
    } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
        configLabelKey = payloadPayload[key];
    }
    return configLabelKey in config ? config[configLabelKey] : config[key];
}
;
function _temp(t0) {
    const [, config_0] = t0;
    return config_0.theme ?? config_0.color;
}
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "ChartContainer");
__turbopack_context__.k.register(_c1, "ChartStyle");
__turbopack_context__.k.register(_c2, "ChartTooltipContent");
__turbopack_context__.k.register(_c3, "ChartLegendContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PerformanceOverview",
    ()=>PerformanceOverview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addHours$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/addHours.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfToday$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/endOfToday.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/parseISO.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/subHours.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ComposedChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/ComposedChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/chart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const chartValues = [
    {
        newCustomers: 23840,
        activeAccounts: 6630,
        returningUsers: 4880
    },
    {
        newCustomers: 11508,
        activeAccounts: 6468,
        returningUsers: 4643
    },
    {
        newCustomers: 9975,
        activeAccounts: 6117,
        returningUsers: 4573
    },
    {
        newCustomers: 10310,
        activeAccounts: 6152,
        returningUsers: 4657
    },
    {
        newCustomers: 12244,
        activeAccounts: 6473,
        returningUsers: 4657
    },
    {
        newCustomers: 11476,
        activeAccounts: 6347,
        returningUsers: 4533
    },
    {
        newCustomers: 9944,
        activeAccounts: 6250,
        returningUsers: 4588
    },
    {
        newCustomers: 10259,
        activeAccounts: 6417,
        returningUsers: 4763
    },
    {
        newCustomers: 9698,
        activeAccounts: 6256,
        returningUsers: 4710
    },
    {
        newCustomers: 8435,
        activeAccounts: 6161,
        returningUsers: 4544
    },
    {
        newCustomers: 8885,
        activeAccounts: 6510,
        returningUsers: 4595
    },
    {
        newCustomers: 13596,
        activeAccounts: 6497,
        returningUsers: 4712
    },
    {
        newCustomers: 6198,
        activeAccounts: 6165,
        returningUsers: 4654
    },
    {
        newCustomers: 6546,
        activeAccounts: 6295,
        returningUsers: 4622
    },
    {
        newCustomers: 8306,
        activeAccounts: 6444,
        returningUsers: 4732
    },
    {
        newCustomers: 7445,
        activeAccounts: 6283,
        returningUsers: 4711
    },
    {
        newCustomers: 6646,
        activeAccounts: 6409,
        returningUsers: 4551
    },
    {
        newCustomers: 8146,
        activeAccounts: 6520,
        returningUsers: 4593
    },
    {
        newCustomers: 8754,
        activeAccounts: 6197,
        returningUsers: 4776
    },
    {
        newCustomers: 8715,
        activeAccounts: 6205,
        returningUsers: 4745
    },
    {
        newCustomers: 10154,
        activeAccounts: 6557,
        returningUsers: 4600
    },
    {
        newCustomers: 10337,
        activeAccounts: 6438,
        returningUsers: 4641
    },
    {
        newCustomers: 14212,
        activeAccounts: 6251,
        returningUsers: 4715
    },
    {
        newCustomers: 18873,
        activeAccounts: 6557,
        returningUsers: 4633
    },
    {
        newCustomers: 11558,
        activeAccounts: 6338,
        returningUsers: 4626
    },
    {
        newCustomers: 9951,
        activeAccounts: 6218,
        returningUsers: 4769
    },
    {
        newCustomers: 8716,
        activeAccounts: 6518,
        returningUsers: 4749
    },
    {
        newCustomers: 9690,
        activeAccounts: 6520,
        returningUsers: 4565
    },
    {
        newCustomers: 9423,
        activeAccounts: 6157,
        returningUsers: 4581
    },
    {
        newCustomers: 8563,
        activeAccounts: 6268,
        returningUsers: 4839
    },
    {
        newCustomers: 9255,
        activeAccounts: 6489,
        returningUsers: 4730
    },
    {
        newCustomers: 22106,
        activeAccounts: 6317,
        returningUsers: 4619
    },
    {
        newCustomers: 7765,
        activeAccounts: 6346,
        returningUsers: 4670
    },
    {
        newCustomers: 14487,
        activeAccounts: 6470,
        returningUsers: 4708
    },
    {
        newCustomers: 10830,
        activeAccounts: 6194,
        returningUsers: 4589
    },
    {
        newCustomers: 9486,
        activeAccounts: 6172,
        returningUsers: 4584
    },
    {
        newCustomers: 9200,
        activeAccounts: 6529,
        returningUsers: 4754
    },
    {
        newCustomers: 11020,
        activeAccounts: 6417,
        returningUsers: 4751
    },
    {
        newCustomers: 11085,
        activeAccounts: 6153,
        returningUsers: 4565
    },
    {
        newCustomers: 10372,
        activeAccounts: 6317,
        returningUsers: 4558
    },
    {
        newCustomers: 10936,
        activeAccounts: 6323,
        returningUsers: 4692
    },
    {
        newCustomers: 10196,
        activeAccounts: 6436,
        returningUsers: 4665
    },
    {
        newCustomers: 8744,
        activeAccounts: 6407,
        returningUsers: 4589
    },
    {
        newCustomers: 9592,
        activeAccounts: 6429,
        returningUsers: 4670
    },
    {
        newCustomers: 14952,
        activeAccounts: 6061,
        returningUsers: 4691
    },
    {
        newCustomers: 7242,
        activeAccounts: 6150,
        returningUsers: 4532
    },
    {
        newCustomers: 15297,
        activeAccounts: 6568,
        returningUsers: 4511
    },
    {
        newCustomers: 7844,
        activeAccounts: 6248,
        returningUsers: 4870
    },
    {
        newCustomers: 7336,
        activeAccounts: 6181,
        returningUsers: 4708
    },
    {
        newCustomers: 6548,
        activeAccounts: 6322,
        returningUsers: 4542
    },
    {
        newCustomers: 7496,
        activeAccounts: 6112,
        returningUsers: 4530
    },
    {
        newCustomers: 7529,
        activeAccounts: 6059,
        returningUsers: 4625
    },
    {
        newCustomers: 7369,
        activeAccounts: 6401,
        returningUsers: 4570
    },
    {
        newCustomers: 9434,
        activeAccounts: 6303,
        returningUsers: 4514
    },
    {
        newCustomers: 10387,
        activeAccounts: 5984,
        returningUsers: 4633
    },
    {
        newCustomers: 14173,
        activeAccounts: 6146,
        returningUsers: 4660
    },
    {
        newCustomers: 9635,
        activeAccounts: 6239,
        returningUsers: 4478
    },
    {
        newCustomers: 11690,
        activeAccounts: 6070,
        returningUsers: 4431
    },
    {
        newCustomers: 11148,
        activeAccounts: 6221,
        returningUsers: 4688
    },
    {
        newCustomers: 10205,
        activeAccounts: 6270,
        returningUsers: 4626
    },
    {
        newCustomers: 10773,
        activeAccounts: 5926,
        returningUsers: 4494
    },
    {
        newCustomers: 10134,
        activeAccounts: 5995,
        returningUsers: 4500
    },
    {
        newCustomers: 22444,
        activeAccounts: 6315,
        returningUsers: 4566
    },
    {
        newCustomers: 10213,
        activeAccounts: 6134,
        returningUsers: 4472
    },
    {
        newCustomers: 9788,
        activeAccounts: 5983,
        returningUsers: 4416
    },
    {
        newCustomers: 7646,
        activeAccounts: 6146,
        returningUsers: 4566
    },
    {
        newCustomers: 13396,
        activeAccounts: 6020,
        returningUsers: 4615
    },
    {
        newCustomers: 9889,
        activeAccounts: 5938,
        returningUsers: 4434
    },
    {
        newCustomers: 8999,
        activeAccounts: 6246,
        returningUsers: 4370
    },
    {
        newCustomers: 17176,
        activeAccounts: 6314,
        returningUsers: 4508
    },
    {
        newCustomers: 9602,
        activeAccounts: 5827,
        returningUsers: 4527
    },
    {
        newCustomers: 9663,
        activeAccounts: 5992,
        returningUsers: 4428
    },
    {
        newCustomers: 9542,
        activeAccounts: 6167,
        returningUsers: 4471
    },
    {
        newCustomers: 10921,
        activeAccounts: 5981,
        returningUsers: 4530
    },
    {
        newCustomers: 10557,
        activeAccounts: 6051,
        returningUsers: 4398
    },
    {
        newCustomers: 8774,
        activeAccounts: 6138,
        returningUsers: 4326
    },
    {
        newCustomers: 9607,
        activeAccounts: 5843,
        returningUsers: 4489
    },
    {
        newCustomers: 15883,
        activeAccounts: 5891,
        returningUsers: 4563
    },
    {
        newCustomers: 8805,
        activeAccounts: 6235,
        returningUsers: 4404
    },
    {
        newCustomers: 7551,
        activeAccounts: 6065,
        returningUsers: 4342
    },
    {
        newCustomers: 8177,
        activeAccounts: 5847,
        returningUsers: 4449
    },
    {
        newCustomers: 7534,
        activeAccounts: 6037,
        returningUsers: 4440
    },
    {
        newCustomers: 6902,
        activeAccounts: 6264,
        returningUsers: 4360
    },
    {
        newCustomers: 7832,
        activeAccounts: 5895,
        returningUsers: 4446
    },
    {
        newCustomers: 7311,
        activeAccounts: 6155,
        returningUsers: 4520
    },
    {
        newCustomers: 6245,
        activeAccounts: 6119,
        returningUsers: 4369
    },
    {
        newCustomers: 8128,
        activeAccounts: 5772,
        returningUsers: 4274
    },
    {
        newCustomers: 9848,
        activeAccounts: 5936,
        returningUsers: 4518
    },
    {
        newCustomers: 13995,
        activeAccounts: 6184,
        returningUsers: 4515
    },
    {
        newCustomers: 8963,
        activeAccounts: 5986,
        returningUsers: 4390
    },
    {
        newCustomers: 10872,
        activeAccounts: 5976,
        returningUsers: 4353
    },
    {
        newCustomers: 11036,
        activeAccounts: 6106,
        returningUsers: 4440
    },
    {
        newCustomers: 19721,
        activeAccounts: 6023,
        returningUsers: 4393
    },
    {
        newCustomers: 25079,
        activeAccounts: 5905,
        returningUsers: 4310
    },
    {
        newCustomers: 11054,
        activeAccounts: 6252,
        returningUsers: 4611
    },
    {
        newCustomers: 9769,
        activeAccounts: 6101,
        returningUsers: 4534
    },
    {
        newCustomers: 10977,
        activeAccounts: 5835,
        returningUsers: 4386
    },
    {
        newCustomers: 11193,
        activeAccounts: 6048,
        returningUsers: 4276
    },
    {
        newCustomers: 8766,
        activeAccounts: 6109,
        returningUsers: 4408
    },
    {
        newCustomers: 13370,
        activeAccounts: 5970,
        returningUsers: 4485
    },
    {
        newCustomers: 9279,
        activeAccounts: 6168,
        returningUsers: 4390
    },
    {
        newCustomers: 8581,
        activeAccounts: 6176,
        returningUsers: 4395
    },
    {
        newCustomers: 8002,
        activeAccounts: 5852,
        returningUsers: 4484
    },
    {
        newCustomers: 8811,
        activeAccounts: 6005,
        returningUsers: 4401
    },
    {
        newCustomers: 8261,
        activeAccounts: 6306,
        returningUsers: 4298
    },
    {
        newCustomers: 7857,
        activeAccounts: 6100,
        returningUsers: 4434
    },
    {
        newCustomers: 9836,
        activeAccounts: 6013,
        returningUsers: 4564
    },
    {
        newCustomers: 10372,
        activeAccounts: 6187,
        returningUsers: 4438
    },
    {
        newCustomers: 8604,
        activeAccounts: 6043,
        returningUsers: 4334
    },
    {
        newCustomers: 9027,
        activeAccounts: 6029,
        returningUsers: 4439
    },
    {
        newCustomers: 15778,
        activeAccounts: 6355,
        returningUsers: 4486
    },
    {
        newCustomers: 9732,
        activeAccounts: 6230,
        returningUsers: 4404
    },
    {
        newCustomers: 8909,
        activeAccounts: 5932,
        returningUsers: 4454
    },
    {
        newCustomers: 9279,
        activeAccounts: 6160,
        returningUsers: 4564
    },
    {
        newCustomers: 8207,
        activeAccounts: 6302,
        returningUsers: 4462
    },
    {
        newCustomers: 16222,
        activeAccounts: 6269,
        returningUsers: 4333
    },
    {
        newCustomers: 8695,
        activeAccounts: 6251,
        returningUsers: 4550
    },
    {
        newCustomers: 8282,
        activeAccounts: 6307,
        returningUsers: 4601
    },
    {
        newCustomers: 6307,
        activeAccounts: 6020,
        returningUsers: 4506
    },
    {
        newCustomers: 7191,
        activeAccounts: 6149,
        returningUsers: 4427
    },
    {
        newCustomers: 9014,
        activeAccounts: 6475,
        returningUsers: 4518
    },
    {
        newCustomers: 13671,
        activeAccounts: 6264,
        returningUsers: 4525
    },
    {
        newCustomers: 8484,
        activeAccounts: 6106,
        returningUsers: 4432
    },
    {
        newCustomers: 9909,
        activeAccounts: 6576,
        returningUsers: 4514
    },
    {
        newCustomers: 23158,
        activeAccounts: 6252,
        returningUsers: 4654
    },
    {
        newCustomers: 10314,
        activeAccounts: 6190,
        returningUsers: 4554
    },
    {
        newCustomers: 12158,
        activeAccounts: 6470,
        returningUsers: 4409
    },
    {
        newCustomers: 11810,
        activeAccounts: 6376,
        returningUsers: 4512
    },
    {
        newCustomers: 10126,
        activeAccounts: 6062,
        returningUsers: 4640
    },
    {
        newCustomers: 11137,
        activeAccounts: 6289,
        returningUsers: 4566
    },
    {
        newCustomers: 12120,
        activeAccounts: 6494,
        returningUsers: 4528
    },
    {
        newCustomers: 10293,
        activeAccounts: 6283,
        returningUsers: 4624
    },
    {
        newCustomers: 14431,
        activeAccounts: 6321,
        returningUsers: 4593
    },
    {
        newCustomers: 9549,
        activeAccounts: 6423,
        returningUsers: 4472
    },
    {
        newCustomers: 8487,
        activeAccounts: 6186,
        returningUsers: 4563
    },
    {
        newCustomers: 7935,
        activeAccounts: 6272,
        returningUsers: 4730
    },
    {
        newCustomers: 8825,
        activeAccounts: 6598,
        returningUsers: 4648
    },
    {
        newCustomers: 7814,
        activeAccounts: 6386,
        returningUsers: 4505
    },
    {
        newCustomers: 15233,
        activeAccounts: 6306,
        returningUsers: 4583
    },
    {
        newCustomers: 8133,
        activeAccounts: 6403,
        returningUsers: 4676
    },
    {
        newCustomers: 9451,
        activeAccounts: 6413,
        returningUsers: 4604
    },
    {
        newCustomers: 8181,
        activeAccounts: 6294,
        returningUsers: 4786
    },
    {
        newCustomers: 8262,
        activeAccounts: 6508,
        returningUsers: 4725
    },
    {
        newCustomers: 14874,
        activeAccounts: 6452,
        returningUsers: 4673
    },
    {
        newCustomers: 9428,
        activeAccounts: 6139,
        returningUsers: 4520
    },
    {
        newCustomers: 9471,
        activeAccounts: 6348,
        returningUsers: 4687
    },
    {
        newCustomers: 10439,
        activeAccounts: 6594,
        returningUsers: 4771
    },
    {
        newCustomers: 9282,
        activeAccounts: 6348,
        returningUsers: 4712
    },
    {
        newCustomers: 8014,
        activeAccounts: 6303,
        returningUsers: 4592
    },
    {
        newCustomers: 9456,
        activeAccounts: 6451,
        returningUsers: 4658
    },
    {
        newCustomers: 9750,
        activeAccounts: 6270,
        returningUsers: 4707
    },
    {
        newCustomers: 7623,
        activeAccounts: 6301,
        returningUsers: 4614
    },
    {
        newCustomers: 7441,
        activeAccounts: 6602,
        returningUsers: 4641
    },
    {
        newCustomers: 8613,
        activeAccounts: 6402,
        returningUsers: 4792
    },
    {
        newCustomers: 13354,
        activeAccounts: 6136,
        returningUsers: 4740
    },
    {
        newCustomers: 21487,
        activeAccounts: 6389,
        returningUsers: 4564
    },
    {
        newCustomers: 9481,
        activeAccounts: 6465,
        returningUsers: 4616
    },
    {
        newCustomers: 8932,
        activeAccounts: 6287,
        returningUsers: 4772
    },
    {
        newCustomers: 8855,
        activeAccounts: 6427,
        returningUsers: 4727
    },
    {
        newCustomers: 11234,
        activeAccounts: 6417,
        returningUsers: 4642
    },
    {
        newCustomers: 11850,
        activeAccounts: 6123,
        returningUsers: 4717
    },
    {
        newCustomers: 19042,
        activeAccounts: 6441,
        returningUsers: 4728
    },
    {
        newCustomers: 10788,
        activeAccounts: 6571,
        returningUsers: 4599
    },
    {
        newCustomers: 12062,
        activeAccounts: 6301,
        returningUsers: 4630
    },
    {
        newCustomers: 11104,
        activeAccounts: 6442,
        returningUsers: 4805
    },
    {
        newCustomers: 15697,
        activeAccounts: 6375,
        returningUsers: 4769
    },
    {
        newCustomers: 10622,
        activeAccounts: 6259,
        returningUsers: 4593
    },
    {
        newCustomers: 8993,
        activeAccounts: 6227,
        returningUsers: 4621
    },
    {
        newCustomers: 8066,
        activeAccounts: 6490,
        returningUsers: 4741
    },
    {
        newCustomers: 9249,
        activeAccounts: 6317,
        returningUsers: 4690
    },
    {
        newCustomers: 8439,
        activeAccounts: 6027,
        returningUsers: 4640
    },
    {
        newCustomers: 6207,
        activeAccounts: 6287,
        returningUsers: 4742
    },
    {
        newCustomers: 6868,
        activeAccounts: 6422,
        returningUsers: 4734
    },
    {
        newCustomers: 8206,
        activeAccounts: 6190,
        returningUsers: 4568
    },
    {
        newCustomers: 7467,
        activeAccounts: 6256,
        returningUsers: 4673
    },
    {
        newCustomers: 7595,
        activeAccounts: 6306,
        returningUsers: 4764
    },
    {
        newCustomers: 13895,
        activeAccounts: 6050,
        returningUsers: 4749
    },
    {
        newCustomers: 8293,
        activeAccounts: 6186,
        returningUsers: 4595
    },
    {
        newCustomers: 8744,
        activeAccounts: 6464,
        returningUsers: 4615
    },
    {
        newCustomers: 10727,
        activeAccounts: 6189,
        returningUsers: 4693
    }
];
const endDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfToday$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endOfToday"])();
const startDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(endDate, (chartValues.length - 1) * 12);
const chartData = chartValues.map((point, index)=>({
        date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addHours$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addHours"])(startDate, index * 12), "yyyy-MM-dd"),
        ...point
    }));
const chartConfig = {
    newCustomers: {
        label: "New Customers",
        color: "var(--chart-1)"
    },
    activeAccounts: {
        label: "Active Accounts",
        color: "var(--chart-2)"
    },
    returningUsers: {
        label: "Returning Users",
        color: "var(--chart-3)"
    }
};
function PerformanceOverview() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(13);
    if ($[0] !== "045cdf791f0f9c9bae118ab4d2a7f773656a0cb0ac39441f67bd312dc4afdf65") {
        for(let $i = 0; $i < 13; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "045cdf791f0f9c9bae118ab4d2a7f773656a0cb0ac39441f67bd312dc4afdf65";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
            className: "leading-none",
            children: "Customer Activity"
        }, void 0, false, {
            fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
            lineNumber: 761,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "@[540px]/card:block hidden",
                    children: "Customer activity for the last 3 months"
                }, void 0, false, {
                    fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                    lineNumber: 768,
                    columnNumber: 27
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "@[540px]/card:hidden",
                    children: "Last 3 months"
                }, void 0, false, {
                    fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                    lineNumber: 768,
                    columnNumber: 118
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
            lineNumber: 768,
            columnNumber: 10
        }, this);
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
            size: "sm",
            className: "w-28",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                placeholder: "3 months"
            }, void 0, false, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                lineNumber: 775,
                columnNumber: 52
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
            lineNumber: 775,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
            defaultValue: "quarter",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                children: "Period"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                                lineNumber: 782,
                                columnNumber: 73
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: "quarter",
                                children: "3 months"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                                lineNumber: 782,
                                columnNumber: 106
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                        lineNumber: 782,
                        columnNumber: 60
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                    lineNumber: 782,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
            lineNumber: 782,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
            size: "sm",
            className: "w-32",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                placeholder: "All segments"
            }, void 0, false, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                lineNumber: 789,
                columnNumber: 52
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
            lineNumber: 789,
            columnNumber: 10
        }, this);
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
            children: [
                t0,
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardAction"], {
                    className: "flex items-center gap-2",
                    children: [
                        t3,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                            defaultValue: "all",
                            children: [
                                t4,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                children: "Segments"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                                                lineNumber: 796,
                                                columnNumber: 141
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "all",
                                                children: "All segments"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                                                lineNumber: 796,
                                                columnNumber: 176
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "paid",
                                                children: "Paid"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                                                lineNumber: 796,
                                                columnNumber: 225
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "organic",
                                                children: "Organic"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                                                lineNumber: 796,
                                                columnNumber: 267
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                                        lineNumber: 796,
                                        columnNumber: 128
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                                    lineNumber: 796,
                                    columnNumber: 113
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                            lineNumber: 796,
                            columnNumber: 82
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            children: "View report"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                            lineNumber: 796,
                            columnNumber: 354
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                    lineNumber: 796,
                    columnNumber: 30
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
            lineNumber: 796,
            columnNumber: 10
        }, this);
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            top: 0
        };
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    let t7;
    let t8;
    let t9;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                id: "fillNewCustomers",
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                        offset: "5%",
                        stopColor: "var(--color-newCustomers)",
                        stopOpacity: 0.36
                    }, void 0, false, {
                        fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                        lineNumber: 814,
                        columnNumber: 82
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                        offset: "95%",
                        stopColor: "var(--color-newCustomers)",
                        stopOpacity: 0.04
                    }, void 0, false, {
                        fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                        lineNumber: 814,
                        columnNumber: 159
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                lineNumber: 814,
                columnNumber: 16
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
            lineNumber: 814,
            columnNumber: 10
        }, this);
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
            vertical: false,
            strokeOpacity: 0.5
        }, void 0, false, {
            fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
            lineNumber: 815,
            columnNumber: 10
        }, this);
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
            dataKey: "date",
            tickLine: false,
            axisLine: false,
            tickMargin: 8,
            minTickGap: 48,
            tickFormatter: _PerformanceOverviewXAxisTickFormatter
        }, void 0, false, {
            fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
            lineNumber: 816,
            columnNumber: 10
        }, this);
        $[8] = t7;
        $[9] = t8;
        $[10] = t9;
    } else {
        t7 = $[8];
        t8 = $[9];
        t9 = $[10];
    }
    let t10;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartTooltip"], {
            cursor: false,
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartTooltipContent"], {
                className: "w-50",
                indicator: "line",
                labelFormatter: _PerformanceOverviewChartTooltipContentLabelFormatter
            }, void 0, false, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                lineNumber: 827,
                columnNumber: 49
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
            lineNumber: 827,
            columnNumber: 11
        }, this);
        $[11] = t10;
    } else {
        t10 = $[11];
    }
    let t11;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            className: "@container/card",
            children: [
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartContainer"], {
                        config: chartConfig,
                        className: "aspect-auto h-80 w-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ComposedChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComposedChart"], {
                            data: chartData,
                            margin: t6,
                            children: [
                                t7,
                                t8,
                                t9,
                                t10,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartLegend"], {
                                    verticalAlign: "top",
                                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$chart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChartLegendContent"], {
                                        className: "mb-5 justify-end"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                                        lineNumber: 834,
                                        columnNumber: 238
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                                    lineNumber: 834,
                                    columnNumber: 196
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                    dataKey: "newCustomers",
                                    type: "natural",
                                    fill: "url(#fillNewCustomers)",
                                    stroke: "var(--color-newCustomers)",
                                    strokeWidth: 1.25,
                                    dot: false,
                                    fillOpacity: 1
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                                    lineNumber: 834,
                                    columnNumber: 293
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                    dataKey: "activeAccounts",
                                    type: "natural",
                                    stroke: "var(--color-activeAccounts)",
                                    strokeWidth: 1.4,
                                    dot: false
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                                    lineNumber: 834,
                                    columnNumber: 451
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                    dataKey: "returningUsers",
                                    type: "natural",
                                    stroke: "var(--color-returningUsers)",
                                    strokeWidth: 1.2,
                                    dot: false
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                                    lineNumber: 834,
                                    columnNumber: 566
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                            lineNumber: 834,
                            columnNumber: 135
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                        lineNumber: 834,
                        columnNumber: 62
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
                    lineNumber: 834,
                    columnNumber: 49
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(main)/dashboard/default/_components/performance-overview.tsx",
            lineNumber: 834,
            columnNumber: 11
        }, this);
        $[12] = t11;
    } else {
        t11 = $[12];
    }
    return t11;
}
_c = PerformanceOverview;
function _PerformanceOverviewChartTooltipContentLabelFormatter(value_0) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseISO"])(value_0), "d MMMM yyyy");
}
function _PerformanceOverviewXAxisTickFormatter(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseISO"])(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
    });
}
var _c;
__turbopack_context__.k.register(_c, "PerformanceOverview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(main)/dashboard/default/_components/data.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = [
    {
        "id": "18425",
        "name": "Sarah Parker",
        "email": "sarah.parker@northstar.io",
        "plan": "Enterprise",
        "status": "Subscribed",
        "billing": "Paid",
        "joined": "2026-04-30"
    },
    {
        "id": "18424",
        "name": "Michael Brown",
        "email": "michael.brown@cedarpoint.co",
        "plan": "Growth",
        "status": "Inactive",
        "billing": "Pending",
        "joined": "2026-04-29"
    },
    {
        "id": "18423",
        "name": "Linda Chen",
        "email": "linda.chen@brightpath.app",
        "plan": "Pro",
        "status": "Unsubscribed",
        "billing": "Overdue",
        "joined": "2026-04-28"
    },
    {
        "id": "18422",
        "name": "David Lee",
        "email": "david.lee@bluepeak.app",
        "plan": "Starter",
        "status": "Subscribed",
        "billing": "Trial",
        "joined": "2026-04-27"
    },
    {
        "id": "18421",
        "name": "Emily White",
        "email": "emily.white@ridgefield.io",
        "plan": "Enterprise",
        "status": "Inactive",
        "billing": "Paid",
        "joined": "2026-04-26"
    },
    {
        "id": "18420",
        "name": "Jessica Wong",
        "email": "jessica.wong@pulselabs.ai",
        "plan": "Growth",
        "status": "Unsubscribed",
        "billing": "Pending",
        "joined": "2026-04-25"
    },
    {
        "id": "18419",
        "name": "Kevin Harris",
        "email": "kevin.harris@oakline.co",
        "plan": "Pro",
        "status": "Subscribed",
        "billing": "Overdue",
        "joined": "2026-04-24"
    },
    {
        "id": "18418",
        "name": "Priya Shah",
        "email": "priya.shah@holloway.io",
        "plan": "Starter",
        "status": "Inactive",
        "billing": "Trial",
        "joined": "2026-04-23"
    },
    {
        "id": "18417",
        "name": "Daniel Hall",
        "email": "daniel.hall@quantix.dev",
        "plan": "Enterprise",
        "status": "Unsubscribed",
        "billing": "Paid",
        "joined": "2026-04-22"
    },
    {
        "id": "18416",
        "name": "Ava Mitchell",
        "email": "ava.mitchell@clearledger.co",
        "plan": "Growth",
        "status": "Subscribed",
        "billing": "Pending",
        "joined": "2026-04-21"
    },
    {
        "id": "18415",
        "name": "Noah Carter",
        "email": "noah.carter@streamline.app",
        "plan": "Pro",
        "status": "Inactive",
        "billing": "Overdue",
        "joined": "2026-04-20"
    },
    {
        "id": "18414",
        "name": "Sophia Turner",
        "email": "sophia.turner@westgate.io",
        "plan": "Starter",
        "status": "Subscribed",
        "billing": "Paid",
        "joined": "2026-04-19"
    },
    {
        "id": "18413",
        "name": "Liam Collins",
        "email": "liam.collins@firstharbor.co",
        "plan": "Enterprise",
        "status": "Subscribed",
        "billing": "Pending",
        "joined": "2026-04-18"
    },
    {
        "id": "18412",
        "name": "Mia Roberts",
        "email": "mia.roberts@northline.app",
        "plan": "Growth",
        "status": "Inactive",
        "billing": "Paid",
        "joined": "2026-04-17"
    },
    {
        "id": "18411",
        "name": "Ethan Brooks",
        "email": "ethan.brooks@wildelm.co",
        "plan": "Pro",
        "status": "Subscribed",
        "billing": "Trial",
        "joined": "2026-04-16"
    },
    {
        "id": "18410",
        "name": "Grace Murphy",
        "email": "grace.murphy@bridgepoint.io",
        "plan": "Starter",
        "status": "Unsubscribed",
        "billing": "Overdue",
        "joined": "2026-04-15"
    },
    {
        "id": "18409",
        "name": "Lucas Bennett",
        "email": "lucas.bennett@cedarpoint.co",
        "plan": "Enterprise",
        "status": "Subscribed",
        "billing": "Paid",
        "joined": "2026-04-14"
    },
    {
        "id": "18408",
        "name": "Zoe Kelly",
        "email": "zoe.kelly@vervegrid.app",
        "plan": "Growth",
        "status": "Inactive",
        "billing": "Pending",
        "joined": "2026-04-13"
    },
    {
        "id": "18407",
        "name": "Ryan Cooper",
        "email": "ryan.cooper@pulseforge.io",
        "plan": "Pro",
        "status": "Subscribed",
        "billing": "Paid",
        "joined": "2026-04-12"
    },
    {
        "id": "18406",
        "name": "Chloe Adams",
        "email": "chloe.adams@brightpath.app",
        "plan": "Starter",
        "status": "Unsubscribed",
        "billing": "Trial",
        "joined": "2026-04-11"
    },
    {
        "id": "18405",
        "name": "Nathan Reed",
        "email": "nathan.reed@northstar.io",
        "plan": "Enterprise",
        "status": "Subscribed",
        "billing": "Overdue",
        "joined": "2026-04-10"
    },
    {
        "id": "18404",
        "name": "Isla Foster",
        "email": "isla.foster@ridgefield.io",
        "plan": "Growth",
        "status": "Inactive",
        "billing": "Paid",
        "joined": "2026-04-09"
    },
    {
        "id": "18403",
        "name": "Owen Ward",
        "email": "owen.ward@streamline.app",
        "plan": "Pro",
        "status": "Subscribed",
        "billing": "Pending",
        "joined": "2026-04-08"
    },
    {
        "id": "18402",
        "name": "Ella Peterson",
        "email": "ella.peterson@oakline.co",
        "plan": "Starter",
        "status": "Inactive",
        "billing": "Trial",
        "joined": "2026-04-07"
    },
    {
        "id": "18401",
        "name": "Leo Jenkins",
        "email": "leo.jenkins@clearledger.co",
        "plan": "Enterprise",
        "status": "Subscribed",
        "billing": "Paid",
        "joined": "2026-04-06"
    },
    {
        "id": "18400",
        "name": "Aria Russell",
        "email": "aria.russell@pulselabs.ai",
        "plan": "Growth",
        "status": "Unsubscribed",
        "billing": "Overdue",
        "joined": "2026-04-05"
    },
    {
        "id": "18399",
        "name": "Jack Powell",
        "email": "jack.powell@wildelm.co",
        "plan": "Pro",
        "status": "Subscribed",
        "billing": "Pending",
        "joined": "2026-04-04"
    },
    {
        "id": "18398",
        "name": "Nora Simmons",
        "email": "nora.simmons@firstharbor.co",
        "plan": "Starter",
        "status": "Inactive",
        "billing": "Paid",
        "joined": "2026-04-03"
    },
    {
        "id": "18397",
        "name": "Henry Price",
        "email": "henry.price@westgate.io",
        "plan": "Enterprise",
        "status": "Subscribed",
        "billing": "Trial",
        "joined": "2026-04-02"
    },
    {
        "id": "18396",
        "name": "Lily Hughes",
        "email": "lily.hughes@bluepeak.app",
        "plan": "Growth",
        "status": "Unsubscribed",
        "billing": "Overdue",
        "joined": "2026-04-01"
    },
    {
        "id": "18395",
        "name": "Aiden Butler",
        "email": "aiden.butler@northline.app",
        "plan": "Pro",
        "status": "Subscribed",
        "billing": "Paid",
        "joined": "2026-03-31"
    },
    {
        "id": "18394",
        "name": "Hannah Perry",
        "email": "hannah.perry@holloway.io",
        "plan": "Starter",
        "status": "Inactive",
        "billing": "Pending",
        "joined": "2026-03-30"
    },
    {
        "id": "18393",
        "name": "Mason Barnes",
        "email": "mason.barnes@bridgepoint.io",
        "plan": "Enterprise",
        "status": "Subscribed",
        "billing": "Paid",
        "joined": "2026-03-29"
    },
    {
        "id": "18392",
        "name": "Scarlett Ross",
        "email": "scarlett.ross@vervegrid.app",
        "plan": "Growth",
        "status": "Unsubscribed",
        "billing": "Trial",
        "joined": "2026-03-28"
    },
    {
        "id": "18391",
        "name": "Logan Coleman",
        "email": "logan.coleman@quantix.dev",
        "plan": "Pro",
        "status": "Subscribed",
        "billing": "Overdue",
        "joined": "2026-03-27"
    },
    {
        "id": "18390",
        "name": "Layla Griffin",
        "email": "layla.griffin@clearledger.co",
        "plan": "Starter",
        "status": "Inactive",
        "billing": "Paid",
        "joined": "2026-03-26"
    },
    {
        "id": "18389",
        "name": "Julian Diaz",
        "email": "julian.diaz@cedarpoint.co",
        "plan": "Enterprise",
        "status": "Subscribed",
        "billing": "Pending",
        "joined": "2026-03-25"
    },
    {
        "id": "18388",
        "name": "Aurora Hayes",
        "email": "aurora.hayes@streamline.app",
        "plan": "Growth",
        "status": "Inactive",
        "billing": "Trial",
        "joined": "2026-03-24"
    },
    {
        "id": "18387",
        "name": "Wyatt Kim",
        "email": "wyatt.kim@ridgefield.io",
        "plan": "Pro",
        "status": "Subscribed",
        "billing": "Paid",
        "joined": "2026-03-23"
    },
    {
        "id": "18386",
        "name": "Stella Sanders",
        "email": "stella.sanders@brightpath.app",
        "plan": "Starter",
        "status": "Unsubscribed",
        "billing": "Overdue",
        "joined": "2026-03-22"
    },
    {
        "id": "18385",
        "name": "Isaac Flores",
        "email": "isaac.flores@pulseforge.io",
        "plan": "Enterprise",
        "status": "Subscribed",
        "billing": "Paid",
        "joined": "2026-03-21"
    },
    {
        "id": "18384",
        "name": "Penelope Bryant",
        "email": "penelope.bryant@oakline.co",
        "plan": "Growth",
        "status": "Inactive",
        "billing": "Pending",
        "joined": "2026-03-20"
    },
    {
        "id": "18383",
        "name": "Caleb Foster",
        "email": "caleb.foster@northstar.io",
        "plan": "Pro",
        "status": "Subscribed",
        "billing": "Trial",
        "joined": "2026-03-19"
    },
    {
        "id": "18382",
        "name": "Violet Howard",
        "email": "violet.howard@bridgepoint.io",
        "plan": "Starter",
        "status": "Inactive",
        "billing": "Paid",
        "joined": "2026-03-18"
    },
    {
        "id": "18381",
        "name": "Sebastian Gray",
        "email": "sebastian.gray@bluepeak.app",
        "plan": "Enterprise",
        "status": "Subscribed",
        "billing": "Overdue",
        "joined": "2026-03-17"
    },
    {
        "id": "18380",
        "name": "Lucy James",
        "email": "lucy.james@wildelm.co",
        "plan": "Growth",
        "status": "Unsubscribed",
        "billing": "Pending",
        "joined": "2026-03-16"
    },
    {
        "id": "18379",
        "name": "Samuel Watson",
        "email": "samuel.watson@holloway.io",
        "plan": "Pro",
        "status": "Subscribed",
        "billing": "Paid",
        "joined": "2026-03-15"
    },
    {
        "id": "18378",
        "name": "Ruby Morris",
        "email": "ruby.morris@firstharbor.co",
        "plan": "Starter",
        "status": "Inactive",
        "billing": "Trial",
        "joined": "2026-03-14"
    },
    {
        "id": "18377",
        "name": "Levi Bell",
        "email": "levi.bell@northline.app",
        "plan": "Enterprise",
        "status": "Subscribed",
        "billing": "Paid",
        "joined": "2026-03-13"
    },
    {
        "id": "18376",
        "name": "Hazel Cook",
        "email": "hazel.cook@westgate.io",
        "plan": "Growth",
        "status": "Unsubscribed",
        "billing": "Overdue",
        "joined": "2026-03-12"
    },
    {
        "id": "18375",
        "name": "Gabriel Rivera",
        "email": "gabriel.rivera@quantix.dev",
        "plan": "Pro",
        "status": "Subscribed",
        "billing": "Pending",
        "joined": "2026-03-11"
    },
    {
        "id": "18374",
        "name": "Eva Bailey",
        "email": "eva.bailey@brightpath.app",
        "plan": "Starter",
        "status": "Inactive",
        "billing": "Paid",
        "joined": "2026-03-10"
    },
    {
        "id": "18373",
        "name": "Julian Stone",
        "email": "julian.stone@clearledger.co",
        "plan": "Enterprise",
        "status": "Subscribed",
        "billing": "Trial",
        "joined": "2026-03-09"
    },
    {
        "id": "18372",
        "name": "Ivy Cooper",
        "email": "ivy.cooper@pulseforge.io",
        "plan": "Growth",
        "status": "Unsubscribed",
        "billing": "Paid",
        "joined": "2026-03-08"
    },
    {
        "id": "18371",
        "name": "Thomas Kelly",
        "email": "thomas.kelly@cedarpoint.co",
        "plan": "Pro",
        "status": "Subscribed",
        "billing": "Overdue",
        "joined": "2026-03-07"
    },
    {
        "id": "18370",
        "name": "Mila Dawson",
        "email": "mila.dawson@streamline.app",
        "plan": "Starter",
        "status": "Inactive",
        "billing": "Pending",
        "joined": "2026-03-06"
    },
    {
        "id": "18369",
        "name": "Avery Brooks",
        "email": "avery.brooks@ridgefield.io",
        "plan": "Enterprise",
        "status": "Subscribed",
        "billing": "Paid",
        "joined": "2026-03-05"
    },
    {
        "id": "18368",
        "name": "Riley Scott",
        "email": "riley.scott@oakline.co",
        "plan": "Growth",
        "status": "Unsubscribed",
        "billing": "Trial",
        "joined": "2026-03-04"
    },
    {
        "id": "18367",
        "name": "Hudson Reed",
        "email": "hudson.reed@bluepeak.app",
        "plan": "Pro",
        "status": "Subscribed",
        "billing": "Pending",
        "joined": "2026-03-03"
    },
    {
        "id": "18366",
        "name": "Naomi Price",
        "email": "naomi.price@northstar.io",
        "plan": "Starter",
        "status": "Inactive",
        "billing": "Overdue",
        "joined": "2026-03-02"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Table",
    ()=>Table,
    "TableBody",
    ()=>TableBody,
    "TableCaption",
    ()=>TableCaption,
    "TableCell",
    ()=>TableCell,
    "TableFooter",
    ()=>TableFooter,
    "TableHead",
    ()=>TableHead,
    "TableHeader",
    ()=>TableHeader,
    "TableRow",
    ()=>TableRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Table(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full caption-bottom text-sm", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-slot": "table-container",
            className: "relative w-full overflow-x-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                "data-slot": "table",
                className: t1,
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/ui/table.tsx",
                lineNumber: 38,
                columnNumber: 87
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 38,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c = Table;
function TableHeader(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("[&_tr]:border-b", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
            "data-slot": "table-header",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 79,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c1 = TableHeader;
function TableBody(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("[&_tr:last-child]:border-0", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
            "data-slot": "table-body",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 120,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c2 = TableBody;
function TableFooter(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
            "data-slot": "table-footer",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 161,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c3 = TableFooter;
function TableRow(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
            "data-slot": "table-row",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 202,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c4 = TableRow;
function TableHead(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
            "data-slot": "table-head",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 243,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c5 = TableHead;
function TableCell(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            "data-slot": "table-cell",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 284,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c6 = TableCell;
function TableCaption(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f07aa1ad08c05a234f4c9f2731bdca24846af31bf8c04c7b0aaa7d29fdfc0f9a";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-4 text-sm text-muted-foreground", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("caption", {
            "data-slot": "table-caption",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 325,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c7 = TableCaption;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "Table");
__turbopack_context__.k.register(_c1, "TableHeader");
__turbopack_context__.k.register(_c2, "TableBody");
__turbopack_context__.k.register(_c3, "TableFooter");
__turbopack_context__.k.register(_c4, "TableRow");
__turbopack_context__.k.register(_c5, "TableHead");
__turbopack_context__.k.register(_c6, "TableCell");
__turbopack_context__.k.register(_c7, "TableCaption");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Slot$3e$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript) <export * as Slot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
            secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
            destructive: "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
            outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
            ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
            link: "text-primary underline-offset-4 hover:underline"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "9059f361eb2c85019056418308eb170e4f7c28ad11b75cad7c36990976fc94cf") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9059f361eb2c85019056418308eb170e4f7c28ad11b75cad7c36990976fc94cf";
    }
    let className;
    let props;
    let t1;
    let t2;
    if ($[1] !== t0) {
        ({ className, variant: t1, asChild: t2, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
        $[4] = t1;
        $[5] = t2;
    } else {
        className = $[2];
        props = $[3];
        t1 = $[4];
        t2 = $[5];
    }
    const variant = t1 === undefined ? "default" : t1;
    const asChild = t2 === undefined ? false : t2;
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Slot$3e$__["Slot"].Root : "span";
    let t3;
    if ($[6] !== className || $[7] !== variant) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className);
        $[6] = className;
        $[7] = variant;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    let t4;
    if ($[9] !== Comp || $[10] !== props || $[11] !== t3 || $[12] !== variant) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
            "data-slot": "badge",
            "data-variant": variant,
            className: t3,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/badge.tsx",
            lineNumber: 67,
            columnNumber: 10
        }, this);
        $[9] = Comp;
        $[10] = props;
        $[11] = t3;
        $[12] = variant;
        $[13] = t4;
    } else {
        t4 = $[13];
    }
    return t4;
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/checkbox.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Checkbox$3e$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-client] (ecmascript) <export * as Checkbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as CheckIcon>");
"use client";
;
;
;
;
;
function Checkbox(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "f87a6ec60ce0c32029bdeb2d86bd02f2099add5e5cc7502a98d3cc9a9e719d54") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f87a6ec60ce0c32029bdeb2d86bd02f2099add5e5cc7502a98d3cc9a9e719d54";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Checkbox$3e$__["Checkbox"].Indicator, {
            "data-slot": "checkbox-indicator",
            className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {}, void 0, false, {
                fileName: "[project]/src/components/ui/checkbox.tsx",
                lineNumber: 40,
                columnNumber: 154
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/checkbox.tsx",
            lineNumber: 40,
            columnNumber: 10
        }, this);
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    let t3;
    if ($[7] !== props || $[8] !== t1) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Checkbox$3e$__["Checkbox"].Root, {
            "data-slot": "checkbox",
            className: t1,
            ...props,
            children: t2
        }, void 0, false, {
            fileName: "[project]/src/components/ui/checkbox.tsx",
            lineNumber: 47,
            columnNumber: 10
        }, this);
        $[7] = props;
        $[8] = t1;
        $[9] = t3;
    } else {
        t3 = $[9];
    }
    return t3;
}
_c = Checkbox;
;
var _c;
__turbopack_context__.k.register(_c, "Checkbox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "recentCustomersColumns",
    ()=>recentCustomersColumns
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMinutes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/addMinutes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/differenceInCalendarDays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfToday$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/endOfToday.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/parseISO.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleAlertIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as CircleAlertIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CircleCheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2d$3$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock3Icon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock-3.mjs [app-client] (ecmascript) <export default as Clock3Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader.mjs [app-client] (ecmascript) <export default as LoaderIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-round.mjs [app-client] (ecmascript) <export default as UserRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/checkbox.tsx [app-client] (ecmascript)");
"use client";
"use no memo";
;
;
;
;
;
function billingIcon(billing) {
    switch(billing){
        case "Paid":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheckIcon$3e$__["CircleCheckIcon"], {
                className: "fill-green-500 stroke-primary-foreground dark:fill-green-600"
            }, void 0, false, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                lineNumber: 16,
                columnNumber: 14
            }, this);
        case "Pending":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderIcon$3e$__["LoaderIcon"], {}, void 0, false, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                lineNumber: 18,
                columnNumber: 14
            }, this);
        case "Overdue":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleAlertIcon$3e$__["CircleAlertIcon"], {
                className: "text-amber-600 dark:text-amber-500"
            }, void 0, false, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                lineNumber: 20,
                columnNumber: 14
            }, this);
        case "Trial":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2d$3$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock3Icon$3e$__["Clock3Icon"], {
                className: "text-muted-foreground"
            }, void 0, false, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                lineNumber: 22,
                columnNumber: 14
            }, this);
        default:
            return null;
    }
}
const recentCustomersColumns = [
    {
        id: "select",
        header: ({ table })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                    checked: table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected() && "indeterminate",
                    onCheckedChange: (value)=>table.toggleAllPageRowsSelected(!!value),
                    "aria-label": "Select all customers on this page"
                }, void 0, false, {
                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
        cell: ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                    checked: row.getIsSelected(),
                    onCheckedChange: (value)=>row.toggleSelected(!!value),
                    "aria-label": `Select ${row.original.name}`
                }, void 0, false, {
                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
        enableHiding: false
    },
    {
        accessorKey: "name",
        header: "Customer",
        cell: ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex size-8 items-center justify-center rounded-md border bg-muted",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__["UserRound"], {
                            className: "size-4 text-muted-foreground"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-end justify-between gap-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid min-w-0 gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate font-medium text-sm leading-none",
                                        children: row.original.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                                        lineNumber: 62,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate text-muted-foreground text-xs leading-none",
                                        children: [
                                            "#",
                                            row.original.id
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
        enableHiding: false
    },
    {
        id: "search",
        accessorFn: (row)=>`${row.id} ${row.name} ${row.email}`,
        filterFn: "includesString",
        enableHiding: true
    },
    {
        accessorKey: "status",
        header: "Status",
        filterFn: "equalsString",
        cell: ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                variant: "outline",
                className: "px-1.5 text-muted-foreground",
                children: row.original.status
            }, void 0, false, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    {
        accessorKey: "billing",
        header: "Billing",
        filterFn: "equalsString",
        cell: ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                variant: "outline",
                className: "px-1.5 text-muted-foreground",
                children: [
                    billingIcon(row.original.billing),
                    row.original.billing
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
    },
    {
        accessorKey: "plan",
        header: "Plan",
        cell: ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm",
                children: row.original.plan
            }, void 0, false, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                lineNumber: 101,
                columnNumber: 24
            }, ("TURBOPACK compile-time value", void 0))
    },
    {
        id: "joinedWindow",
        accessorFn: (row)=>{
            const daysSinceJoined = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$differenceInCalendarDays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInCalendarDays"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$endOfToday$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endOfToday"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseISO"])(row.joined));
            if (daysSinceJoined <= 30) return [
                "30",
                "90"
            ];
            if (daysSinceJoined <= 90) return [
                "90"
            ];
            return [];
        },
        filterFn: "arrIncludes",
        enableHiding: true
    },
    {
        accessorKey: "joined",
        header: "Joined",
        cell: ({ row })=>{
            const baseDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseISO"])(row.original.joined);
            const joinedAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMinutes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMinutes"])(baseDate, 9 * 60 + Number(row.original.id) % 12 * 17);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-0.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(joinedAt, "do MMMM yyyy")
                    }, void 0, false, {
                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted-foreground text-xs",
                        children: [
                            "at ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(joinedAt, "h:mm a")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx",
                lineNumber: 123,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        }
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RecentCustomersTable",
    ()=>RecentCustomersTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-table/build/lib/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/table-core/build/lib/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-down.mjs [app-client] (ecmascript) <export default as ArrowUpDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-days.mjs [app-client] (ecmascript) <export default as CalendarDays>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.mjs [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevrons-left.mjs [app-client] (ecmascript) <export default as ChevronsLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevrons-right.mjs [app-client] (ecmascript) <export default as ChevronsRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.mjs [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2d$round$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UsersRound$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users-round.mjs [app-client] (ecmascript) <export default as UsersRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$main$292f$dashboard$2f$default$2f$_components$2f$recent$2d$customers$2d$table$2f$columns$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/columns.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
"use no memo";
;
;
;
;
;
;
;
;
;
;
const statusOptions = [
    {
        value: "all",
        label: "All"
    },
    {
        value: "Subscribed",
        label: "Subscribed"
    },
    {
        value: "Inactive",
        label: "Inactive"
    },
    {
        value: "Unsubscribed",
        label: "Unsubscribed"
    }
];
const billingOptions = [
    {
        value: "all",
        label: "All"
    },
    {
        value: "Paid",
        label: "Paid"
    },
    {
        value: "Pending",
        label: "Pending"
    },
    {
        value: "Overdue",
        label: "Overdue"
    },
    {
        value: "Trial",
        label: "Trial"
    }
];
const joinedDateOptions = [
    {
        value: "all",
        label: "All time"
    },
    {
        value: "30",
        label: "Last 30 days"
    },
    {
        value: "90",
        label: "Last 90 days"
    }
];
const sortOptions = [
    {
        value: "newest",
        label: "Newest first"
    },
    {
        value: "oldest",
        label: "Oldest first"
    },
    {
        value: "name-asc",
        label: "Name A-Z"
    },
    {
        value: "name-desc",
        label: "Name Z-A"
    }
];
const sortOptionState = {
    newest: [
        {
            id: "joined",
            desc: true
        }
    ],
    oldest: [
        {
            id: "joined",
            desc: false
        }
    ],
    "name-asc": [
        {
            id: "name",
            desc: false
        }
    ],
    "name-desc": [
        {
            id: "name",
            desc: true
        }
    ]
};
function RecentCustomersTable({ data }) {
    _s();
    const [rowSelection, setRowSelection] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({});
    const [columnFilters, setColumnFilters] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [sorting, setSorting] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([
        {
            id: "joined",
            desc: true
        }
    ]);
    const [columnVisibility] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        search: false,
        joinedWindow: false
    });
    const [pagination, setPagination] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        pageIndex: 0,
        pageSize: 10
    });
    const table = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"])({
        data,
        columns: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$main$292f$dashboard$2f$default$2f$_components$2f$recent$2d$customers$2d$table$2f$columns$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recentCustomersColumns"],
        state: {
            rowSelection,
            columnFilters,
            sorting,
            columnVisibility,
            pagination
        },
        getRowId: {
            "RecentCustomersTable.useReactTable[table]": (row)=>row.id
        }["RecentCustomersTable.useReactTable[table]"],
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCoreRowModel"])(),
        getFilteredRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFilteredRowModel"])(),
        getPaginationRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaginationRowModel"])(),
        getSortedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSortedRowModel"])()
    });
    const searchQuery = table.getColumn("search")?.getFilterValue() ?? "";
    const statusFilter = table.getColumn("status")?.getFilterValue() ?? "all";
    const billingFilter = table.getColumn("billing")?.getFilterValue() ?? "all";
    const joinedDateFilter = table.getColumn("joinedWindow")?.getFilterValue() ?? "all";
    const sortValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "RecentCustomersTable.useMemo[sortValue]": ()=>{
            const currentSort = sorting[0];
            if (!currentSort) return "newest";
            if (currentSort.id === "joined" && currentSort.desc) return "newest";
            if (currentSort.id === "joined" && !currentSort.desc) return "oldest";
            if (currentSort.id === "name" && !currentSort.desc) return "name-asc";
            if (currentSort.id === "name" && currentSort.desc) return "name-desc";
            return "newest";
        }
    }["RecentCustomersTable.useMemo[sortValue]"], [
        sorting
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full lg:w-80",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        className: "h-7 rounded-[min(var(--radius-md),12px)] pl-8",
                                        placeholder: "Search customers...",
                                        value: searchQuery,
                                        onChange: (event)=>{
                                            table.getColumn("search")?.setFilterValue(event.target.value || undefined);
                                            table.setPageIndex(0);
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2d$round$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UsersRound$3e$__["UsersRound"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 17
                                                }, this),
                                                "Status"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                            lineNumber: 150,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 149,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                        className: "w-35",
                                        align: "start",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuRadioGroup"], {
                                            value: statusFilter,
                                            onValueChange: (value)=>{
                                                table.getColumn("status")?.setFilterValue(value === "all" ? undefined : value);
                                                table.setPageIndex(0);
                                            },
                                            children: statusOptions.map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuRadioItem"], {
                                                    value: status.value,
                                                    children: status.label
                                                }, status.value, false, {
                                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 46
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                            lineNumber: 156,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 17
                                                }, this),
                                                "Joined date"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                            lineNumber: 168,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                        className: "w-40",
                                        align: "start",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuRadioGroup"], {
                                            value: joinedDateFilter,
                                            onValueChange: (value_0)=>{
                                                table.getColumn("joinedWindow")?.setFilterValue(value_0 === "all" ? undefined : value_0);
                                                table.setPageIndex(0);
                                            },
                                            children: joinedDateOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuRadioItem"], {
                                                    value: option.value,
                                                    children: option.label
                                                }, option.value, false, {
                                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 50
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                            lineNumber: 174,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 sm:flex-row sm:items-center xl:w-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 17
                                                }, this),
                                                "Billing"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                            lineNumber: 188,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 187,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                        align: "end",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuRadioGroup"], {
                                            value: billingFilter,
                                            onValueChange: (value_1)=>{
                                                table.getColumn("billing")?.setFilterValue(value_1 === "all" ? undefined : value_1);
                                                table.setPageIndex(0);
                                            },
                                            children: billingOptions.map((billing)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuRadioItem"], {
                                                    value: billing.value,
                                                    children: billing.label
                                                }, billing.value, false, {
                                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 48
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                            lineNumber: 194,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 193,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 17
                                                }, this),
                                                "Sort"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                            lineNumber: 206,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                        align: "end",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuRadioGroup"], {
                                            value: sortValue,
                                            onValueChange: (value_2)=>{
                                                table.setSorting(sortOptionState[value_2] ?? sortOptionState.newest);
                                                table.setPageIndex(0);
                                            },
                                            children: sortOptions.map((option_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuRadioItem"], {
                                                    value: option_0.value,
                                                    children: option_0.label
                                                }, option_0.value, false, {
                                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 46
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                            lineNumber: 212,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 211,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-hidden rounded-lg border bg-card",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                            className: "bg-muted/15",
                            children: table.getHeaderGroups().map((headerGroup)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                    children: headerGroup.headers.map((header)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                            colSpan: header.colSpan,
                                            className: "h-11 p-3 font-medium",
                                            children: header.isPlaceholder ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(header.column.columnDef.header, header.getContext())
                                        }, header.id, false, {
                                            fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                            lineNumber: 229,
                                            columnNumber: 52
                                        }, this))
                                }, headerGroup.id, false, {
                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                    lineNumber: 228,
                                    columnNumber: 57
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                            lineNumber: 227,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                            children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                    "data-state": row_0.getIsSelected() && "selected",
                                    children: row_0.getVisibleCells().map((cell)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            className: "p-3 align-middle",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(cell.column.columnDef.cell, cell.getContext())
                                        }, cell.id, false, {
                                            fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                            lineNumber: 236,
                                            columnNumber: 56
                                        }, this))
                                }, row_0.id, false, {
                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                    lineNumber: 235,
                                    columnNumber: 86
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                    colSpan: table.getVisibleLeafColumns().length,
                                    className: "h-24 text-center",
                                    children: "No results."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                    lineNumber: 240,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                lineNumber: 239,
                                columnNumber: 32
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                            lineNumber: 234,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                    lineNumber: 226,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden flex-1 text-muted-foreground text-sm lg:flex",
                        children: [
                            table.getFilteredSelectedRowModel().rows.length,
                            " of ",
                            table.getFilteredRowModel().rows.length,
                            " row(s) selected."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-full items-center gap-8 lg:w-fit",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden items-center gap-2 lg:flex",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "recent-customers-rows-per-page",
                                        className: "font-medium text-sm",
                                        children: "Rows per page"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 255,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: `${table.getState().pagination.pageSize}`,
                                        onValueChange: (value_3)=>{
                                            table.setPageSize(Number(value_3));
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                size: "sm",
                                                className: "w-20",
                                                id: "recent-customers-rows-per-page",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: table.getState().pagination.pageSize
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                    lineNumber: 262,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                lineNumber: 261,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                side: "top",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                                    children: [
                                                        10,
                                                        20,
                                                        30,
                                                        40,
                                                        50
                                                    ].map((pageSize)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: `${pageSize}`,
                                                            children: pageSize
                                                        }, pageSize, false, {
                                                            fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                            lineNumber: 266,
                                                            columnNumber: 57
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                lineNumber: 264,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 258,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                lineNumber: 254,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex w-fit items-center justify-center font-medium text-sm",
                                children: [
                                    "Page ",
                                    table.getState().pagination.pageIndex + 1,
                                    " of ",
                                    table.getPageCount()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                lineNumber: 273,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-auto flex items-center gap-2 lg:ml-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "hidden size-8 lg:flex",
                                        size: "icon",
                                        onClick: ()=>table.setPageIndex(0),
                                        disabled: !table.getCanPreviousPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Go to first page"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                lineNumber: 278,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsLeft$3e$__["ChevronsLeft"], {
                                                className: "size-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                lineNumber: 279,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 277,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "size-8",
                                        size: "icon",
                                        onClick: ()=>table.previousPage(),
                                        disabled: !table.getCanPreviousPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Go to previous page"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                lineNumber: 282,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                className: "size-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                lineNumber: 283,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 281,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "size-8",
                                        size: "icon",
                                        onClick: ()=>table.nextPage(),
                                        disabled: !table.getCanNextPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Go to next page"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                lineNumber: 286,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "size-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                lineNumber: 287,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 285,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "hidden size-8 lg:flex",
                                        size: "icon",
                                        onClick: ()=>table.setPageIndex(table.getPageCount() - 1),
                                        disabled: !table.getCanNextPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Go to last page"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                lineNumber: 290,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsRight$3e$__["ChevronsRight"], {
                                                className: "size-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                                lineNumber: 291,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                        lineNumber: 289,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                        lineNumber: 253,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
                lineNumber: 248,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx",
        lineNumber: 138,
        columnNumber: 10
    }, this);
}
_s(RecentCustomersTable, "7n2aKze2ZRnLy7x9lfMll0crHy0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"]
    ];
});
_c = RecentCustomersTable;
var _c;
__turbopack_context__.k.register(_c, "RecentCustomersTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(main)/dashboard/default/_components/subscriber-overview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SubscriberOverview",
    ()=>SubscriberOverview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.mjs [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$main$292f$dashboard$2f$default$2f$_components$2f$data$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(main)/dashboard/default/_components/data.json.[json].cjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$main$292f$dashboard$2f$default$2f$_components$2f$recent$2d$customers$2d$table$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(main)/dashboard/default/_components/recent-customers-table/table.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const customers = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$main$292f$dashboard$2f$default$2f$_components$2f$data$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
function SubscriberOverview() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "278030fab2e7da5266f25d4dd7be71d5b456f9c3cd7663b95138b28ab5e46876") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "278030fab2e7da5266f25d4dd7be71d5b456f9c3cd7663b95138b28ab5e46876";
    }
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
            className: "leading-none",
            children: "18,426 Customers"
        }, void 0, false, {
            fileName: "[project]/src/app/(main)/dashboard/default/_components/subscriber-overview.tsx",
            lineNumber: 22,
            columnNumber: 10
        }, this);
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
            children: "Recent customer records with plan, billing, status, and signup activity."
        }, void 0, false, {
            fileName: "[project]/src/app/(main)/dashboard/default/_components/subscriber-overview.tsx",
            lineNumber: 23,
            columnNumber: 10
        }, this);
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
            children: [
                t0,
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardAction"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {}, void 0, false, {
                                fileName: "[project]/src/app/(main)/dashboard/default/_components/subscriber-overview.tsx",
                                lineNumber: 32,
                                columnNumber: 78
                            }, this),
                            "Export"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(main)/dashboard/default/_components/subscriber-overview.tsx",
                        lineNumber: 32,
                        columnNumber: 42
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(main)/dashboard/default/_components/subscriber-overview.tsx",
                    lineNumber: 32,
                    columnNumber: 30
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(main)/dashboard/default/_components/subscriber-overview.tsx",
            lineNumber: 32,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "pt-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$main$292f$dashboard$2f$default$2f$_components$2f$recent$2d$customers$2d$table$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RecentCustomersTable"], {
                        data: customers
                    }, void 0, false, {
                        fileName: "[project]/src/app/(main)/dashboard/default/_components/subscriber-overview.tsx",
                        lineNumber: 39,
                        columnNumber: 50
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(main)/dashboard/default/_components/subscriber-overview.tsx",
                    lineNumber: 39,
                    columnNumber: 20
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(main)/dashboard/default/_components/subscriber-overview.tsx",
            lineNumber: 39,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    return t3;
}
_c = SubscriberOverview;
var _c;
__turbopack_context__.k.register(_c, "SubscriberOverview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1az7co-._.js.map