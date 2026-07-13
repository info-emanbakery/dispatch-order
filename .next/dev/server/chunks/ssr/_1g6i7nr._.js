module.exports = [
"[project]/src/server/server-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"400b08dfde5509067065c7ca7805abe919fc393e9b":{"name":"getPreference"},"406975beee4ea23d449bd89852bc841f85ae7b7590":{"name":"getValueFromCookie"},"706020e8a823a1dc7aea55dc63bece91e606c9389b":{"name":"setValueToCookie"}},"src/server/server-actions.ts",""] */ __turbopack_context__.s([
    "getPreference",
    ()=>getPreference,
    "getValueFromCookie",
    ()=>getValueFromCookie,
    "setValueToCookie",
    ()=>setValueToCookie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preferences/preferences-config.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getValueFromCookie(key) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return cookieStore.get(key)?.value;
}
async function setValueToCookie(key, value, options = {}) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set(key, value, {
        path: options.path ?? "/",
        maxAge: options.maxAge ?? 60 * 60 * 24 * 7
    });
}
async function getPreference(key) {
    const definition = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PREFERENCE_REGISTRY"][key];
    const persistence = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPreferencePersistence"])(key);
    if (persistence !== "client-cookie" && persistence !== "server-cookie") {
        return definition.defaultValue;
    }
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preferences$2f$preferences$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parsePreference"])(key, cookieStore.get(key)?.value.trim());
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getValueFromCookie,
    setValueToCookie,
    getPreference
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getValueFromCookie, "406975beee4ea23d449bd89852bc841f85ae7b7590", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(setValueToCookie, "706020e8a823a1dc7aea55dc63bece91e606c9389b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPreference, "400b08dfde5509067065c7ca7805abe919fc393e9b", null);
}),
"[project]/.next-internal/server/app/(main)/auth/v1/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/server/server-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$server$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/server-actions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/(main)/auth/v1/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/server/server-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "706020e8a823a1dc7aea55dc63bece91e606c9389b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$server$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setValueToCookie"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$main$292f$auth$2f$v1$2f$login$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$server$2f$server$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(main)/auth/v1/login/page/actions.js { ACTIONS_MODULE0 => "[project]/src/server/server-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$server$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/server-actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_1g6i7nr._.js.map