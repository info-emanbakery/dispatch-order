(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/sonner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CircleCheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as InfoIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TriangleAlertIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as TriangleAlertIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__OctagonXIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/octagon-x.mjs [app-client] (ecmascript) <export default as OctagonXIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2Icon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-client] (ecmascript) <export default as Loader2Icon>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const Toaster = (t0)=>{
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "c362a213654cc7ffc293d67025d2eb0aa7d86c2ab8079628bdf4078c3dd8fe7d") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c362a213654cc7ffc293d67025d2eb0aa7d86c2ab8079628bdf4078c3dd8fe7d";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    const { theme: t1 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const theme = t1 === undefined ? "system" : t1;
    const t2 = theme;
    let t3;
    let t4;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            success: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheckIcon$3e$__["CircleCheckIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/sonner.tsx",
                lineNumber: 34,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0)),
            info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoIcon$3e$__["InfoIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/sonner.tsx",
                lineNumber: 35,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            warning: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TriangleAlertIcon$3e$__["TriangleAlertIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/sonner.tsx",
                lineNumber: 36,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0)),
            error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__OctagonXIcon$3e$__["OctagonXIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/sonner.tsx",
                lineNumber: 37,
                columnNumber: 14
            }, ("TURBOPACK compile-time value", void 0)),
            loading: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2Icon$3e$__["Loader2Icon"], {
                className: "size-4 animate-spin"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/sonner.tsx",
                lineNumber: 38,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0))
        };
        t4 = {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
            "--border-radius": "var(--radius)"
        };
        $[3] = t3;
        $[4] = t4;
    } else {
        t3 = $[3];
        t4 = $[4];
    }
    let t5;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            classNames: {
                toast: "cn-toast"
            }
        };
        $[5] = t5;
    } else {
        t5 = $[5];
    }
    let t6;
    if ($[6] !== props || $[7] !== t2) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
            theme: t2,
            className: "toaster group",
            icons: t3,
            style: t4,
            toastOptions: t5,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/sonner.tsx",
            lineNumber: 65,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[6] = props;
        $[7] = t2;
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    return t6;
};
_s(Toaster, "j77/rDRstnJZ8jmBpfv55236hS4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = Toaster;
;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatCurrency",
    ()=>formatCurrency,
    "getInitials",
    ()=>getInitials
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const getInitials = (str)=>{
    if (typeof str !== "string" || !str.trim()) return "?";
    return str.trim().split(/\s+/).filter(Boolean).map((word)=>word[0]).join("").toUpperCase() || "?";
};
function formatCurrency(amount, opts) {
    const { currency = "USD", locale = "en-US", minimumFractionDigits, maximumFractionDigits, noDecimals } = opts ?? {};
    const formatOptions = {
        style: "currency",
        currency,
        minimumFractionDigits: noDecimals ? 0 : minimumFractionDigits,
        maximumFractionDigits: noDecimals ? 0 : maximumFractionDigits
    };
    return new Intl.NumberFormat(locale, formatOptions).format(amount);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/tooltip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tooltip",
    ()=>Tooltip,
    "TooltipContent",
    ()=>TooltipContent,
    "TooltipProvider",
    ()=>TooltipProvider,
    "TooltipTrigger",
    ()=>TooltipTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-tooltip/dist/index.mjs [app-client] (ecmascript) <export * as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function TooltipProvider(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "a05524777a1aaa0f8fff7941c322ea4d5031239585926487d1a61adf4003c38a") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a05524777a1aaa0f8fff7941c322ea4d5031239585926487d1a61adf4003c38a";
    }
    let props;
    let t1;
    if ($[1] !== t0) {
        ({ delayDuration: t1, ...props } = t0);
        $[1] = t0;
        $[2] = props;
        $[3] = t1;
    } else {
        props = $[2];
        t1 = $[3];
    }
    const delayDuration = t1 === undefined ? 0 : t1;
    let t2;
    if ($[4] !== delayDuration || $[5] !== props) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Provider, {
            "data-slot": "tooltip-provider",
            delayDuration: delayDuration,
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/tooltip.tsx",
            lineNumber: 32,
            columnNumber: 10
        }, this);
        $[4] = delayDuration;
        $[5] = props;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    return t2;
}
_c = TooltipProvider;
function Tooltip(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "a05524777a1aaa0f8fff7941c322ea4d5031239585926487d1a61adf4003c38a") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a05524777a1aaa0f8fff7941c322ea4d5031239585926487d1a61adf4003c38a";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Root, {
            "data-slot": "tooltip",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/tooltip.tsx",
            lineNumber: 61,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c1 = Tooltip;
function TooltipTrigger(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "a05524777a1aaa0f8fff7941c322ea4d5031239585926487d1a61adf4003c38a") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a05524777a1aaa0f8fff7941c322ea4d5031239585926487d1a61adf4003c38a";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Trigger, {
            "data-slot": "tooltip-trigger",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/tooltip.tsx",
            lineNumber: 89,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c2 = TooltipTrigger;
function TooltipContent(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "a05524777a1aaa0f8fff7941c322ea4d5031239585926487d1a61adf4003c38a") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a05524777a1aaa0f8fff7941c322ea4d5031239585926487d1a61adf4003c38a";
    }
    let children;
    let className;
    let props;
    let t1;
    if ($[1] !== t0) {
        ({ className, sideOffset: t1, children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = props;
        $[5] = t1;
    } else {
        children = $[2];
        className = $[3];
        props = $[4];
        t1 = $[5];
    }
    const sideOffset = t1 === undefined ? 0 : t1;
    let t2;
    if ($[6] !== className) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className);
        $[6] = className;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    let t3;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Arrow, {
            className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/tooltip.tsx",
            lineNumber: 138,
            columnNumber: 10
        }, this);
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    let t4;
    if ($[9] !== children || $[10] !== props || $[11] !== sideOffset || $[12] !== t2) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Portal, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Tooltip$3e$__["Tooltip"].Content, {
                "data-slot": "tooltip-content",
                sideOffset: sideOffset,
                className: t2,
                ...props,
                children: [
                    children,
                    t3
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/tooltip.tsx",
                lineNumber: 145,
                columnNumber: 35
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/tooltip.tsx",
            lineNumber: 145,
            columnNumber: 10
        }, this);
        $[9] = children;
        $[10] = props;
        $[11] = sideOffset;
        $[12] = t2;
        $[13] = t4;
    } else {
        t4 = $[13];
    }
    return t4;
}
_c3 = TooltipContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "TooltipProvider");
__turbopack_context__.k.register(_c1, "Tooltip");
__turbopack_context__.k.register(_c2, "TooltipTrigger");
__turbopack_context__.k.register(_c3, "TooltipContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/internal/font/google/inter_383113c5.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "inter_383113c5-module__5Z3UwG__className",
  "variable": "inter_383113c5-module__5Z3UwG__variable",
});
}),
"[next]/internal/font/google/inter_383113c5.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_383113c5$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_383113c5.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_383113c5$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Inter', 'Inter Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_383113c5$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_383113c5$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/noto_sans_95b75b1f.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "noto_sans_95b75b1f-module__66ESUG__className",
  "variable": "noto_sans_95b75b1f-module__66ESUG__variable",
});
}),
"[next]/internal/font/google/noto_sans_95b75b1f.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_sans_95b75b1f$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/noto_sans_95b75b1f.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_sans_95b75b1f$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Noto Sans', 'Noto Sans Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_sans_95b75b1f$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_sans_95b75b1f$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/roboto_a8ce4c8a.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "roboto_a8ce4c8a-module__Xp9Dga__className",
  "variable": "roboto_a8ce4c8a-module__Xp9Dga__variable",
});
}),
"[next]/internal/font/google/roboto_a8ce4c8a.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_a8ce4c8a$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/roboto_a8ce4c8a.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_a8ce4c8a$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Roboto', 'Roboto Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_a8ce4c8a$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_a8ce4c8a$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/geist_4b7f6a51.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "geist_4b7f6a51-module__R3QN5W__className",
  "variable": "geist_4b7f6a51-module__R3QN5W__variable",
});
}),
"[next]/internal/font/google/geist_4b7f6a51.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_4b7f6a51$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_4b7f6a51.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_4b7f6a51$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Geist', 'Geist Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_4b7f6a51$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_4b7f6a51$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/outfit_ef8de53f.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "outfit_ef8de53f-module__zILEHq__className",
  "variable": "outfit_ef8de53f-module__zILEHq__variable",
});
}),
"[next]/internal/font/google/outfit_ef8de53f.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_ef8de53f$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/outfit_ef8de53f.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_ef8de53f$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Outfit', 'Outfit Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_ef8de53f$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_ef8de53f$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/geist_mono_220672a6.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "geist_mono_220672a6-module__4MovqW__className",
  "variable": "geist_mono_220672a6-module__4MovqW__variable",
});
}),
"[next]/internal/font/google/geist_mono_220672a6.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_220672a6$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_mono_220672a6.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_220672a6$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Geist Mono', 'Geist Mono Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_220672a6$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_220672a6$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/dm_sans_a9a46d7c.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "dm_sans_a9a46d7c-module__COuHXa__className",
  "variable": "dm_sans_a9a46d7c-module__COuHXa__variable",
});
}),
"[next]/internal/font/google/dm_sans_a9a46d7c.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_sans_a9a46d7c$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/dm_sans_a9a46d7c.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_sans_a9a46d7c$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'DM Sans', 'DM Sans Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_sans_a9a46d7c$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_sans_a9a46d7c$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/nunito_sans_983a6e73.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "nunito_sans_983a6e73-module__s9RnJa__className",
  "variable": "nunito_sans_983a6e73-module__s9RnJa__variable",
});
}),
"[next]/internal/font/google/nunito_sans_983a6e73.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$nunito_sans_983a6e73$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/nunito_sans_983a6e73.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$nunito_sans_983a6e73$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Nunito Sans', 'Nunito Sans Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$nunito_sans_983a6e73$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$nunito_sans_983a6e73$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/figtree_b910a229.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "figtree_b910a229-module__hgZjaG__className",
  "variable": "figtree_b910a229-module__hgZjaG__variable",
});
}),
"[next]/internal/font/google/figtree_b910a229.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$figtree_b910a229$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/figtree_b910a229.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$figtree_b910a229$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Figtree', 'Figtree Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$figtree_b910a229$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$figtree_b910a229$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/raleway_b1616080.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "raleway_b1616080-module__DAvUSG__className",
  "variable": "raleway_b1616080-module__DAvUSG__variable",
});
}),
"[next]/internal/font/google/raleway_b1616080.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$raleway_b1616080$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/raleway_b1616080.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$raleway_b1616080$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Raleway', 'Raleway Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$raleway_b1616080$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$raleway_b1616080$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/public_sans_9347030.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "public_sans_9347030-module__LzCOVq__className",
  "variable": "public_sans_9347030-module__LzCOVq__variable",
});
}),
"[next]/internal/font/google/public_sans_9347030.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$public_sans_9347030$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/public_sans_9347030.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$public_sans_9347030$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Public Sans', 'Public Sans Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$public_sans_9347030$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$public_sans_9347030$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/jetbrains_mono_1071a79f.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "jetbrains_mono_1071a79f-module__XZGnqq__className",
  "variable": "jetbrains_mono_1071a79f-module__XZGnqq__variable",
});
}),
"[next]/internal/font/google/jetbrains_mono_1071a79f.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$jetbrains_mono_1071a79f$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/jetbrains_mono_1071a79f.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$jetbrains_mono_1071a79f$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'JetBrains Mono', 'JetBrains Mono Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$jetbrains_mono_1071a79f$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$jetbrains_mono_1071a79f$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/noto_serif_714c4665.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "noto_serif_714c4665-module___SI45q__className",
  "variable": "noto_serif_714c4665-module___SI45q__variable",
});
}),
"[next]/internal/font/google/noto_serif_714c4665.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_serif_714c4665$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/noto_serif_714c4665.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_serif_714c4665$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Noto Serif', 'Noto Serif Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_serif_714c4665$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_serif_714c4665$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/roboto_slab_9f1bde00.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "roboto_slab_9f1bde00-module__HRNyLq__className",
  "variable": "roboto_slab_9f1bde00-module__HRNyLq__variable",
});
}),
"[next]/internal/font/google/roboto_slab_9f1bde00.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_slab_9f1bde00$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/roboto_slab_9f1bde00.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_slab_9f1bde00$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Roboto Slab', 'Roboto Slab Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_slab_9f1bde00$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_slab_9f1bde00$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/merriweather_1e177129.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "merriweather_1e177129-module__eww7yG__className",
  "variable": "merriweather_1e177129-module__eww7yG__variable",
});
}),
"[next]/internal/font/google/merriweather_1e177129.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$merriweather_1e177129$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/merriweather_1e177129.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$merriweather_1e177129$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Merriweather', 'Merriweather Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$merriweather_1e177129$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$merriweather_1e177129$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/lora_8622ffdf.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "lora_8622ffdf-module__09X3YG__className",
  "variable": "lora_8622ffdf-module__09X3YG__variable",
});
}),
"[next]/internal/font/google/lora_8622ffdf.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$lora_8622ffdf$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/lora_8622ffdf.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$lora_8622ffdf$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Lora', 'Lora Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$lora_8622ffdf$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$lora_8622ffdf$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/playfair_display_34ac65b0.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "playfair_display_34ac65b0-module__D1_3UW__className",
  "variable": "playfair_display_34ac65b0-module__D1_3UW__variable",
});
}),
"[next]/internal/font/google/playfair_display_34ac65b0.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_34ac65b0$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/playfair_display_34ac65b0.module.css [app-client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_34ac65b0$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Playfair Display', 'Playfair Display Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_34ac65b0$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_34ac65b0$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/src/lib/fonts/registry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fontKeys",
    ()=>fontKeys,
    "fontOptions",
    ()=>fontOptions,
    "fontRegistry",
    ()=>fontRegistry,
    "fontVars",
    ()=>fontVars
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_383113c5$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_383113c5.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_sans_95b75b1f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/noto_sans_95b75b1f.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_a8ce4c8a$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/roboto_a8ce4c8a.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_4b7f6a51$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_4b7f6a51.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_ef8de53f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/outfit_ef8de53f.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_220672a6$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_mono_220672a6.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_sans_a9a46d7c$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/dm_sans_a9a46d7c.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$nunito_sans_983a6e73$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/nunito_sans_983a6e73.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$figtree_b910a229$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/figtree_b910a229.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$raleway_b1616080$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/raleway_b1616080.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$public_sans_9347030$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/public_sans_9347030.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$jetbrains_mono_1071a79f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/jetbrains_mono_1071a79f.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_serif_714c4665$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/noto_serif_714c4665.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_slab_9f1bde00$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/roboto_slab_9f1bde00.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$merriweather_1e177129$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/merriweather_1e177129.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$lora_8622ffdf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/lora_8622ffdf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_34ac65b0$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/playfair_display_34ac65b0.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$pixel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/geist/dist/pixel.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistpixelsquare_cf225766$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GeistPixelSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/geist/dist/geistpixelsquare_cf225766.js [app-client] (ecmascript) <export default as GeistPixelSquare>");
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
;
;
;
;
;
;
;
;
const fontRegistry = {
    geist: {
        label: "Geist",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_4b7f6a51$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    inter: {
        label: "Inter",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_383113c5$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    notoSans: {
        label: "Noto Sans",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_sans_95b75b1f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    nunitoSans: {
        label: "Nunito Sans",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$nunito_sans_983a6e73$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    figtree: {
        label: "Figtree",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$figtree_b910a229$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    roboto: {
        label: "Roboto",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_a8ce4c8a$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    raleway: {
        label: "Raleway",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$raleway_b1616080$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    dmSans: {
        label: "DM Sans",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$dm_sans_a9a46d7c$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    publicSans: {
        label: "Public Sans",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$public_sans_9347030$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    outfit: {
        label: "Outfit",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$outfit_ef8de53f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    geistMono: {
        label: "Geist Mono",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_mono_220672a6$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    geistPixelSquare: {
        label: "Geist Pixel Square",
        font: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$geist$2f$dist$2f$geistpixelsquare_cf225766$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GeistPixelSquare$3e$__["GeistPixelSquare"]
    },
    jetBrainsMono: {
        label: "JetBrains Mono",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$jetbrains_mono_1071a79f$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    notoSerif: {
        label: "Noto Serif",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$noto_serif_714c4665$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    robotoSlab: {
        label: "Roboto Slab",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_slab_9f1bde00$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    merriweather: {
        label: "Merriweather",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$merriweather_1e177129$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    lora: {
        label: "Lora",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$lora_8622ffdf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    playfairDisplay: {
        label: "Playfair Display",
        font: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$playfair_display_34ac65b0$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    }
};
const fontKeys = Object.keys(fontRegistry);
const fontVars = Object.values(fontRegistry).map(({ font })=>font.variable).join(" ");
const fontOptions = fontKeys.map((key)=>({
        key,
        label: fontRegistry[key].label
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/preferences/layout.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONTENT_LAYOUT_VALUES",
    ()=>CONTENT_LAYOUT_VALUES,
    "NAVBAR_STYLE_VALUES",
    ()=>NAVBAR_STYLE_VALUES,
    "SIDEBAR_COLLAPSIBLE_VALUES",
    ()=>SIDEBAR_COLLAPSIBLE_VALUES,
    "SIDEBAR_VARIANT_VALUES",
    ()=>SIDEBAR_VARIANT_VALUES
]);
// Sidebar Variant
const SIDEBAR_VARIANT_OPTIONS = [
    {
        label: "Sidebar",
        value: "sidebar"
    },
    {
        label: "Inset",
        value: "inset"
    },
    {
        label: "Floating",
        value: "floating"
    }
];
const SIDEBAR_VARIANT_VALUES = SIDEBAR_VARIANT_OPTIONS.map(_c = (v)=>v.value);
_c1 = SIDEBAR_VARIANT_VALUES;
// Sidebar Collapsible
const SIDEBAR_COLLAPSIBLE_OPTIONS = [
    {
        label: "Icon",
        value: "icon"
    },
    {
        label: "Offcanvas",
        value: "offcanvas"
    }
];
const SIDEBAR_COLLAPSIBLE_VALUES = SIDEBAR_COLLAPSIBLE_OPTIONS.map(_c2 = (v)=>v.value);
_c3 = SIDEBAR_COLLAPSIBLE_VALUES;
// Content Layout
const CONTENT_LAYOUT_OPTIONS = [
    {
        label: "Centered",
        value: "centered"
    },
    {
        label: "Full Width",
        value: "full-width"
    }
];
const CONTENT_LAYOUT_VALUES = CONTENT_LAYOUT_OPTIONS.map(_c4 = (v)=>v.value);
_c5 = CONTENT_LAYOUT_VALUES;
// Navbar Style
const NAVBAR_STYLE_OPTIONS = [
    {
        label: "Sticky",
        value: "sticky"
    },
    {
        label: "Scroll",
        value: "scroll"
    }
];
const NAVBAR_STYLE_VALUES = NAVBAR_STYLE_OPTIONS.map(_c6 = (v)=>v.value);
_c7 = NAVBAR_STYLE_VALUES;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "SIDEBAR_VARIANT_VALUES$SIDEBAR_VARIANT_OPTIONS.map");
__turbopack_context__.k.register(_c1, "SIDEBAR_VARIANT_VALUES");
__turbopack_context__.k.register(_c2, "SIDEBAR_COLLAPSIBLE_VALUES$SIDEBAR_COLLAPSIBLE_OPTIONS.map");
__turbopack_context__.k.register(_c3, "SIDEBAR_COLLAPSIBLE_VALUES");
__turbopack_context__.k.register(_c4, "CONTENT_LAYOUT_VALUES$CONTENT_LAYOUT_OPTIONS.map");
__turbopack_context__.k.register(_c5, "CONTENT_LAYOUT_VALUES");
__turbopack_context__.k.register(_c6, "NAVBAR_STYLE_VALUES$NAVBAR_STYLE_OPTIONS.map");
__turbopack_context__.k.register(_c7, "NAVBAR_STYLE_VALUES");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/preferences/theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "THEME_MODE_VALUES",
    ()=>THEME_MODE_VALUES,
    "THEME_PRESET_OPTIONS",
    ()=>THEME_PRESET_OPTIONS,
    "THEME_PRESET_VALUES",
    ()=>THEME_PRESET_VALUES
]);
const THEME_MODE_OPTIONS = [
    {
        label: "Light",
        value: "light"
    },
    {
        label: "Dark",
        value: "dark"
    },
    {
        label: "System",
        value: "system"
    }
];
const THEME_MODE_VALUES = THEME_MODE_OPTIONS.map(_c = (o)=>o.value);
_c1 = THEME_MODE_VALUES;
const THEME_PRESET_OPTIONS = [
    {
        label: "Default",
        value: "default",
        primary: {
            light: "oklch(0.205 0 0)",
            dark: "oklch(0.922 0 0)"
        }
    },
    {
        label: "Brutalist",
        value: "brutalist",
        primary: {
            light: "oklch(0.6489 0.237 26.9728)",
            dark: "oklch(0.7044 0.1872 23.1858)"
        }
    },
    {
        label: "Soft Pop",
        value: "soft-pop",
        primary: {
            light: "oklch(0.5106 0.2301 276.9656)",
            dark: "oklch(0.6801 0.1583 276.9349)"
        }
    },
    {
        label: "Tangerine",
        value: "tangerine",
        primary: {
            light: "oklch(0.64 0.17 36.44)",
            dark: "oklch(0.64 0.17 36.44)"
        }
    }
];
const THEME_PRESET_VALUES = THEME_PRESET_OPTIONS.map(_c2 = (p)=>p.value);
_c3 = THEME_PRESET_VALUES;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "THEME_MODE_VALUES$THEME_MODE_OPTIONS.map");
__turbopack_context__.k.register(_c1, "THEME_MODE_VALUES");
__turbopack_context__.k.register(_c2, "THEME_PRESET_VALUES$THEME_PRESET_OPTIONS.map");
__turbopack_context__.k.register(_c3, "THEME_PRESET_VALUES");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 // --- generated:themePresets:end ---
}),
"[project]/src/lib/preferences/preferences-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PREFERENCE_DEFAULTS",
    ()=>PREFERENCE_DEFAULTS,
    "PREFERENCE_KEYS",
    ()=>PREFERENCE_KEYS,
    "PREFERENCE_REGISTRY",
    ()=>PREFERENCE_REGISTRY,
    "getPreferencePersistence",
    ()=>getPreferencePersistence,
    "parsePreference",
    ()=>parsePreference
]);
/**
 * How each preference should be saved.
 *
 * "client-cookie"  → write cookie on the browser only.
 * "server-cookie"  → write cookie through a Server Action.
 * "localStorage"   → save only on the client (non-layout stuff).
 * "none"           → no saving, resets on reload.
 *
 * Layout-critical prefs (sidebar_variant / sidebar_collapsible)
 * must stay consistent during SSR → so they can’t use localStorage.
 * Others are flexible and can use any persistence.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fonts$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fonts/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preferences/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preferences/theme.ts [app-client] (ecmascript)");
;
;
;
function definePreference(definition) {
    return definition;
}
function defineSSRPreference(definition) {
    return definition;
}
const PREFERENCE_REGISTRY = {
    theme_mode: definePreference({
        values: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THEME_MODE_VALUES"],
        defaultValue: "light",
        persistence: "client-cookie",
        attribute: "data-theme-mode"
    }),
    theme_preset: definePreference({
        values: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THEME_PRESET_VALUES"],
        defaultValue: "default",
        persistence: "client-cookie",
        attribute: "data-theme-preset"
    }),
    font: definePreference({
        values: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fonts$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontKeys"],
        defaultValue: "geist",
        persistence: "client-cookie",
        attribute: "data-font"
    }),
    content_layout: definePreference({
        values: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTENT_LAYOUT_VALUES"],
        defaultValue: "centered",
        persistence: "client-cookie",
        attribute: "data-content-layout"
    }),
    navbar_style: definePreference({
        values: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAVBAR_STYLE_VALUES"],
        defaultValue: "sticky",
        persistence: "client-cookie",
        attribute: "data-navbar-style"
    }),
    sidebar_variant: defineSSRPreference({
        values: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIDEBAR_VARIANT_VALUES"],
        defaultValue: "sidebar",
        persistence: "client-cookie",
        attribute: "data-sidebar-variant"
    }),
    sidebar_collapsible: defineSSRPreference({
        values: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIDEBAR_COLLAPSIBLE_VALUES"],
        defaultValue: "icon",
        persistence: "client-cookie",
        attribute: "data-sidebar-collapsible"
    })
};
const PREFERENCE_KEYS = Object.freeze(_c = Object.keys(PREFERENCE_REGISTRY));
_c1 = PREFERENCE_KEYS;
function getPreferencePersistence(key) {
    return PREFERENCE_REGISTRY[key].persistence;
}
const PREFERENCE_DEFAULTS = Object.fromEntries(_c3 = PREFERENCE_KEYS.map(_c2 = (key)=>[
        key,
        PREFERENCE_REGISTRY[key].defaultValue
    ]));
_c4 = PREFERENCE_DEFAULTS;
function parsePreference(key, rawValue) {
    const definition = PREFERENCE_REGISTRY[key];
    const allowedValues = definition.values;
    if (rawValue && allowedValues.includes(rawValue)) {
        return rawValue;
    }
    return definition.defaultValue;
}
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "PREFERENCE_KEYS$Object.freeze");
__turbopack_context__.k.register(_c1, "PREFERENCE_KEYS");
__turbopack_context__.k.register(_c2, "PREFERENCE_DEFAULTS$Object.fromEntries$PREFERENCE_KEYS.map");
__turbopack_context__.k.register(_c3, "PREFERENCE_DEFAULTS$Object.fromEntries");
__turbopack_context__.k.register(_c4, "PREFERENCE_DEFAULTS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/preferences/theme-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyThemeMode",
    ()=>applyThemeMode,
    "subscribeToSystemTheme",
    ()=>subscribeToSystemTheme
]);
function resolveThemeMode(mode) {
    if (mode === "system") {
        const prefersDark = ("TURBOPACK compile-time value", "object") !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
        return prefersDark ? "dark" : "light";
    }
    return mode === "dark" ? "dark" : "light";
}
function applyThemeMode(mode) {
    const resolved = resolveThemeMode(mode);
    const doc = document.documentElement;
    doc.setAttribute("data-theme-mode", mode);
    doc.classList.add("disable-transitions");
    doc.classList.toggle("dark", resolved === "dark");
    doc.style.colorScheme = resolved;
    requestAnimationFrame(()=>{
        doc.classList.remove("disable-transitions");
    });
    return resolved;
}
function subscribeToSystemTheme(onChange) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!media) return ()=>undefined;
    const listener = (event)=>{
        onChange(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", listener);
    return ()=>{
        media.removeEventListener("change", listener);
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/preferences/preference-runtime.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyPreference",
    ()=>applyPreference
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preferences/preferences-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$theme$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preferences/theme-utils.ts [app-client] (ecmascript)");
"use client";
;
;
function applyPreference(key, value) {
    if (key === "theme_mode") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$theme$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyThemeMode"])(value);
    }
    document.documentElement.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PREFERENCE_REGISTRY"][key].attribute, value);
    return undefined;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/server/data:ef9755 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setValueToCookie",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"706020e8a823a1dc7aea55dc63bece91e606c9389b":{"name":"setValueToCookie"}},"src/server/server-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("706020e8a823a1dc7aea55dc63bece91e606c9389b", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "setValueToCookie");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/cookie.client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteClientCookie",
    ()=>deleteClientCookie,
    "getClientCookie",
    ()=>getClientCookie,
    "setClientCookie",
    ()=>setClientCookie
]);
// Client-side cookie utilities.
// These functions manage cookies in the browser only.
// Server actions handle cookie updates on the server side.
function writeClientCookie(serializedCookie) {
    // biome-ignore lint/suspicious/noDocumentCookie: This project still uses document.cookie for broad browser support.
    document.cookie = serializedCookie;
}
function setClientCookie(key, value, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    writeClientCookie(`${key}=${value}; expires=${expires}; path=/`);
}
function getClientCookie(key) {
    return document.cookie.split("; ").find((row)=>row.startsWith(`${key}=`))?.split("=")[1];
}
function deleteClientCookie(key) {
    writeClientCookie(`${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/local-storage.client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLocalStorageValue",
    ()=>getLocalStorageValue,
    "setLocalStorageValue",
    ()=>setLocalStorageValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use client";
function setLocalStorageValue(key, value) {
    try {
        window.localStorage.setItem(key, value);
    } catch (error) {
        if ("TURBOPACK compile-time truthy", 1) {
            console.error("[localStorage] Failed to write value:", error);
        }
    }
}
function getLocalStorageValue(key) {
    try {
        return window.localStorage.getItem(key);
    } catch  {
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/preferences/preferences-storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "persistPreference",
    ()=>persistPreference
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$data$3a$ef9755__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/server/data:ef9755 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cookie$2e$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cookie.client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/local-storage.client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preferences/preferences-config.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
async function persistByMode(mode, key, value) {
    switch(mode){
        case "none":
            return;
        case "client-cookie":
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cookie$2e$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setClientCookie"])(key, value);
            return;
        case "server-cookie":
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$data$3a$ef9755__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["setValueToCookie"])(key, value);
            return;
        case "localStorage":
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$local$2d$storage$2e$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setLocalStorageValue"])(key, value);
            return;
    }
}
function persistPreference(key, value) {
    return persistByMode((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPreferencePersistence"])(key), key, value);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/stores/preferences/preferences-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPreferencesStore",
    ()=>createPreferencesStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/vanilla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preference$2d$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preferences/preference-runtime.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preferences/preferences-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preferences/preferences-storage.ts [app-client] (ecmascript)");
;
;
;
;
const createPreferencesStore = (initialValues = {})=>{
    const values = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PREFERENCE_DEFAULTS"],
        ...initialValues
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])()((set)=>({
            values,
            resolvedThemeMode: values.theme_mode === "dark" ? "dark" : "light",
            isSynced: false,
            setPreference: (key, value)=>{
                const resolvedThemeMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preference$2d$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyPreference"])(key, value);
                set((state)=>({
                        values: {
                            ...state.values,
                            [key]: value
                        },
                        ...resolvedThemeMode ? {
                            resolvedThemeMode
                        } : {}
                    }));
                void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persistPreference"])(key, value);
            },
            resetPreferences: ()=>{
                let resolvedThemeMode = "light";
                for (const key of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PREFERENCE_KEYS"]){
                    const value = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PREFERENCE_DEFAULTS"][key];
                    const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preference$2d$runtime$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyPreference"])(key, value);
                    if (resolved) resolvedThemeMode = resolved;
                    void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persistPreference"])(key, value);
                }
                set({
                    values: {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PREFERENCE_DEFAULTS"]
                    },
                    resolvedThemeMode
                });
            }
        }));
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/stores/preferences/preferences-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PreferencesStoreProvider",
    ()=>PreferencesStoreProvider,
    "usePreferencesStore",
    ()=>usePreferencesStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preferences/preferences-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$theme$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preferences/theme-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$preferences$2f$preferences$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/stores/preferences/preferences-store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const PreferencesStoreContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function readDomPreference(key) {
    const definition = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PREFERENCE_REGISTRY"][key];
    const rawValue = document.documentElement.getAttribute(definition.attribute);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parsePreference"])(key, rawValue);
}
function readDomPreferences() {
    const values = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PREFERENCE_DEFAULTS"]
    };
    function assignPreference(key) {
        values[key] = readDomPreference(key);
    }
    for (const key of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PREFERENCE_KEYS"])assignPreference(key);
    return values;
}
function PreferencesStoreProvider(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(12);
    if ($[0] !== "2cdd8e10364c00663a7a6050e54342e1c385340f4ff9b97b699d8cc36fb0602d") {
        for(let $i = 0; $i < 12; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2cdd8e10364c00663a7a6050e54342e1c385340f4ff9b97b699d8cc36fb0602d";
    }
    const { children, initialValues } = t0;
    let t1;
    if ($[1] !== initialValues) {
        t1 = ({
            "PreferencesStoreProvider[useState()]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$preferences$2f$preferences$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPreferencesStore"])(initialValues)
        })["PreferencesStoreProvider[useState()]"];
        $[1] = initialValues;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const [store] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t1);
    let t2;
    let t3;
    if ($[3] !== store) {
        t2 = ({
            "PreferencesStoreProvider[useEffect()]": ()=>{
                store.setState({
                    values: readDomPreferences(),
                    resolvedThemeMode: document.documentElement.classList.contains("dark") ? "dark" : "light",
                    isSynced: true
                });
            }
        })["PreferencesStoreProvider[useEffect()]"];
        t3 = [
            store
        ];
        $[3] = store;
        $[4] = t2;
        $[5] = t3;
    } else {
        t2 = $[4];
        t3 = $[5];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    let t5;
    if ($[6] !== store) {
        t4 = ({
            "PreferencesStoreProvider[useEffect()]": ()=>{
                let unsubscribeMedia;
                const subscribeForMode = {
                    "PreferencesStoreProvider[useEffect() > subscribeForMode]": (mode)=>{
                        unsubscribeMedia?.();
                        unsubscribeMedia = undefined;
                        if (mode === "system") {
                            unsubscribeMedia = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$theme$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeToSystemTheme"])({
                                "PreferencesStoreProvider[useEffect() > subscribeForMode > subscribeToSystemTheme()]": ()=>{
                                    store.setState({
                                        resolvedThemeMode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$theme$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyThemeMode"])("system")
                                    });
                                }
                            }["PreferencesStoreProvider[useEffect() > subscribeForMode > subscribeToSystemTheme()]"]);
                        }
                    }
                }["PreferencesStoreProvider[useEffect() > subscribeForMode]"];
                subscribeForMode(store.getState().values.theme_mode);
                const unsubscribeStore = store.subscribe({
                    "PreferencesStoreProvider[useEffect() > store.subscribe()]": (state, previousState)=>{
                        if (state.values.theme_mode !== previousState.values.theme_mode) {
                            subscribeForMode(state.values.theme_mode);
                        }
                    }
                }["PreferencesStoreProvider[useEffect() > store.subscribe()]"]);
                return ()=>{
                    unsubscribeMedia?.();
                    unsubscribeStore();
                };
            }
        })["PreferencesStoreProvider[useEffect()]"];
        t5 = [
            store
        ];
        $[6] = store;
        $[7] = t4;
        $[8] = t5;
    } else {
        t4 = $[7];
        t5 = $[8];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    let t6;
    if ($[9] !== children || $[10] !== store) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreferencesStoreContext.Provider, {
            value: store,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/stores/preferences/preferences-provider.tsx",
            lineNumber: 115,
            columnNumber: 10
        }, this);
        $[9] = children;
        $[10] = store;
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    return t6;
}
_s(PreferencesStoreProvider, "jJf0lBc0SsA50F02XdcupO3X1+U=");
_c = PreferencesStoreProvider;
function usePreferencesStore(selector) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(1);
    if ($[0] !== "2cdd8e10364c00663a7a6050e54342e1c385340f4ff9b97b699d8cc36fb0602d") {
        for(let $i = 0; $i < 1; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2cdd8e10364c00663a7a6050e54342e1c385340f4ff9b97b699d8cc36fb0602d";
    }
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(PreferencesStoreContext);
    if (!store) {
        throw new Error("Missing PreferencesStoreProvider");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])(store, selector);
}
_s1(usePreferencesStore, "tRpAAnpj2/w/nb/IphdrVKKBg0Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
var _c;
__turbopack_context__.k.register(_c, "PreferencesStoreProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__1sbmywj._.js.map