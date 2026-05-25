#!/usr/bin/env node

// harness-installers/copilot-cli-plugin/hooks/bootstrap.mjs
import fs7 from "node:fs";
import os2 from "node:os";
import path8 from "node:path";
import { fileURLToPath } from "node:url";

// harness-installers/copilot-cli-plugin/lib/install/run-install.js
import fs6 from "node:fs";
import path7 from "node:path";

// harness-installers/copilot-cli-plugin/lib/install/user-data-paths.js
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

// harness-installers/copilot-cli-plugin/lib/install/install-json.js
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
function buildCopilotCliPluginEntry(version) {
  return {
    version,
    channel: "copilot-cli-plugin",
    installed_at: (/* @__PURE__ */ new Date()).toISOString(),
    last_writer_version: version
  };
}

// harness-installers/copilot-cli-plugin/lib/install/catalog.js
import fs2 from "node:fs";
import path3 from "node:path";
function loadManifest(pluginRoot2, version) {
  const p = path3.join(pluginRoot2, "manifests", `v${version}.json`);
  if (!fs2.existsSync(p)) throw new Error(`manifest not found for v${version} at ${p}`);
  return JSON.parse(fs2.readFileSync(p, "utf8"));
}

// harness-installers/copilot-cli-plugin/lib/install/install-files.js
import fs3 from "node:fs";
import path4 from "node:path";
function expand(destPath, paths) {
  return destPath.replaceAll("${RAD_HOME}", paths.root);
}
function installManifestFiles(manifest, pluginRoot2, opts = {}) {
  const paths = userDataPaths(opts);
  const resolvedRoot = path4.resolve(paths.root);
  let copied = 0;
  for (const entry of manifest.files) {
    const dest = expand(entry.destinationPath, paths);
    const resolvedDest = path4.resolve(dest);
    if (resolvedDest !== resolvedRoot && !resolvedDest.startsWith(resolvedRoot + path4.sep)) {
      throw new Error(`install: destination escapes ~/.radorch/: ${dest}`);
    }
    if (entry.ownership === "user-config" && fs3.existsSync(resolvedDest)) continue;
    const src = path4.join(pluginRoot2, entry.sourcePath);
    fs3.mkdirSync(path4.dirname(resolvedDest), { recursive: true });
    fs3.copyFileSync(src, resolvedDest);
    copied++;
  }
  return { copied };
}

// harness-installers/copilot-cli-plugin/lib/install/remove-files.js
import fs4 from "node:fs";
import path5 from "node:path";
function removeManifestFiles(manifest, opts = {}) {
  const paths = userDataPaths(opts);
  const resolvedRoot = path5.resolve(paths.root);
  const resolvedProjects = path5.resolve(paths.projects);
  const touched = /* @__PURE__ */ new Set();
  for (const entry of manifest.files) {
    if (entry.ownership === "user-config") continue;
    const dest = entry.destinationPath.replaceAll("${RAD_HOME}", paths.root);
    const resolvedDest = path5.resolve(dest);
    if (resolvedDest !== resolvedRoot && !resolvedDest.startsWith(resolvedRoot + path5.sep)) continue;
    if (resolvedDest === resolvedProjects || resolvedDest.startsWith(resolvedProjects + path5.sep)) continue;
    if (fs4.existsSync(resolvedDest)) fs4.rmSync(resolvedDest, { force: true });
    let parent = path5.dirname(resolvedDest);
    while (parent.startsWith(resolvedRoot) && parent !== resolvedRoot && parent !== resolvedProjects) {
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

// harness-installers/copilot-cli-plugin/lib/install/install-log.js
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
    if (!INSTALL_LOG_ACTIONS.has(action)) throw new Error(`install-log: unknown action ${action}`);
    const entry = {
      at: (/* @__PURE__ */ new Date()).toISOString(),
      channel: "copilot-cli-plugin",
      action,
      delivering_version: deliveringVersion,
      installed_version_before: installedVersionBefore ?? null
    };
    if (mkdirAncestors) fs5.mkdirSync(path6.dirname(file), { recursive: true });
    fs5.appendFileSync(file, JSON.stringify(entry) + "\n");
  } catch {
  }
}

// harness-installers/copilot-cli-plugin/lib/install/run-install.js
var INSTALL_KEY = "copilot-cli-plugin";
var COEXISTENCE_PARTNERS = ["copilot-cli", "copilot-vscode"];
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
    } else if (typeof x === "number") return -1;
    else if (typeof y === "number") return 1;
    else if (x !== y) return x < y ? -1 : 1;
  }
  return 0;
}
function readDeliveringVersion(pluginRoot2) {
  const pluginJsonPath = path7.join(pluginRoot2, "plugin.json");
  if (fs6.existsSync(pluginJsonPath)) {
    const pj = JSON.parse(fs6.readFileSync(pluginJsonPath, "utf8"));
    if (pj.version) return pj.version;
  }
  const pkgJsonPath = path7.join(pluginRoot2, "package.json");
  const pkg = JSON.parse(fs6.readFileSync(pkgJsonPath, "utf8"));
  return pkg.version;
}
function emitCoexistenceWarning(stderr, partnersPresent) {
  const partnerList = partnersPresent.join(" and ");
  stderr(
    `WARNING: A standard-installer ${partnerList} install of rad-orchestration is already registered
alongside copilot-cli-plugin. All keys coexist in ~/.radorch/install.json so neither install
clobbers the other's metadata, but the standard-installer's user-level files at ~/.copilot/
will shadow plugin-shipped agents and skills per Copilot CLI's documented load order.
Consider removing the standard-installer (${partnerList}) install if the plugin is the canonical channel.
`
  );
}
async function runInstall(opts) {
  const stderr = opts.stderr ?? ((msg) => process.stderr.write(msg));
  const paths = userDataPaths({ radHome: opts.radHome });
  let deliveringVersion = null;
  let installedVersionBefore = null;
  try {
    deliveringVersion = readDeliveringVersion(opts.pluginRoot);
    const sentinel = path7.join(opts.pluginRoot, "skills/rad-orchestration/scripts/radorch.mjs");
    fs6.mkdirSync(paths.projects, { recursive: true });
    fs6.mkdirSync(paths.logs, { recursive: true });
    const ij = loadRegistry(paths.installJson);
    const prior = ij.harnesses[INSTALL_KEY];
    installedVersionBefore = prior?.version ?? null;
    const sentinelPresent = fs6.existsSync(sentinel);
    const partnersPresent = COEXISTENCE_PARTNERS.filter((k) => ij.harnesses[k]);
    if (partnersPresent.length > 0) emitCoexistenceWarning(stderr, partnersPresent);
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
    ij.harnesses[INSTALL_KEY] = buildCopilotCliPluginEntry(deliveringVersion);
    writeInstallJson(paths.installJson, ij);
    const action = installedVersionBefore && sentinelPresent ? "upgrade-complete" : "fresh-install";
    appendInstallLog(paths.installLog, { action, deliveringVersion, installedVersionBefore });
    return { action, deliveringVersion, installedVersionBefore };
  } catch (err) {
    appendInstallLog(paths.installLog, { action: "error", deliveringVersion, installedVersionBefore });
    throw err;
  }
}

// harness-installers/copilot-cli-plugin/hooks/bootstrap.mjs
function log(msg) {
  process.stderr.write(`[rad-orchestration:copilot-cli-bootstrap] ${msg}
`);
}
var scriptDir = path8.dirname(fileURLToPath(import.meta.url));
var pluginRoot = path8.resolve(scriptDir, "..");
if (!process.env.COPILOT_CLI_PLUGIN_ROOT) {
  process.env.COPILOT_CLI_PLUGIN_ROOT = pluginRoot;
}
function selfUninstall(root) {
  const hooksJson = path8.join(root, "hooks", "hooks.json");
  try {
    const manifest = JSON.parse(fs7.readFileSync(hooksJson, "utf8"));
    if (manifest.hooks?.userPromptSubmitted) {
      delete manifest.hooks.userPromptSubmitted;
      const tmp = `${hooksJson}.tmp-${process.pid}-${Date.now()}`;
      fs7.writeFileSync(tmp, JSON.stringify(manifest, null, 2) + "\n", "utf8");
      fs7.renameSync(tmp, hooksJson);
    }
  } catch (err) {
    log(`hooks.json self-uninstall failed (non-fatal): ${err.message}`);
  }
}
async function main() {
  const radHome = process.env.RAD_HOME ?? path8.join(os2.homedir(), ".radorch");
  try {
    const result = await runInstall({ pluginRoot: process.env.COPILOT_CLI_PLUGIN_ROOT, radHome });
    log(`install action=${result.action}`);
    selfUninstall(process.env.COPILOT_CLI_PLUGIN_ROOT);
    return 0;
  } catch (err) {
    log(`install failed (hooks.json left intact for retry): ${err.message}`);
    return 1;
  }
}
process.exit(await main());
