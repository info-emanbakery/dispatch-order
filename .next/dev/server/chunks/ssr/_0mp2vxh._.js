module.exports = [
"[project]/src/lib/supabase/admin.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminClient",
    ()=>createAdminClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
;
function createAdminClient() {
    const url = ("TURBOPACK compile-time value", "https://ptenytzvmrwaagztbkyr.supabase.co/");
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceRoleKey) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
}),
"[project]/src/server/users-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40126e1004312cedc5d09caeb7e9a03f44ab68713b":{"name":"setUserActiveAction"},"403d04975faf2c99a9e423311ac411be948d3e4bba":{"name":"resetUserPasswordAction"},"403e1c648e1a13e30a00adf8629b3b403435e30bf1":{"name":"updateUserAction"},"4068aad072c90c7ea06049d8eb651fc81ce6aa5b6d":{"name":"createUserAction"}},"src/server/users-actions.ts",""] */ __turbopack_context__.s([
    "createUserAction",
    ()=>createUserAction,
    "resetUserPasswordAction",
    ()=>resetUserPasswordAction,
    "setUserActiveAction",
    ()=>setUserActiveAction,
    "updateUserAction",
    ()=>updateUserAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$modules$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth/modules.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
const MODULE_KEYS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$modules$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APP_MODULES"].map((m)=>m.key);
const permissionRowSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    module: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(MODULE_KEYS),
    can_view: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    can_read: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    can_create: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    can_edit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean()
});
const createUserSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    fullName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(2, "Name must be at least 2 characters.").max(100),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].email("Invalid email address."),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(8, "Password must be at least 8 characters.").max(72),
    permissions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(permissionRowSchema).max(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$modules$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APP_MODULES"].length)
});
const updateUserSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].uuid(),
    fullName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(2, "Name must be at least 2 characters.").max(100),
    permissions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(permissionRowSchema).max(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$modules$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APP_MODULES"].length)
});
const setActiveSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].uuid(),
    active: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean()
});
const resetPasswordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].uuid(),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(8, "Password must be at least 8 characters.").max(72)
});
function firstZodError(error) {
    return error.issues[0]?.message ?? "Invalid input.";
}
async function createUserAction(input) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSessionProfile"])();
    if (!session || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["can"])(session, "users", "create")) {
        return {
            success: false,
            error: "You don't have permission to create users."
        };
    }
    const parsed = createUserSchema.safeParse(input);
    if (!parsed.success) return {
        success: false,
        error: firstZodError(parsed.error)
    };
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { fullName, email, password, permissions } = parsed.data;
    const { data: created, error: createError } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
            full_name: fullName
        }
    });
    if (createError) {
        const friendly = createError.message.toLowerCase().includes("already") ? "A user with this email address already exists." : createError.message;
        return {
            success: false,
            error: friendly
        };
    }
    const { error: profileError } = await admin.from("profiles").insert({
        id: created.user.id,
        full_name: fullName,
        email,
        is_master_admin: false,
        active: true
    });
    if (profileError) {
        await admin.auth.admin.deleteUser(created.user.id);
        return {
            success: false,
            error: `Failed to create profile: ${profileError.message}`
        };
    }
    if (permissions.length > 0) {
        const rows = permissions.map((p)=>({
                user_id: created.user.id,
                ...p
            }));
        const { error: permError } = await admin.from("permissions").upsert(rows, {
            onConflict: "user_id,module"
        });
        if (permError) {
            return {
                success: false,
                error: `User created but permissions failed to save: ${permError.message}`
            };
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/users");
    return {
        success: true
    };
}
async function updateUserAction(input) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSessionProfile"])();
    if (!session || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["can"])(session, "users", "edit")) {
        return {
            success: false,
            error: "You don't have permission to edit users."
        };
    }
    const parsed = updateUserSchema.safeParse(input);
    if (!parsed.success) return {
        success: false,
        error: firstZodError(parsed.error)
    };
    const { userId, fullName, permissions } = parsed.data;
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { data: target } = await admin.from("profiles").select("id, is_master_admin").eq("id", userId).single();
    if (!target) return {
        success: false,
        error: "User not found."
    };
    if (target.is_master_admin && userId !== session.userId) {
        return {
            success: false,
            error: "The Master Admin account can only be edited by the Master Admin."
        };
    }
    // Guardrail check BEFORE any write: non-master users may rename themselves,
    // but their own permission rows are never touched (matrix is read-only for self in the UI).
    const isSelfEdit = userId === session.userId;
    const { error: profileError } = await admin.from("profiles").update({
        full_name: fullName
    }).eq("id", userId);
    if (profileError) return {
        success: false,
        error: profileError.message
    };
    // Master admin has implicit full access — no permission rows needed.
    // Self-edits never modify own permissions (server-side guardrail).
    if (!target.is_master_admin && !isSelfEdit) {
        const rows = permissions.map((p)=>({
                user_id: userId,
                ...p
            }));
        const { error: permError } = await admin.from("permissions").upsert(rows, {
            onConflict: "user_id,module"
        });
        if (permError) return {
            success: false,
            error: permError.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/users");
    return {
        success: true
    };
}
async function setUserActiveAction(input) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSessionProfile"])();
    if (!session || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["can"])(session, "users", "edit")) {
        return {
            success: false,
            error: "You don't have permission to edit users."
        };
    }
    const parsed = setActiveSchema.safeParse(input);
    if (!parsed.success) return {
        success: false,
        error: firstZodError(parsed.error)
    };
    const { userId, active } = parsed.data;
    if (userId === session.userId) {
        return {
            success: false,
            error: "You cannot deactivate your own account."
        };
    }
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { data: target } = await admin.from("profiles").select("id, is_master_admin").eq("id", userId).single();
    if (!target) return {
        success: false,
        error: "User not found."
    };
    if (target.is_master_admin) {
        return {
            success: false,
            error: "The Master Admin account cannot be deactivated."
        };
    }
    const { error } = await admin.from("profiles").update({
        active
    }).eq("id", userId);
    if (error) return {
        success: false,
        error: error.message
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/users");
    return {
        success: true
    };
}
async function resetUserPasswordAction(input) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSessionProfile"])();
    if (!session || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["can"])(session, "users", "edit")) {
        return {
            success: false,
            error: "You don't have permission to edit users."
        };
    }
    const parsed = resetPasswordSchema.safeParse(input);
    if (!parsed.success) return {
        success: false,
        error: firstZodError(parsed.error)
    };
    const { userId, password } = parsed.data;
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { data: target } = await admin.from("profiles").select("id, is_master_admin").eq("id", userId).single();
    if (!target) return {
        success: false,
        error: "User not found."
    };
    if (target.is_master_admin && userId !== session.userId) {
        return {
            success: false,
            error: "Only the Master Admin can reset their own password."
        };
    }
    const { error } = await admin.auth.admin.updateUserById(userId, {
        password
    });
    if (error) return {
        success: false,
        error: error.message
    };
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createUserAction,
    updateUserAction,
    setUserActiveAction,
    resetUserPasswordAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createUserAction, "4068aad072c90c7ea06049d8eb651fc81ce6aa5b6d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUserAction, "403e1c648e1a13e30a00adf8629b3b403435e30bf1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(setUserActiveAction, "40126e1004312cedc5d09caeb7e9a03f44ab68713b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resetUserPasswordAction, "403d04975faf2c99a9e423311ac411be948d3e4bba", null);
}),
"[project]/.next-internal/server/app/(main)/dashboard/users/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/server/server-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/server/users-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$server$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/server-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$users$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/users-actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/(main)/dashboard/users/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/server/server-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/server/users-actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "400b08dfde5509067065c7ca7805abe919fc393e9b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$server$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPreference"],
    "40126e1004312cedc5d09caeb7e9a03f44ab68713b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$users$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setUserActiveAction"],
    "403d04975faf2c99a9e423311ac411be948d3e4bba",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$users$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resetUserPasswordAction"],
    "403e1c648e1a13e30a00adf8629b3b403435e30bf1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$users$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateUserAction"],
    "4068aad072c90c7ea06049d8eb651fc81ce6aa5b6d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$users$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createUserAction"],
    "406975beee4ea23d449bd89852bc841f85ae7b7590",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$server$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getValueFromCookie"],
    "706020e8a823a1dc7aea55dc63bece91e606c9389b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$server$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setValueToCookie"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$main$292f$dashboard$2f$users$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$server$2f$server$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$server$2f$users$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(main)/dashboard/users/page/actions.js { ACTIONS_MODULE0 => "[project]/src/server/server-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/server/users-actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$server$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/server-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$users$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/users-actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_0mp2vxh._.js.map