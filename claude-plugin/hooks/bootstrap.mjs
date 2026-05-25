#!/usr/bin/env node

// harness-installers/claude-plugin/hooks/bootstrap.mjs
import fs7 from "node:fs";
import os2 from "node:os";
import path8 from "node:path";

// harness-installers/claude-plugin/lib/install/run-install.js
import fs6 from "node:fs";
import path7 from "node:path";

// harness-installers/claude-plugin/lib/install/user-data-paths.js
import os from "node:os";
import path from "node:path";
function userDataPaths(opts = {}) {
  const root = opts.radHome ?? path.join(os.homedir(), ".radorch");
  return {
    root,
    installJson: path.join(root, "install.json"),
    orchestrationYml: path.join(root, "orchestration.yml"),
    templates: path.join(root, "templates"),
    ui: path.join(root, "ui"),
    projects: path.join(root, "projects"),
    logs: path.join(root, "logs"),
    installLog: path.join(root, "logs", "install.log")
  };
}

// harness-installers/claude-plugin/lib/install/install-json.js
import fs from "node:fs";
import path2 from "node:path";
function readInstallJson(file) {
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
function writeInstallJson(file, value) {
  fs.mkdirSync(path2.dirname(file), { recursive: true });
  const sanitized = { ...value };
  delete sanitized.state_schema_version;
  const tmp = `${file}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tmp, JSON.stringify(sanitized, null, 2) + "\n", "utf8");
  fs.renameSync(tmp, file);
}
function isCurrentShape(ij) {
  return !!ij && typeof ij.harnesses === "object" && ij.harnesses !== null;
}
function loadRegistry(installJsonPath) {
  try {
    if (!fs.existsSync(installJsonPath)) return { harnesses: {} };
    const ij = readInstallJson(installJsonPath);
    if (!isCurrentShape(ij)) return { harnesses: {} };
    return ij;
  } catch {
    return { harnesses: {} };
  }
}
function buildClaudePluginEntry(version) {
  return {
    version,
    channel: "claude-plugin",
    installed_at: (/* @__PURE__ */ new Date()).toISOString(),
    last_writer_version: version
  };
}

// harness-installers/claude-plugin/lib/install/catalog.js
import fs2 from "node:fs";
import path3 from "node:path";
function loadManifest(pluginRoot, version) {
  const p = path3.join(pluginRoot, "manifests", `v${version}.json`);
  if (!fs2.existsSync(p)) throw new Error(`manifest not found for v${version} at ${p}`);
  return JSON.parse(fs2.readFileSync(p, "utf8"));
}

// harness-installers/claude-plugin/lib/install/install-files.js
import fs3 from "node:fs";
import path4 from "node:path";
function expand(destPath, paths) {
  return destPath.replaceAll("${RAD_HOME}", paths.root);
}
function installManifestFiles(manifest, pluginRoot, opts = {}) {
  const paths = userDataPaths(opts);
  const rootResolved = path4.resolve(paths.root);
  let copied = 0;
  for (const entry of manifest.files) {
    const dest = path4.resolve(expand(entry.destinationPath, paths));
    const rel = path4.relative(rootResolved, dest);
    if (rel.startsWith("..") || path4.isAbsolute(rel)) {
      throw new Error(`install: destination escapes ~/.radorch/: ${dest}`);
    }
    const src = path4.join(pluginRoot, entry.sourcePath);
    fs3.mkdirSync(path4.dirname(dest), { recursive: true });
    fs3.copyFileSync(src, dest);
    copied++;
  }
  return { copied };
}

// harness-installers/claude-plugin/lib/install/remove-files.js
import fs4 from "node:fs";
import path5 from "node:path";
function removeManifestFiles(manifest, opts = {}) {
  const paths = userDataPaths(opts);
  const rootResolved = path5.resolve(paths.root);
  const projectsResolved = path5.resolve(paths.projects);
  const isUnder = (parent, child) => {
    const rel = path5.relative(parent, child);
    return rel !== "" && !rel.startsWith("..") && !path5.isAbsolute(rel);
  };
  const touched = /* @__PURE__ */ new Set();
  for (const entry of manifest.files) {
    if (entry.ownership === "user-config") continue;
    const dest = path5.resolve(entry.destinationPath.replaceAll("${RAD_HOME}", paths.root));
    if (!isUnder(rootResolved, dest)) continue;
    if (dest === projectsResolved || isUnder(projectsResolved, dest)) continue;
    if (fs4.existsSync(dest)) fs4.rmSync(dest, { force: true });
    let parent = path5.dirname(dest);
    while (isUnder(rootResolved, parent) && parent !== projectsResolved) {
      touched.add(parent);
      parent = path5.dirname(parent);
    }
  }
  const sorted = [...touched].sort((a, b) => b.length - a.length);
  for (const dir of sorted) {
    if (!fs4.existsSync(dir)) continue;
    try {
      if (fs4.readdirSync(dir).length === 0) fs4.rmdirSync(dir);
    } catch {
    }
  }
}

// harness-installers/claude-plugin/lib/install/install-log.js
import fs5 from "node:fs";
import path6 from "node:path";
var INSTALL_LOG_ACTIONS = Object.freeze(/* @__PURE__ */ new Set([
  "fresh-install",
  "upgrade-complete",
  "noop",
  "downgrade-noop",
  "cancelled-modified-files",
  "error"
]));
function appendInstallLog(file, { action, deliveringVersion, installedVersionBefore }, opts = {}) {
  const { mkdirAncestors = true } = opts;
  try {
    if (!INSTALL_LOG_ACTIONS.has(action)) {
      throw new Error(`install-log: unknown action ${action}`);
    }
    const entry = {
      at: (/* @__PURE__ */ new Date()).toISOString(),
      channel: "claude-plugin",
      action,
      delivering_version: deliveringVersion,
      installed_version_before: installedVersionBefore ?? null
    };
    if (mkdirAncestors) fs5.mkdirSync(path6.dirname(file), { recursive: true });
    fs5.appendFileSync(file, JSON.stringify(entry) + "\n");
  } catch {
  }
}

// harness-installers/claude-plugin/lib/install/run-install.js
var INSTALL_KEY = "claude-plugin";
function cmpSemver(a, b) {
  const pa = a.split(/[.-]/).map((p) => /^\d+$/.test(p) ? Number(p) : p);
  const pb = b.split(/[.-]/).map((p) => /^\d+$/.test(p) ? Number(p) : p);
  const n = Math.max(pa.length, pb.length);
  for (let i = 0; i < n; i++) {
    const x = pa[i];
    const y = pb[i];
    if (x === void 0) return typeof y === "string" ? 1 : -1;
    if (y === void 0) return typeof x === "string" ? -1 : 1;
    if (typeof x === "number" && typeof y === "number") {
      if (x !== y) return x < y ? -1 : 1;
    } else if (typeof x === "number") return 1;
    else if (typeof y === "number") return -1;
    else if (x !== y) return x < y ? -1 : 1;
  }
  return 0;
}
function emitCoexistenceWarning(stderr, partner) {
  stderr(
    `WARNING: A ${partner} install of rad-orchestration is already registered alongside claude-plugin.
Both keys coexist in ~/.radorch/install.json so neither install clobbers the other's metadata,
but the plugin install is now the recommended channel. Consider removing the ${partner} install once
the plugin is verified working.
`
  );
}
async function runInstall(opts) {
  const stderr = opts.stderr ?? ((msg) => process.stderr.write(msg));
  const paths = userDataPaths({ radHome: opts.radHome });
  let deliveringVersion = null;
  let installedVersionBefore = null;
  try {
    const pkg = JSON.parse(fs6.readFileSync(path7.join(opts.pluginRoot, "package.json"), "utf8"));
    deliveringVersion = pkg.version;
    const sentinel = path7.join(opts.pluginRoot, "skills/rad-orchestration/scripts/radorch.mjs");
    fs6.mkdirSync(paths.projects, { recursive: true });
    fs6.mkdirSync(paths.logs, { recursive: true });
    const ij = loadRegistry(paths.installJson);
    const prior = ij.harnesses[INSTALL_KEY];
    installedVersionBefore = prior?.version ?? null;
    const sentinelPresent = fs6.existsSync(sentinel);
    if (ij.harnesses.claude) emitCoexistenceWarning(stderr, "legacy (claude) installer");
    if (prior && installedVersionBefore === deliveringVersion && sentinelPresent && !opts.force) {
      appendInstallLog(paths.installLog, { action: "noop", deliveringVersion, installedVersionBefore });
      return { action: "noop", deliveringVersion, installedVersionBefore };
    }
    if (prior && cmpSemver(deliveringVersion, installedVersionBefore) < 0 && !opts.force) {
      stderr(`[install] Delivering v${deliveringVersion} is older than installed v${installedVersionBefore}; downgrade accepted as no-op.
`);
      appendInstallLog(paths.installLog, { action: "downgrade-noop", deliveringVersion, installedVersionBefore });
      return { action: "downgrade-noop", deliveringVersion, installedVersionBefore };
    }
    if (prior && installedVersionBefore !== deliveringVersion) {
      try {
        const priorManifest = loadManifest(opts.pluginRoot, installedVersionBefore);
        removeManifestFiles(priorManifest, { radHome: opts.radHome });
      } catch {
      }
    }
    const manifest = loadManifest(opts.pluginRoot, deliveringVersion);
    installManifestFiles(manifest, opts.pluginRoot, { radHome: opts.radHome });
    const pluginUiDir = path7.join(opts.pluginRoot, "_install-source/ui");
    if (fs6.existsSync(pluginUiDir)) {
      fs6.rmSync(paths.ui, { recursive: true, force: true });
      fs6.cpSync(pluginUiDir, paths.ui, { recursive: true });
    }
    fs6.rmSync(path7.join(opts.pluginRoot, "_install-source"), { recursive: true, force: true });
    ij.harnesses[INSTALL_KEY] = buildClaudePluginEntry(deliveringVersion);
    writeInstallJson(paths.installJson, ij);
    const action = installedVersionBefore && sentinelPresent ? "upgrade-complete" : "fresh-install";
    appendInstallLog(paths.installLog, { action, deliveringVersion, installedVersionBefore });
    return { action, deliveringVersion, installedVersionBefore };
  } catch (err) {
    appendInstallLog(paths.installLog, { action: "error", deliveringVersion, installedVersionBefore });
    throw err;
  }
}

// harness-installers/claude-plugin/hooks/bootstrap.mjs
function log(msg) {
  process.stderr.write(`[rad-orchestration:bootstrap] ${msg}
`);
}
function isUnderClaudeCache(pluginRoot) {
  const cacheRoot = path8.join(os2.homedir(), ".claude", "plugins", "cache");
  const normalized = path8.resolve(pluginRoot);
  const prefix = cacheRoot + path8.sep;
  return process.platform === "win32" ? normalized.toLowerCase().startsWith(prefix.toLowerCase()) : normalized.startsWith(prefix);
}
function selfUninstall(pluginRoot) {
  if (!isUnderClaudeCache(pluginRoot) && process.env.RAD_BOOTSTRAP_SELFUNINSTALL_ALLOW_NONCACHE !== "1") {
    log(`selfUninstall skipped: pluginRoot=${pluginRoot} is not under Claude Code cache`);
    return;
  }
  const hooksJson = path8.join(pluginRoot, "hooks", "hooks.json");
  try {
    const manifest = JSON.parse(fs7.readFileSync(hooksJson, "utf8"));
    if (manifest.hooks?.UserPromptSubmit) {
      delete manifest.hooks.UserPromptSubmit;
      const tmp = `${hooksJson}.tmp-${process.pid}-${Date.now()}`;
      fs7.writeFileSync(tmp, JSON.stringify(manifest, null, 2) + "\n", "utf8");
      fs7.renameSync(tmp, hooksJson);
    }
  } catch (err) {
    log(`hooks.json self-uninstall failed (non-fatal): ${err.message}`);
  }
}
async function main() {
  const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT;
  if (!pluginRoot) {
    log("CLAUDE_PLUGIN_ROOT unset");
    return 0;
  }
  const radHome = process.env.RAD_HOME;
  try {
    const result = await runInstall({ pluginRoot, radHome });
    log(`install action=${result.action}`);
    selfUninstall(pluginRoot);
    return 0;
  } catch (err) {
    log(`install failed (hooks.json left intact for retry): ${err.message}`);
    return 1;
  }
}
process.exit(await main());
