#!/usr/bin/env node
import { createRequire as __cjsRequireHelper } from 'node:module';
const require = __cjsRequireHelper(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// cli/node_modules/commander/lib/error.js
var require_error = __commonJS({
  "cli/node_modules/commander/lib/error.js"(exports) {
    var CommanderError2 = class extends Error {
      /**
       * Constructs the CommanderError class
       * @param {number} exitCode suggested exit code which could be used with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       */
      constructor(exitCode, code, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = code;
        this.exitCode = exitCode;
        this.nestedError = void 0;
      }
    };
    var InvalidArgumentError2 = class extends CommanderError2 {
      /**
       * Constructs the InvalidArgumentError class
       * @param {string} [message] explanation of why argument is invalid
       */
      constructor(message) {
        super(1, "commander.invalidArgument", message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
      }
    };
    exports.CommanderError = CommanderError2;
    exports.InvalidArgumentError = InvalidArgumentError2;
  }
});

// cli/node_modules/commander/lib/argument.js
var require_argument = __commonJS({
  "cli/node_modules/commander/lib/argument.js"(exports) {
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var Argument2 = class {
      /**
       * Initialize a new command argument with the given name and description.
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @param {string} name
       * @param {string} [description]
       */
      constructor(name, description) {
        this.description = description || "";
        this.variadic = false;
        this.parseArg = void 0;
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.argChoices = void 0;
        switch (name[0]) {
          case "<":
            this.required = true;
            this._name = name.slice(1, -1);
            break;
          case "[":
            this.required = false;
            this._name = name.slice(1, -1);
            break;
          default:
            this.required = true;
            this._name = name;
            break;
        }
        if (this._name.endsWith("...")) {
          this.variadic = true;
          this._name = this._name.slice(0, -3);
        }
      }
      /**
       * Return argument name.
       *
       * @return {string}
       */
      name() {
        return this._name;
      }
      /**
       * @package
       */
      _collectValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        previous.push(value);
        return previous;
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Argument}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Set the custom handler for processing CLI command arguments into argument values.
       *
       * @param {Function} [fn]
       * @return {Argument}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Only allow argument value to be one of choices.
       *
       * @param {string[]} values
       * @return {Argument}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(
              `Allowed choices are ${this.argChoices.join(", ")}.`
            );
          }
          if (this.variadic) {
            return this._collectValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Make argument required.
       *
       * @returns {Argument}
       */
      argRequired() {
        this.required = true;
        return this;
      }
      /**
       * Make argument optional.
       *
       * @returns {Argument}
       */
      argOptional() {
        this.required = false;
        return this;
      }
    };
    function humanReadableArgName(arg) {
      const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
      return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
    }
    exports.Argument = Argument2;
    exports.humanReadableArgName = humanReadableArgName;
  }
});

// cli/node_modules/commander/lib/help.js
var require_help = __commonJS({
  "cli/node_modules/commander/lib/help.js"(exports) {
    var { humanReadableArgName } = require_argument();
    var Help2 = class {
      constructor() {
        this.helpWidth = void 0;
        this.minWidthToWrap = 40;
        this.sortSubcommands = false;
        this.sortOptions = false;
        this.showGlobalOptions = false;
      }
      /**
       * prepareContext is called by Commander after applying overrides from `Command.configureHelp()`
       * and just before calling `formatHelp()`.
       *
       * Commander just uses the helpWidth and the rest is provided for optional use by more complex subclasses.
       *
       * @param {{ error?: boolean, helpWidth?: number, outputHasColors?: boolean }} contextOptions
       */
      prepareContext(contextOptions) {
        this.helpWidth = this.helpWidth ?? contextOptions.helpWidth ?? 80;
      }
      /**
       * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
       *
       * @param {Command} cmd
       * @returns {Command[]}
       */
      visibleCommands(cmd) {
        const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
        const helpCommand = cmd._getHelpCommand();
        if (helpCommand && !helpCommand._hidden) {
          visibleCommands.push(helpCommand);
        }
        if (this.sortSubcommands) {
          visibleCommands.sort((a, b) => {
            return a.name().localeCompare(b.name());
          });
        }
        return visibleCommands;
      }
      /**
       * Compare options for sort.
       *
       * @param {Option} a
       * @param {Option} b
       * @returns {number}
       */
      compareOptions(a, b) {
        const getSortKey = (option) => {
          return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
        };
        return getSortKey(a).localeCompare(getSortKey(b));
      }
      /**
       * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleOptions(cmd) {
        const visibleOptions = cmd.options.filter((option) => !option.hidden);
        const helpOption = cmd._getHelpOption();
        if (helpOption && !helpOption.hidden) {
          const removeShort = helpOption.short && cmd._findOption(helpOption.short);
          const removeLong = helpOption.long && cmd._findOption(helpOption.long);
          if (!removeShort && !removeLong) {
            visibleOptions.push(helpOption);
          } else if (helpOption.long && !removeLong) {
            visibleOptions.push(
              cmd.createOption(helpOption.long, helpOption.description)
            );
          } else if (helpOption.short && !removeShort) {
            visibleOptions.push(
              cmd.createOption(helpOption.short, helpOption.description)
            );
          }
        }
        if (this.sortOptions) {
          visibleOptions.sort(this.compareOptions);
        }
        return visibleOptions;
      }
      /**
       * Get an array of the visible global options. (Not including help.)
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleGlobalOptions(cmd) {
        if (!this.showGlobalOptions) return [];
        const globalOptions = [];
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          const visibleOptions = ancestorCmd.options.filter(
            (option) => !option.hidden
          );
          globalOptions.push(...visibleOptions);
        }
        if (this.sortOptions) {
          globalOptions.sort(this.compareOptions);
        }
        return globalOptions;
      }
      /**
       * Get an array of the arguments if any have a description.
       *
       * @param {Command} cmd
       * @returns {Argument[]}
       */
      visibleArguments(cmd) {
        if (cmd._argsDescription) {
          cmd.registeredArguments.forEach((argument) => {
            argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
          });
        }
        if (cmd.registeredArguments.find((argument) => argument.description)) {
          return cmd.registeredArguments;
        }
        return [];
      }
      /**
       * Get the command term to show in the list of subcommands.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandTerm(cmd) {
        const args = cmd.registeredArguments.map((arg) => humanReadableArgName(arg)).join(" ");
        return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + // simplistic check for non-help option
        (args ? " " + args : "");
      }
      /**
       * Get the option term to show in the list of options.
       *
       * @param {Option} option
       * @returns {string}
       */
      optionTerm(option) {
        return option.flags;
      }
      /**
       * Get the argument term to show in the list of arguments.
       *
       * @param {Argument} argument
       * @returns {string}
       */
      argumentTerm(argument) {
        return argument.name();
      }
      /**
       * Get the longest command term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestSubcommandTermLength(cmd, helper) {
        return helper.visibleCommands(cmd).reduce((max, command) => {
          return Math.max(
            max,
            this.displayWidth(
              helper.styleSubcommandTerm(helper.subcommandTerm(command))
            )
          );
        }, 0);
      }
      /**
       * Get the longest option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestOptionTermLength(cmd, helper) {
        return helper.visibleOptions(cmd).reduce((max, option) => {
          return Math.max(
            max,
            this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option)))
          );
        }, 0);
      }
      /**
       * Get the longest global option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestGlobalOptionTermLength(cmd, helper) {
        return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
          return Math.max(
            max,
            this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option)))
          );
        }, 0);
      }
      /**
       * Get the longest argument term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestArgumentTermLength(cmd, helper) {
        return helper.visibleArguments(cmd).reduce((max, argument) => {
          return Math.max(
            max,
            this.displayWidth(
              helper.styleArgumentTerm(helper.argumentTerm(argument))
            )
          );
        }, 0);
      }
      /**
       * Get the command usage to be displayed at the top of the built-in help.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandUsage(cmd) {
        let cmdName = cmd._name;
        if (cmd._aliases[0]) {
          cmdName = cmdName + "|" + cmd._aliases[0];
        }
        let ancestorCmdNames = "";
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          ancestorCmdNames = ancestorCmd.name() + " " + ancestorCmdNames;
        }
        return ancestorCmdNames + cmdName + " " + cmd.usage();
      }
      /**
       * Get the description for the command.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandDescription(cmd) {
        return cmd.description();
      }
      /**
       * Get the subcommand summary to show in the list of subcommands.
       * (Fallback to description for backwards compatibility.)
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandDescription(cmd) {
        return cmd.summary() || cmd.description();
      }
      /**
       * Get the option description to show in the list of options.
       *
       * @param {Option} option
       * @return {string}
       */
      optionDescription(option) {
        const extraInfo = [];
        if (option.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (option.defaultValue !== void 0) {
          const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
          if (showDefault) {
            extraInfo.push(
              `default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`
            );
          }
        }
        if (option.presetArg !== void 0 && option.optional) {
          extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
        }
        if (option.envVar !== void 0) {
          extraInfo.push(`env: ${option.envVar}`);
        }
        if (extraInfo.length > 0) {
          const extraDescription = `(${extraInfo.join(", ")})`;
          if (option.description) {
            return `${option.description} ${extraDescription}`;
          }
          return extraDescription;
        }
        return option.description;
      }
      /**
       * Get the argument description to show in the list of arguments.
       *
       * @param {Argument} argument
       * @return {string}
       */
      argumentDescription(argument) {
        const extraInfo = [];
        if (argument.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (argument.defaultValue !== void 0) {
          extraInfo.push(
            `default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`
          );
        }
        if (extraInfo.length > 0) {
          const extraDescription = `(${extraInfo.join(", ")})`;
          if (argument.description) {
            return `${argument.description} ${extraDescription}`;
          }
          return extraDescription;
        }
        return argument.description;
      }
      /**
       * Format a list of items, given a heading and an array of formatted items.
       *
       * @param {string} heading
       * @param {string[]} items
       * @param {Help} helper
       * @returns string[]
       */
      formatItemList(heading, items, helper) {
        if (items.length === 0) return [];
        return [helper.styleTitle(heading), ...items, ""];
      }
      /**
       * Group items by their help group heading.
       *
       * @param {Command[] | Option[]} unsortedItems
       * @param {Command[] | Option[]} visibleItems
       * @param {Function} getGroup
       * @returns {Map<string, Command[] | Option[]>}
       */
      groupItems(unsortedItems, visibleItems, getGroup) {
        const result = /* @__PURE__ */ new Map();
        unsortedItems.forEach((item) => {
          const group = getGroup(item);
          if (!result.has(group)) result.set(group, []);
        });
        visibleItems.forEach((item) => {
          const group = getGroup(item);
          if (!result.has(group)) {
            result.set(group, []);
          }
          result.get(group).push(item);
        });
        return result;
      }
      /**
       * Generate the built-in help text.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {string}
       */
      formatHelp(cmd, helper) {
        const termWidth = helper.padWidth(cmd, helper);
        const helpWidth = helper.helpWidth ?? 80;
        function callFormatItem(term, description) {
          return helper.formatItem(term, termWidth, description, helper);
        }
        let output = [
          `${helper.styleTitle("Usage:")} ${helper.styleUsage(helper.commandUsage(cmd))}`,
          ""
        ];
        const commandDescription = helper.commandDescription(cmd);
        if (commandDescription.length > 0) {
          output = output.concat([
            helper.boxWrap(
              helper.styleCommandDescription(commandDescription),
              helpWidth
            ),
            ""
          ]);
        }
        const argumentList = helper.visibleArguments(cmd).map((argument) => {
          return callFormatItem(
            helper.styleArgumentTerm(helper.argumentTerm(argument)),
            helper.styleArgumentDescription(helper.argumentDescription(argument))
          );
        });
        output = output.concat(
          this.formatItemList("Arguments:", argumentList, helper)
        );
        const optionGroups = this.groupItems(
          cmd.options,
          helper.visibleOptions(cmd),
          (option) => option.helpGroupHeading ?? "Options:"
        );
        optionGroups.forEach((options, group) => {
          const optionList = options.map((option) => {
            return callFormatItem(
              helper.styleOptionTerm(helper.optionTerm(option)),
              helper.styleOptionDescription(helper.optionDescription(option))
            );
          });
          output = output.concat(this.formatItemList(group, optionList, helper));
        });
        if (helper.showGlobalOptions) {
          const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
            return callFormatItem(
              helper.styleOptionTerm(helper.optionTerm(option)),
              helper.styleOptionDescription(helper.optionDescription(option))
            );
          });
          output = output.concat(
            this.formatItemList("Global Options:", globalOptionList, helper)
          );
        }
        const commandGroups = this.groupItems(
          cmd.commands,
          helper.visibleCommands(cmd),
          (sub) => sub.helpGroup() || "Commands:"
        );
        commandGroups.forEach((commands, group) => {
          const commandList = commands.map((sub) => {
            return callFormatItem(
              helper.styleSubcommandTerm(helper.subcommandTerm(sub)),
              helper.styleSubcommandDescription(helper.subcommandDescription(sub))
            );
          });
          output = output.concat(this.formatItemList(group, commandList, helper));
        });
        return output.join("\n");
      }
      /**
       * Return display width of string, ignoring ANSI escape sequences. Used in padding and wrapping calculations.
       *
       * @param {string} str
       * @returns {number}
       */
      displayWidth(str2) {
        return stripColor(str2).length;
      }
      /**
       * Style the title for displaying in the help. Called with 'Usage:', 'Options:', etc.
       *
       * @param {string} str
       * @returns {string}
       */
      styleTitle(str2) {
        return str2;
      }
      styleUsage(str2) {
        return str2.split(" ").map((word) => {
          if (word === "[options]") return this.styleOptionText(word);
          if (word === "[command]") return this.styleSubcommandText(word);
          if (word[0] === "[" || word[0] === "<")
            return this.styleArgumentText(word);
          return this.styleCommandText(word);
        }).join(" ");
      }
      styleCommandDescription(str2) {
        return this.styleDescriptionText(str2);
      }
      styleOptionDescription(str2) {
        return this.styleDescriptionText(str2);
      }
      styleSubcommandDescription(str2) {
        return this.styleDescriptionText(str2);
      }
      styleArgumentDescription(str2) {
        return this.styleDescriptionText(str2);
      }
      styleDescriptionText(str2) {
        return str2;
      }
      styleOptionTerm(str2) {
        return this.styleOptionText(str2);
      }
      styleSubcommandTerm(str2) {
        return str2.split(" ").map((word) => {
          if (word === "[options]") return this.styleOptionText(word);
          if (word[0] === "[" || word[0] === "<")
            return this.styleArgumentText(word);
          return this.styleSubcommandText(word);
        }).join(" ");
      }
      styleArgumentTerm(str2) {
        return this.styleArgumentText(str2);
      }
      styleOptionText(str2) {
        return str2;
      }
      styleArgumentText(str2) {
        return str2;
      }
      styleSubcommandText(str2) {
        return str2;
      }
      styleCommandText(str2) {
        return str2;
      }
      /**
       * Calculate the pad width from the maximum term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      padWidth(cmd, helper) {
        return Math.max(
          helper.longestOptionTermLength(cmd, helper),
          helper.longestGlobalOptionTermLength(cmd, helper),
          helper.longestSubcommandTermLength(cmd, helper),
          helper.longestArgumentTermLength(cmd, helper)
        );
      }
      /**
       * Detect manually wrapped and indented strings by checking for line break followed by whitespace.
       *
       * @param {string} str
       * @returns {boolean}
       */
      preformatted(str2) {
        return /\n[^\S\r\n]/.test(str2);
      }
      /**
       * Format the "item", which consists of a term and description. Pad the term and wrap the description, indenting the following lines.
       *
       * So "TTT", 5, "DDD DDDD DD DDD" might be formatted for this.helpWidth=17 like so:
       *   TTT  DDD DDDD
       *        DD DDD
       *
       * @param {string} term
       * @param {number} termWidth
       * @param {string} description
       * @param {Help} helper
       * @returns {string}
       */
      formatItem(term, termWidth, description, helper) {
        const itemIndent = 2;
        const itemIndentStr = " ".repeat(itemIndent);
        if (!description) return itemIndentStr + term;
        const paddedTerm = term.padEnd(
          termWidth + term.length - helper.displayWidth(term)
        );
        const spacerWidth = 2;
        const helpWidth = this.helpWidth ?? 80;
        const remainingWidth = helpWidth - termWidth - spacerWidth - itemIndent;
        let formattedDescription;
        if (remainingWidth < this.minWidthToWrap || helper.preformatted(description)) {
          formattedDescription = description;
        } else {
          const wrappedDescription = helper.boxWrap(description, remainingWidth);
          formattedDescription = wrappedDescription.replace(
            /\n/g,
            "\n" + " ".repeat(termWidth + spacerWidth)
          );
        }
        return itemIndentStr + paddedTerm + " ".repeat(spacerWidth) + formattedDescription.replace(/\n/g, `
${itemIndentStr}`);
      }
      /**
       * Wrap a string at whitespace, preserving existing line breaks.
       * Wrapping is skipped if the width is less than `minWidthToWrap`.
       *
       * @param {string} str
       * @param {number} width
       * @returns {string}
       */
      boxWrap(str2, width) {
        if (width < this.minWidthToWrap) return str2;
        const rawLines = str2.split(/\r\n|\n/);
        const chunkPattern = /[\s]*[^\s]+/g;
        const wrappedLines = [];
        rawLines.forEach((line) => {
          const chunks = line.match(chunkPattern);
          if (chunks === null) {
            wrappedLines.push("");
            return;
          }
          let sumChunks = [chunks.shift()];
          let sumWidth = this.displayWidth(sumChunks[0]);
          chunks.forEach((chunk) => {
            const visibleWidth = this.displayWidth(chunk);
            if (sumWidth + visibleWidth <= width) {
              sumChunks.push(chunk);
              sumWidth += visibleWidth;
              return;
            }
            wrappedLines.push(sumChunks.join(""));
            const nextChunk = chunk.trimStart();
            sumChunks = [nextChunk];
            sumWidth = this.displayWidth(nextChunk);
          });
          wrappedLines.push(sumChunks.join(""));
        });
        return wrappedLines.join("\n");
      }
    };
    function stripColor(str2) {
      const sgrPattern = /\x1b\[\d*(;\d*)*m/g;
      return str2.replace(sgrPattern, "");
    }
    exports.Help = Help2;
    exports.stripColor = stripColor;
  }
});

// cli/node_modules/commander/lib/option.js
var require_option = __commonJS({
  "cli/node_modules/commander/lib/option.js"(exports) {
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var Option2 = class {
      /**
       * Initialize a new `Option` with the given `flags` and `description`.
       *
       * @param {string} flags
       * @param {string} [description]
       */
      constructor(flags, description) {
        this.flags = flags;
        this.description = description || "";
        this.required = flags.includes("<");
        this.optional = flags.includes("[");
        this.variadic = /\w\.\.\.[>\]]$/.test(flags);
        this.mandatory = false;
        const optionFlags = splitOptionFlags(flags);
        this.short = optionFlags.shortFlag;
        this.long = optionFlags.longFlag;
        this.negate = false;
        if (this.long) {
          this.negate = this.long.startsWith("--no-");
        }
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.presetArg = void 0;
        this.envVar = void 0;
        this.parseArg = void 0;
        this.hidden = false;
        this.argChoices = void 0;
        this.conflictsWith = [];
        this.implied = void 0;
        this.helpGroupHeading = void 0;
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Option}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Preset to use when option used without option-argument, especially optional but also boolean and negated.
       * The custom processing (parseArg) is called.
       *
       * @example
       * new Option('--color').default('GREYSCALE').preset('RGB');
       * new Option('--donate [amount]').preset('20').argParser(parseFloat);
       *
       * @param {*} arg
       * @return {Option}
       */
      preset(arg) {
        this.presetArg = arg;
        return this;
      }
      /**
       * Add option name(s) that conflict with this option.
       * An error will be displayed if conflicting options are found during parsing.
       *
       * @example
       * new Option('--rgb').conflicts('cmyk');
       * new Option('--js').conflicts(['ts', 'jsx']);
       *
       * @param {(string | string[])} names
       * @return {Option}
       */
      conflicts(names) {
        this.conflictsWith = this.conflictsWith.concat(names);
        return this;
      }
      /**
       * Specify implied option values for when this option is set and the implied options are not.
       *
       * The custom processing (parseArg) is not called on the implied values.
       *
       * @example
       * program
       *   .addOption(new Option('--log', 'write logging information to file'))
       *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
       *
       * @param {object} impliedOptionValues
       * @return {Option}
       */
      implies(impliedOptionValues) {
        let newImplied = impliedOptionValues;
        if (typeof impliedOptionValues === "string") {
          newImplied = { [impliedOptionValues]: true };
        }
        this.implied = Object.assign(this.implied || {}, newImplied);
        return this;
      }
      /**
       * Set environment variable to check for option value.
       *
       * An environment variable is only used if when processed the current option value is
       * undefined, or the source of the current value is 'default' or 'config' or 'env'.
       *
       * @param {string} name
       * @return {Option}
       */
      env(name) {
        this.envVar = name;
        return this;
      }
      /**
       * Set the custom handler for processing CLI option arguments into option values.
       *
       * @param {Function} [fn]
       * @return {Option}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Whether the option is mandatory and must have a value after parsing.
       *
       * @param {boolean} [mandatory=true]
       * @return {Option}
       */
      makeOptionMandatory(mandatory = true) {
        this.mandatory = !!mandatory;
        return this;
      }
      /**
       * Hide option in help.
       *
       * @param {boolean} [hide=true]
       * @return {Option}
       */
      hideHelp(hide = true) {
        this.hidden = !!hide;
        return this;
      }
      /**
       * @package
       */
      _collectValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        previous.push(value);
        return previous;
      }
      /**
       * Only allow option value to be one of choices.
       *
       * @param {string[]} values
       * @return {Option}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(
              `Allowed choices are ${this.argChoices.join(", ")}.`
            );
          }
          if (this.variadic) {
            return this._collectValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Return option name.
       *
       * @return {string}
       */
      name() {
        if (this.long) {
          return this.long.replace(/^--/, "");
        }
        return this.short.replace(/^-/, "");
      }
      /**
       * Return option name, in a camelcase format that can be used
       * as an object attribute key.
       *
       * @return {string}
       */
      attributeName() {
        if (this.negate) {
          return camelcase(this.name().replace(/^no-/, ""));
        }
        return camelcase(this.name());
      }
      /**
       * Set the help group heading.
       *
       * @param {string} heading
       * @return {Option}
       */
      helpGroup(heading) {
        this.helpGroupHeading = heading;
        return this;
      }
      /**
       * Check if `arg` matches the short or long flag.
       *
       * @param {string} arg
       * @return {boolean}
       * @package
       */
      is(arg) {
        return this.short === arg || this.long === arg;
      }
      /**
       * Return whether a boolean option.
       *
       * Options are one of boolean, negated, required argument, or optional argument.
       *
       * @return {boolean}
       * @package
       */
      isBoolean() {
        return !this.required && !this.optional && !this.negate;
      }
    };
    var DualOptions = class {
      /**
       * @param {Option[]} options
       */
      constructor(options) {
        this.positiveOptions = /* @__PURE__ */ new Map();
        this.negativeOptions = /* @__PURE__ */ new Map();
        this.dualOptions = /* @__PURE__ */ new Set();
        options.forEach((option) => {
          if (option.negate) {
            this.negativeOptions.set(option.attributeName(), option);
          } else {
            this.positiveOptions.set(option.attributeName(), option);
          }
        });
        this.negativeOptions.forEach((value, key) => {
          if (this.positiveOptions.has(key)) {
            this.dualOptions.add(key);
          }
        });
      }
      /**
       * Did the value come from the option, and not from possible matching dual option?
       *
       * @param {*} value
       * @param {Option} option
       * @returns {boolean}
       */
      valueFromOption(value, option) {
        const optionKey = option.attributeName();
        if (!this.dualOptions.has(optionKey)) return true;
        const preset = this.negativeOptions.get(optionKey).presetArg;
        const negativeValue = preset !== void 0 ? preset : false;
        return option.negate === (negativeValue === value);
      }
    };
    function camelcase(str2) {
      return str2.split("-").reduce((str3, word) => {
        return str3 + word[0].toUpperCase() + word.slice(1);
      });
    }
    function splitOptionFlags(flags) {
      let shortFlag;
      let longFlag;
      const shortFlagExp = /^-[^-]$/;
      const longFlagExp = /^--[^-]/;
      const flagParts = flags.split(/[ |,]+/).concat("guard");
      if (shortFlagExp.test(flagParts[0])) shortFlag = flagParts.shift();
      if (longFlagExp.test(flagParts[0])) longFlag = flagParts.shift();
      if (!shortFlag && shortFlagExp.test(flagParts[0]))
        shortFlag = flagParts.shift();
      if (!shortFlag && longFlagExp.test(flagParts[0])) {
        shortFlag = longFlag;
        longFlag = flagParts.shift();
      }
      if (flagParts[0].startsWith("-")) {
        const unsupportedFlag = flagParts[0];
        const baseError = `option creation failed due to '${unsupportedFlag}' in option flags '${flags}'`;
        if (/^-[^-][^-]/.test(unsupportedFlag))
          throw new Error(
            `${baseError}
- a short flag is a single dash and a single character
  - either use a single dash and a single character (for a short flag)
  - or use a double dash for a long option (and can have two, like '--ws, --workspace')`
          );
        if (shortFlagExp.test(unsupportedFlag))
          throw new Error(`${baseError}
- too many short flags`);
        if (longFlagExp.test(unsupportedFlag))
          throw new Error(`${baseError}
- too many long flags`);
        throw new Error(`${baseError}
- unrecognised flag format`);
      }
      if (shortFlag === void 0 && longFlag === void 0)
        throw new Error(
          `option creation failed due to no flags found in '${flags}'.`
        );
      return { shortFlag, longFlag };
    }
    exports.Option = Option2;
    exports.DualOptions = DualOptions;
  }
});

// cli/node_modules/commander/lib/suggestSimilar.js
var require_suggestSimilar = __commonJS({
  "cli/node_modules/commander/lib/suggestSimilar.js"(exports) {
    var maxDistance = 3;
    function editDistance(a, b) {
      if (Math.abs(a.length - b.length) > maxDistance)
        return Math.max(a.length, b.length);
      const d = [];
      for (let i = 0; i <= a.length; i++) {
        d[i] = [i];
      }
      for (let j = 0; j <= b.length; j++) {
        d[0][j] = j;
      }
      for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
          let cost = 1;
          if (a[i - 1] === b[j - 1]) {
            cost = 0;
          } else {
            cost = 1;
          }
          d[i][j] = Math.min(
            d[i - 1][j] + 1,
            // deletion
            d[i][j - 1] + 1,
            // insertion
            d[i - 1][j - 1] + cost
            // substitution
          );
          if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
            d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
          }
        }
      }
      return d[a.length][b.length];
    }
    function suggestSimilar(word, candidates) {
      if (!candidates || candidates.length === 0) return "";
      candidates = Array.from(new Set(candidates));
      const searchingOptions = word.startsWith("--");
      if (searchingOptions) {
        word = word.slice(2);
        candidates = candidates.map((candidate) => candidate.slice(2));
      }
      let similar = [];
      let bestDistance = maxDistance;
      const minSimilarity = 0.4;
      candidates.forEach((candidate) => {
        if (candidate.length <= 1) return;
        const distance = editDistance(word, candidate);
        const length = Math.max(word.length, candidate.length);
        const similarity = (length - distance) / length;
        if (similarity > minSimilarity) {
          if (distance < bestDistance) {
            bestDistance = distance;
            similar = [candidate];
          } else if (distance === bestDistance) {
            similar.push(candidate);
          }
        }
      });
      similar.sort((a, b) => a.localeCompare(b));
      if (searchingOptions) {
        similar = similar.map((candidate) => `--${candidate}`);
      }
      if (similar.length > 1) {
        return `
(Did you mean one of ${similar.join(", ")}?)`;
      }
      if (similar.length === 1) {
        return `
(Did you mean ${similar[0]}?)`;
      }
      return "";
    }
    exports.suggestSimilar = suggestSimilar;
  }
});

// cli/node_modules/commander/lib/command.js
var require_command = __commonJS({
  "cli/node_modules/commander/lib/command.js"(exports) {
    var EventEmitter = __require("node:events").EventEmitter;
    var childProcess = __require("node:child_process");
    var path20 = __require("node:path");
    var fs13 = __require("node:fs");
    var process5 = __require("node:process");
    var { Argument: Argument2, humanReadableArgName } = require_argument();
    var { CommanderError: CommanderError2 } = require_error();
    var { Help: Help2, stripColor } = require_help();
    var { Option: Option2, DualOptions } = require_option();
    var { suggestSimilar } = require_suggestSimilar();
    var Command2 = class _Command extends EventEmitter {
      /**
       * Initialize a new `Command`.
       *
       * @param {string} [name]
       */
      constructor(name) {
        super();
        this.commands = [];
        this.options = [];
        this.parent = null;
        this._allowUnknownOption = false;
        this._allowExcessArguments = false;
        this.registeredArguments = [];
        this._args = this.registeredArguments;
        this.args = [];
        this.rawArgs = [];
        this.processedArgs = [];
        this._scriptPath = null;
        this._name = name || "";
        this._optionValues = {};
        this._optionValueSources = {};
        this._storeOptionsAsProperties = false;
        this._actionHandler = null;
        this._executableHandler = false;
        this._executableFile = null;
        this._executableDir = null;
        this._defaultCommandName = null;
        this._exitCallback = null;
        this._aliases = [];
        this._combineFlagAndOptionalValue = true;
        this._description = "";
        this._summary = "";
        this._argsDescription = void 0;
        this._enablePositionalOptions = false;
        this._passThroughOptions = false;
        this._lifeCycleHooks = {};
        this._showHelpAfterError = false;
        this._showSuggestionAfterError = true;
        this._savedState = null;
        this._outputConfiguration = {
          writeOut: (str2) => process5.stdout.write(str2),
          writeErr: (str2) => process5.stderr.write(str2),
          outputError: (str2, write) => write(str2),
          getOutHelpWidth: () => process5.stdout.isTTY ? process5.stdout.columns : void 0,
          getErrHelpWidth: () => process5.stderr.isTTY ? process5.stderr.columns : void 0,
          getOutHasColors: () => useColor() ?? (process5.stdout.isTTY && process5.stdout.hasColors?.()),
          getErrHasColors: () => useColor() ?? (process5.stderr.isTTY && process5.stderr.hasColors?.()),
          stripColor: (str2) => stripColor(str2)
        };
        this._hidden = false;
        this._helpOption = void 0;
        this._addImplicitHelpCommand = void 0;
        this._helpCommand = void 0;
        this._helpConfiguration = {};
        this._helpGroupHeading = void 0;
        this._defaultCommandGroup = void 0;
        this._defaultOptionGroup = void 0;
      }
      /**
       * Copy settings that are useful to have in common across root command and subcommands.
       *
       * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
       *
       * @param {Command} sourceCommand
       * @return {Command} `this` command for chaining
       */
      copyInheritedSettings(sourceCommand) {
        this._outputConfiguration = sourceCommand._outputConfiguration;
        this._helpOption = sourceCommand._helpOption;
        this._helpCommand = sourceCommand._helpCommand;
        this._helpConfiguration = sourceCommand._helpConfiguration;
        this._exitCallback = sourceCommand._exitCallback;
        this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
        this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
        this._allowExcessArguments = sourceCommand._allowExcessArguments;
        this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
        this._showHelpAfterError = sourceCommand._showHelpAfterError;
        this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
        return this;
      }
      /**
       * @returns {Command[]}
       * @private
       */
      _getCommandAndAncestors() {
        const result = [];
        for (let command = this; command; command = command.parent) {
          result.push(command);
        }
        return result;
      }
      /**
       * Define a command.
       *
       * There are two styles of command: pay attention to where to put the description.
       *
       * @example
       * // Command implemented using action handler (description is supplied separately to `.command`)
       * program
       *   .command('clone <source> [destination]')
       *   .description('clone a repository into a newly created directory')
       *   .action((source, destination) => {
       *     console.log('clone command called');
       *   });
       *
       * // Command implemented using separate executable file (description is second parameter to `.command`)
       * program
       *   .command('start <service>', 'start named service')
       *   .command('stop [service]', 'stop named service, or all if no name supplied');
       *
       * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
       * @param {(object | string)} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
       * @param {object} [execOpts] - configuration options (for executable)
       * @return {Command} returns new command for action handler, or `this` for executable command
       */
      command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
        let desc = actionOptsOrExecDesc;
        let opts = execOpts;
        if (typeof desc === "object" && desc !== null) {
          opts = desc;
          desc = null;
        }
        opts = opts || {};
        const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
        const cmd = this.createCommand(name);
        if (desc) {
          cmd.description(desc);
          cmd._executableHandler = true;
        }
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        cmd._hidden = !!(opts.noHelp || opts.hidden);
        cmd._executableFile = opts.executableFile || null;
        if (args) cmd.arguments(args);
        this._registerCommand(cmd);
        cmd.parent = this;
        cmd.copyInheritedSettings(this);
        if (desc) return this;
        return cmd;
      }
      /**
       * Factory routine to create a new unattached command.
       *
       * See .command() for creating an attached subcommand, which uses this routine to
       * create the command. You can override createCommand to customise subcommands.
       *
       * @param {string} [name]
       * @return {Command} new command
       */
      createCommand(name) {
        return new _Command(name);
      }
      /**
       * You can customise the help with a subclass of Help by overriding createHelp,
       * or by overriding Help properties using configureHelp().
       *
       * @return {Help}
       */
      createHelp() {
        return Object.assign(new Help2(), this.configureHelp());
      }
      /**
       * You can customise the help by overriding Help properties using configureHelp(),
       * or with a subclass of Help by overriding createHelp().
       *
       * @param {object} [configuration] - configuration options
       * @return {(Command | object)} `this` command for chaining, or stored configuration
       */
      configureHelp(configuration) {
        if (configuration === void 0) return this._helpConfiguration;
        this._helpConfiguration = configuration;
        return this;
      }
      /**
       * The default output goes to stdout and stderr. You can customise this for special
       * applications. You can also customise the display of errors by overriding outputError.
       *
       * The configuration properties are all functions:
       *
       *     // change how output being written, defaults to stdout and stderr
       *     writeOut(str)
       *     writeErr(str)
       *     // change how output being written for errors, defaults to writeErr
       *     outputError(str, write) // used for displaying errors and not used for displaying help
       *     // specify width for wrapping help
       *     getOutHelpWidth()
       *     getErrHelpWidth()
       *     // color support, currently only used with Help
       *     getOutHasColors()
       *     getErrHasColors()
       *     stripColor() // used to remove ANSI escape codes if output does not have colors
       *
       * @param {object} [configuration] - configuration options
       * @return {(Command | object)} `this` command for chaining, or stored configuration
       */
      configureOutput(configuration) {
        if (configuration === void 0) return this._outputConfiguration;
        this._outputConfiguration = {
          ...this._outputConfiguration,
          ...configuration
        };
        return this;
      }
      /**
       * Display the help or a custom message after an error occurs.
       *
       * @param {(boolean|string)} [displayHelp]
       * @return {Command} `this` command for chaining
       */
      showHelpAfterError(displayHelp = true) {
        if (typeof displayHelp !== "string") displayHelp = !!displayHelp;
        this._showHelpAfterError = displayHelp;
        return this;
      }
      /**
       * Display suggestion of similar commands for unknown commands, or options for unknown options.
       *
       * @param {boolean} [displaySuggestion]
       * @return {Command} `this` command for chaining
       */
      showSuggestionAfterError(displaySuggestion = true) {
        this._showSuggestionAfterError = !!displaySuggestion;
        return this;
      }
      /**
       * Add a prepared subcommand.
       *
       * See .command() for creating an attached subcommand which inherits settings from its parent.
       *
       * @param {Command} cmd - new subcommand
       * @param {object} [opts] - configuration options
       * @return {Command} `this` command for chaining
       */
      addCommand(cmd, opts) {
        if (!cmd._name) {
          throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
        }
        opts = opts || {};
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        if (opts.noHelp || opts.hidden) cmd._hidden = true;
        this._registerCommand(cmd);
        cmd.parent = this;
        cmd._checkForBrokenPassThrough();
        return this;
      }
      /**
       * Factory routine to create a new unattached argument.
       *
       * See .argument() for creating an attached argument, which uses this routine to
       * create the argument. You can override createArgument to return a custom argument.
       *
       * @param {string} name
       * @param {string} [description]
       * @return {Argument} new argument
       */
      createArgument(name, description) {
        return new Argument2(name, description);
      }
      /**
       * Define argument syntax for command.
       *
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @example
       * program.argument('<input-file>');
       * program.argument('[output-file]');
       *
       * @param {string} name
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom argument processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      argument(name, description, parseArg, defaultValue) {
        const argument = this.createArgument(name, description);
        if (typeof parseArg === "function") {
          argument.default(defaultValue).argParser(parseArg);
        } else {
          argument.default(parseArg);
        }
        this.addArgument(argument);
        return this;
      }
      /**
       * Define argument syntax for command, adding multiple at once (without descriptions).
       *
       * See also .argument().
       *
       * @example
       * program.arguments('<cmd> [env]');
       *
       * @param {string} names
       * @return {Command} `this` command for chaining
       */
      arguments(names) {
        names.trim().split(/ +/).forEach((detail) => {
          this.argument(detail);
        });
        return this;
      }
      /**
       * Define argument syntax for command, adding a prepared argument.
       *
       * @param {Argument} argument
       * @return {Command} `this` command for chaining
       */
      addArgument(argument) {
        const previousArgument = this.registeredArguments.slice(-1)[0];
        if (previousArgument?.variadic) {
          throw new Error(
            `only the last argument can be variadic '${previousArgument.name()}'`
          );
        }
        if (argument.required && argument.defaultValue !== void 0 && argument.parseArg === void 0) {
          throw new Error(
            `a default value for a required argument is never used: '${argument.name()}'`
          );
        }
        this.registeredArguments.push(argument);
        return this;
      }
      /**
       * Customise or override default help command. By default a help command is automatically added if your command has subcommands.
       *
       * @example
       *    program.helpCommand('help [cmd]');
       *    program.helpCommand('help [cmd]', 'show help');
       *    program.helpCommand(false); // suppress default help command
       *    program.helpCommand(true); // add help command even if no subcommands
       *
       * @param {string|boolean} enableOrNameAndArgs - enable with custom name and/or arguments, or boolean to override whether added
       * @param {string} [description] - custom description
       * @return {Command} `this` command for chaining
       */
      helpCommand(enableOrNameAndArgs, description) {
        if (typeof enableOrNameAndArgs === "boolean") {
          this._addImplicitHelpCommand = enableOrNameAndArgs;
          if (enableOrNameAndArgs && this._defaultCommandGroup) {
            this._initCommandGroup(this._getHelpCommand());
          }
          return this;
        }
        const nameAndArgs = enableOrNameAndArgs ?? "help [command]";
        const [, helpName, helpArgs] = nameAndArgs.match(/([^ ]+) *(.*)/);
        const helpDescription = description ?? "display help for command";
        const helpCommand = this.createCommand(helpName);
        helpCommand.helpOption(false);
        if (helpArgs) helpCommand.arguments(helpArgs);
        if (helpDescription) helpCommand.description(helpDescription);
        this._addImplicitHelpCommand = true;
        this._helpCommand = helpCommand;
        if (enableOrNameAndArgs || description) this._initCommandGroup(helpCommand);
        return this;
      }
      /**
       * Add prepared custom help command.
       *
       * @param {(Command|string|boolean)} helpCommand - custom help command, or deprecated enableOrNameAndArgs as for `.helpCommand()`
       * @param {string} [deprecatedDescription] - deprecated custom description used with custom name only
       * @return {Command} `this` command for chaining
       */
      addHelpCommand(helpCommand, deprecatedDescription) {
        if (typeof helpCommand !== "object") {
          this.helpCommand(helpCommand, deprecatedDescription);
          return this;
        }
        this._addImplicitHelpCommand = true;
        this._helpCommand = helpCommand;
        this._initCommandGroup(helpCommand);
        return this;
      }
      /**
       * Lazy create help command.
       *
       * @return {(Command|null)}
       * @package
       */
      _getHelpCommand() {
        const hasImplicitHelpCommand = this._addImplicitHelpCommand ?? (this.commands.length && !this._actionHandler && !this._findCommand("help"));
        if (hasImplicitHelpCommand) {
          if (this._helpCommand === void 0) {
            this.helpCommand(void 0, void 0);
          }
          return this._helpCommand;
        }
        return null;
      }
      /**
       * Add hook for life cycle event.
       *
       * @param {string} event
       * @param {Function} listener
       * @return {Command} `this` command for chaining
       */
      hook(event, listener) {
        const allowedValues = ["preSubcommand", "preAction", "postAction"];
        if (!allowedValues.includes(event)) {
          throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        if (this._lifeCycleHooks[event]) {
          this._lifeCycleHooks[event].push(listener);
        } else {
          this._lifeCycleHooks[event] = [listener];
        }
        return this;
      }
      /**
       * Register callback to use as replacement for calling process.exit.
       *
       * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
       * @return {Command} `this` command for chaining
       */
      exitOverride(fn) {
        if (fn) {
          this._exitCallback = fn;
        } else {
          this._exitCallback = (err) => {
            if (err.code !== "commander.executeSubCommandAsync") {
              throw err;
            } else {
            }
          };
        }
        return this;
      }
      /**
       * Call process.exit, and _exitCallback if defined.
       *
       * @param {number} exitCode exit code for using with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @return never
       * @private
       */
      _exit(exitCode, code, message) {
        if (this._exitCallback) {
          this._exitCallback(new CommanderError2(exitCode, code, message));
        }
        process5.exit(exitCode);
      }
      /**
       * Register callback `fn` for the command.
       *
       * @example
       * program
       *   .command('serve')
       *   .description('start service')
       *   .action(function() {
       *      // do work here
       *   });
       *
       * @param {Function} fn
       * @return {Command} `this` command for chaining
       */
      action(fn) {
        const listener = (args) => {
          const expectedArgsCount = this.registeredArguments.length;
          const actionArgs = args.slice(0, expectedArgsCount);
          if (this._storeOptionsAsProperties) {
            actionArgs[expectedArgsCount] = this;
          } else {
            actionArgs[expectedArgsCount] = this.opts();
          }
          actionArgs.push(this);
          return fn.apply(this, actionArgs);
        };
        this._actionHandler = listener;
        return this;
      }
      /**
       * Factory routine to create a new unattached option.
       *
       * See .option() for creating an attached option, which uses this routine to
       * create the option. You can override createOption to return a custom option.
       *
       * @param {string} flags
       * @param {string} [description]
       * @return {Option} new option
       */
      createOption(flags, description) {
        return new Option2(flags, description);
      }
      /**
       * Wrap parseArgs to catch 'commander.invalidArgument'.
       *
       * @param {(Option | Argument)} target
       * @param {string} value
       * @param {*} previous
       * @param {string} invalidArgumentMessage
       * @private
       */
      _callParseArg(target, value, previous, invalidArgumentMessage) {
        try {
          return target.parseArg(value, previous);
        } catch (err) {
          if (err.code === "commander.invalidArgument") {
            const message = `${invalidArgumentMessage} ${err.message}`;
            this.error(message, { exitCode: err.exitCode, code: err.code });
          }
          throw err;
        }
      }
      /**
       * Check for option flag conflicts.
       * Register option if no conflicts found, or throw on conflict.
       *
       * @param {Option} option
       * @private
       */
      _registerOption(option) {
        const matchingOption = option.short && this._findOption(option.short) || option.long && this._findOption(option.long);
        if (matchingOption) {
          const matchingFlag = option.long && this._findOption(option.long) ? option.long : option.short;
          throw new Error(`Cannot add option '${option.flags}'${this._name && ` to command '${this._name}'`} due to conflicting flag '${matchingFlag}'
-  already used by option '${matchingOption.flags}'`);
        }
        this._initOptionGroup(option);
        this.options.push(option);
      }
      /**
       * Check for command name and alias conflicts with existing commands.
       * Register command if no conflicts found, or throw on conflict.
       *
       * @param {Command} command
       * @private
       */
      _registerCommand(command) {
        const knownBy = (cmd) => {
          return [cmd.name()].concat(cmd.aliases());
        };
        const alreadyUsed = knownBy(command).find(
          (name) => this._findCommand(name)
        );
        if (alreadyUsed) {
          const existingCmd = knownBy(this._findCommand(alreadyUsed)).join("|");
          const newCmd = knownBy(command).join("|");
          throw new Error(
            `cannot add command '${newCmd}' as already have command '${existingCmd}'`
          );
        }
        this._initCommandGroup(command);
        this.commands.push(command);
      }
      /**
       * Add an option.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addOption(option) {
        this._registerOption(option);
        const oname = option.name();
        const name = option.attributeName();
        if (option.negate) {
          const positiveLongFlag = option.long.replace(/^--no-/, "--");
          if (!this._findOption(positiveLongFlag)) {
            this.setOptionValueWithSource(
              name,
              option.defaultValue === void 0 ? true : option.defaultValue,
              "default"
            );
          }
        } else if (option.defaultValue !== void 0) {
          this.setOptionValueWithSource(name, option.defaultValue, "default");
        }
        const handleOptionValue = (val, invalidValueMessage, valueSource) => {
          if (val == null && option.presetArg !== void 0) {
            val = option.presetArg;
          }
          const oldValue = this.getOptionValue(name);
          if (val !== null && option.parseArg) {
            val = this._callParseArg(option, val, oldValue, invalidValueMessage);
          } else if (val !== null && option.variadic) {
            val = option._collectValue(val, oldValue);
          }
          if (val == null) {
            if (option.negate) {
              val = false;
            } else if (option.isBoolean() || option.optional) {
              val = true;
            } else {
              val = "";
            }
          }
          this.setOptionValueWithSource(name, val, valueSource);
        };
        this.on("option:" + oname, (val) => {
          const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
          handleOptionValue(val, invalidValueMessage, "cli");
        });
        if (option.envVar) {
          this.on("optionEnv:" + oname, (val) => {
            const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
            handleOptionValue(val, invalidValueMessage, "env");
          });
        }
        return this;
      }
      /**
       * Internal implementation shared by .option() and .requiredOption()
       *
       * @return {Command} `this` command for chaining
       * @private
       */
      _optionEx(config, flags, description, fn, defaultValue) {
        if (typeof flags === "object" && flags instanceof Option2) {
          throw new Error(
            "To add an Option object use addOption() instead of option() or requiredOption()"
          );
        }
        const option = this.createOption(flags, description);
        option.makeOptionMandatory(!!config.mandatory);
        if (typeof fn === "function") {
          option.default(defaultValue).argParser(fn);
        } else if (fn instanceof RegExp) {
          const regex = fn;
          fn = (val, def) => {
            const m = regex.exec(val);
            return m ? m[0] : def;
          };
          option.default(defaultValue).argParser(fn);
        } else {
          option.default(fn);
        }
        return this.addOption(option);
      }
      /**
       * Define option with `flags`, `description`, and optional argument parsing function or `defaultValue` or both.
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space. A required
       * option-argument is indicated by `<>` and an optional option-argument by `[]`.
       *
       * See the README for more details, and see also addOption() and requiredOption().
       *
       * @example
       * program
       *     .option('-p, --pepper', 'add pepper')
       *     .option('--pt, --pizza-type <TYPE>', 'type of pizza') // required option-argument
       *     .option('-c, --cheese [CHEESE]', 'add extra cheese', 'mozzarella') // optional option-argument with default
       *     .option('-t, --tip <VALUE>', 'add tip to purchase cost', parseFloat) // custom parse function
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      option(flags, description, parseArg, defaultValue) {
        return this._optionEx({}, flags, description, parseArg, defaultValue);
      }
      /**
       * Add a required option which must have a value after parsing. This usually means
       * the option must be specified on the command line. (Otherwise the same as .option().)
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      requiredOption(flags, description, parseArg, defaultValue) {
        return this._optionEx(
          { mandatory: true },
          flags,
          description,
          parseArg,
          defaultValue
        );
      }
      /**
       * Alter parsing of short flags with optional values.
       *
       * @example
       * // for `.option('-f,--flag [value]'):
       * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
       * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
       *
       * @param {boolean} [combine] - if `true` or omitted, an optional value can be specified directly after the flag.
       * @return {Command} `this` command for chaining
       */
      combineFlagAndOptionalValue(combine = true) {
        this._combineFlagAndOptionalValue = !!combine;
        return this;
      }
      /**
       * Allow unknown options on the command line.
       *
       * @param {boolean} [allowUnknown] - if `true` or omitted, no error will be thrown for unknown options.
       * @return {Command} `this` command for chaining
       */
      allowUnknownOption(allowUnknown = true) {
        this._allowUnknownOption = !!allowUnknown;
        return this;
      }
      /**
       * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
       *
       * @param {boolean} [allowExcess] - if `true` or omitted, no error will be thrown for excess arguments.
       * @return {Command} `this` command for chaining
       */
      allowExcessArguments(allowExcess = true) {
        this._allowExcessArguments = !!allowExcess;
        return this;
      }
      /**
       * Enable positional options. Positional means global options are specified before subcommands which lets
       * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
       * The default behaviour is non-positional and global options may appear anywhere on the command line.
       *
       * @param {boolean} [positional]
       * @return {Command} `this` command for chaining
       */
      enablePositionalOptions(positional = true) {
        this._enablePositionalOptions = !!positional;
        return this;
      }
      /**
       * Pass through options that come after command-arguments rather than treat them as command-options,
       * so actual command-options come before command-arguments. Turning this on for a subcommand requires
       * positional options to have been enabled on the program (parent commands).
       * The default behaviour is non-positional and options may appear before or after command-arguments.
       *
       * @param {boolean} [passThrough] for unknown options.
       * @return {Command} `this` command for chaining
       */
      passThroughOptions(passThrough = true) {
        this._passThroughOptions = !!passThrough;
        this._checkForBrokenPassThrough();
        return this;
      }
      /**
       * @private
       */
      _checkForBrokenPassThrough() {
        if (this.parent && this._passThroughOptions && !this.parent._enablePositionalOptions) {
          throw new Error(
            `passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`
          );
        }
      }
      /**
       * Whether to store option values as properties on command object,
       * or store separately (specify false). In both cases the option values can be accessed using .opts().
       *
       * @param {boolean} [storeAsProperties=true]
       * @return {Command} `this` command for chaining
       */
      storeOptionsAsProperties(storeAsProperties = true) {
        if (this.options.length) {
          throw new Error("call .storeOptionsAsProperties() before adding options");
        }
        if (Object.keys(this._optionValues).length) {
          throw new Error(
            "call .storeOptionsAsProperties() before setting option values"
          );
        }
        this._storeOptionsAsProperties = !!storeAsProperties;
        return this;
      }
      /**
       * Retrieve option value.
       *
       * @param {string} key
       * @return {object} value
       */
      getOptionValue(key) {
        if (this._storeOptionsAsProperties) {
          return this[key];
        }
        return this._optionValues[key];
      }
      /**
       * Store option value.
       *
       * @param {string} key
       * @param {object} value
       * @return {Command} `this` command for chaining
       */
      setOptionValue(key, value) {
        return this.setOptionValueWithSource(key, value, void 0);
      }
      /**
       * Store option value and where the value came from.
       *
       * @param {string} key
       * @param {object} value
       * @param {string} source - expected values are default/config/env/cli/implied
       * @return {Command} `this` command for chaining
       */
      setOptionValueWithSource(key, value, source) {
        if (this._storeOptionsAsProperties) {
          this[key] = value;
        } else {
          this._optionValues[key] = value;
        }
        this._optionValueSources[key] = source;
        return this;
      }
      /**
       * Get source of option value.
       * Expected values are default | config | env | cli | implied
       *
       * @param {string} key
       * @return {string}
       */
      getOptionValueSource(key) {
        return this._optionValueSources[key];
      }
      /**
       * Get source of option value. See also .optsWithGlobals().
       * Expected values are default | config | env | cli | implied
       *
       * @param {string} key
       * @return {string}
       */
      getOptionValueSourceWithGlobals(key) {
        let source;
        this._getCommandAndAncestors().forEach((cmd) => {
          if (cmd.getOptionValueSource(key) !== void 0) {
            source = cmd.getOptionValueSource(key);
          }
        });
        return source;
      }
      /**
       * Get user arguments from implied or explicit arguments.
       * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
       *
       * @private
       */
      _prepareUserArgs(argv, parseOptions) {
        if (argv !== void 0 && !Array.isArray(argv)) {
          throw new Error("first parameter to parse must be array or undefined");
        }
        parseOptions = parseOptions || {};
        if (argv === void 0 && parseOptions.from === void 0) {
          if (process5.versions?.electron) {
            parseOptions.from = "electron";
          }
          const execArgv = process5.execArgv ?? [];
          if (execArgv.includes("-e") || execArgv.includes("--eval") || execArgv.includes("-p") || execArgv.includes("--print")) {
            parseOptions.from = "eval";
          }
        }
        if (argv === void 0) {
          argv = process5.argv;
        }
        this.rawArgs = argv.slice();
        let userArgs;
        switch (parseOptions.from) {
          case void 0:
          case "node":
            this._scriptPath = argv[1];
            userArgs = argv.slice(2);
            break;
          case "electron":
            if (process5.defaultApp) {
              this._scriptPath = argv[1];
              userArgs = argv.slice(2);
            } else {
              userArgs = argv.slice(1);
            }
            break;
          case "user":
            userArgs = argv.slice(0);
            break;
          case "eval":
            userArgs = argv.slice(1);
            break;
          default:
            throw new Error(
              `unexpected parse option { from: '${parseOptions.from}' }`
            );
        }
        if (!this._name && this._scriptPath)
          this.nameFromFilename(this._scriptPath);
        this._name = this._name || "program";
        return userArgs;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Use parseAsync instead of parse if any of your action handlers are async.
       *
       * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
       *
       * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
       * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
       * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
       * - `'user'`: just user arguments
       *
       * @example
       * program.parse(); // parse process.argv and auto-detect electron and special node flags
       * program.parse(process.argv); // assume argv[0] is app and argv[1] is script
       * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv] - optional, defaults to process.argv
       * @param {object} [parseOptions] - optionally specify style of options with from: node/user/electron
       * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
       * @return {Command} `this` command for chaining
       */
      parse(argv, parseOptions) {
        this._prepareForParse();
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
       *
       * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
       * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
       * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
       * - `'user'`: just user arguments
       *
       * @example
       * await program.parseAsync(); // parse process.argv and auto-detect electron and special node flags
       * await program.parseAsync(process.argv); // assume argv[0] is app and argv[1] is script
       * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv]
       * @param {object} [parseOptions]
       * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
       * @return {Promise}
       */
      async parseAsync(argv, parseOptions) {
        this._prepareForParse();
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        await this._parseCommand([], userArgs);
        return this;
      }
      _prepareForParse() {
        if (this._savedState === null) {
          this.saveStateBeforeParse();
        } else {
          this.restoreStateBeforeParse();
        }
      }
      /**
       * Called the first time parse is called to save state and allow a restore before subsequent calls to parse.
       * Not usually called directly, but available for subclasses to save their custom state.
       *
       * This is called in a lazy way. Only commands used in parsing chain will have state saved.
       */
      saveStateBeforeParse() {
        this._savedState = {
          // name is stable if supplied by author, but may be unspecified for root command and deduced during parsing
          _name: this._name,
          // option values before parse have default values (including false for negated options)
          // shallow clones
          _optionValues: { ...this._optionValues },
          _optionValueSources: { ...this._optionValueSources }
        };
      }
      /**
       * Restore state before parse for calls after the first.
       * Not usually called directly, but available for subclasses to save their custom state.
       *
       * This is called in a lazy way. Only commands used in parsing chain will have state restored.
       */
      restoreStateBeforeParse() {
        if (this._storeOptionsAsProperties)
          throw new Error(`Can not call parse again when storeOptionsAsProperties is true.
- either make a new Command for each call to parse, or stop storing options as properties`);
        this._name = this._savedState._name;
        this._scriptPath = null;
        this.rawArgs = [];
        this._optionValues = { ...this._savedState._optionValues };
        this._optionValueSources = { ...this._savedState._optionValueSources };
        this.args = [];
        this.processedArgs = [];
      }
      /**
       * Throw if expected executable is missing. Add lots of help for author.
       *
       * @param {string} executableFile
       * @param {string} executableDir
       * @param {string} subcommandName
       */
      _checkForMissingExecutable(executableFile, executableDir, subcommandName) {
        if (fs13.existsSync(executableFile)) return;
        const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
        const executableMissing = `'${executableFile}' does not exist
 - if '${subcommandName}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
        throw new Error(executableMissing);
      }
      /**
       * Execute a sub-command executable.
       *
       * @private
       */
      _executeSubCommand(subcommand, args) {
        args = args.slice();
        let launchWithNode = false;
        const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
        function findFile(baseDir, baseName) {
          const localBin = path20.resolve(baseDir, baseName);
          if (fs13.existsSync(localBin)) return localBin;
          if (sourceExt.includes(path20.extname(baseName))) return void 0;
          const foundExt = sourceExt.find(
            (ext) => fs13.existsSync(`${localBin}${ext}`)
          );
          if (foundExt) return `${localBin}${foundExt}`;
          return void 0;
        }
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
        let executableDir = this._executableDir || "";
        if (this._scriptPath) {
          let resolvedScriptPath;
          try {
            resolvedScriptPath = fs13.realpathSync(this._scriptPath);
          } catch {
            resolvedScriptPath = this._scriptPath;
          }
          executableDir = path20.resolve(
            path20.dirname(resolvedScriptPath),
            executableDir
          );
        }
        if (executableDir) {
          let localFile = findFile(executableDir, executableFile);
          if (!localFile && !subcommand._executableFile && this._scriptPath) {
            const legacyName = path20.basename(
              this._scriptPath,
              path20.extname(this._scriptPath)
            );
            if (legacyName !== this._name) {
              localFile = findFile(
                executableDir,
                `${legacyName}-${subcommand._name}`
              );
            }
          }
          executableFile = localFile || executableFile;
        }
        launchWithNode = sourceExt.includes(path20.extname(executableFile));
        let proc;
        if (process5.platform !== "win32") {
          if (launchWithNode) {
            args.unshift(executableFile);
            args = incrementNodeInspectorPort(process5.execArgv).concat(args);
            proc = childProcess.spawn(process5.argv[0], args, { stdio: "inherit" });
          } else {
            proc = childProcess.spawn(executableFile, args, { stdio: "inherit" });
          }
        } else {
          this._checkForMissingExecutable(
            executableFile,
            executableDir,
            subcommand._name
          );
          args.unshift(executableFile);
          args = incrementNodeInspectorPort(process5.execArgv).concat(args);
          proc = childProcess.spawn(process5.execPath, args, { stdio: "inherit" });
        }
        if (!proc.killed) {
          const signals2 = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
          signals2.forEach((signal) => {
            process5.on(signal, () => {
              if (proc.killed === false && proc.exitCode === null) {
                proc.kill(signal);
              }
            });
          });
        }
        const exitCallback = this._exitCallback;
        proc.on("close", (code) => {
          code = code ?? 1;
          if (!exitCallback) {
            process5.exit(code);
          } else {
            exitCallback(
              new CommanderError2(
                code,
                "commander.executeSubCommandAsync",
                "(close)"
              )
            );
          }
        });
        proc.on("error", (err) => {
          if (err.code === "ENOENT") {
            this._checkForMissingExecutable(
              executableFile,
              executableDir,
              subcommand._name
            );
          } else if (err.code === "EACCES") {
            throw new Error(`'${executableFile}' not executable`);
          }
          if (!exitCallback) {
            process5.exit(1);
          } else {
            const wrappedError = new CommanderError2(
              1,
              "commander.executeSubCommandAsync",
              "(error)"
            );
            wrappedError.nestedError = err;
            exitCallback(wrappedError);
          }
        });
        this.runningCommand = proc;
      }
      /**
       * @private
       */
      _dispatchSubcommand(commandName, operands, unknown) {
        const subCommand = this._findCommand(commandName);
        if (!subCommand) this.help({ error: true });
        subCommand._prepareForParse();
        let promiseChain;
        promiseChain = this._chainOrCallSubCommandHook(
          promiseChain,
          subCommand,
          "preSubcommand"
        );
        promiseChain = this._chainOrCall(promiseChain, () => {
          if (subCommand._executableHandler) {
            this._executeSubCommand(subCommand, operands.concat(unknown));
          } else {
            return subCommand._parseCommand(operands, unknown);
          }
        });
        return promiseChain;
      }
      /**
       * Invoke help directly if possible, or dispatch if necessary.
       * e.g. help foo
       *
       * @private
       */
      _dispatchHelpCommand(subcommandName) {
        if (!subcommandName) {
          this.help();
        }
        const subCommand = this._findCommand(subcommandName);
        if (subCommand && !subCommand._executableHandler) {
          subCommand.help();
        }
        return this._dispatchSubcommand(
          subcommandName,
          [],
          [this._getHelpOption()?.long ?? this._getHelpOption()?.short ?? "--help"]
        );
      }
      /**
       * Check this.args against expected this.registeredArguments.
       *
       * @private
       */
      _checkNumberOfArguments() {
        this.registeredArguments.forEach((arg, i) => {
          if (arg.required && this.args[i] == null) {
            this.missingArgument(arg.name());
          }
        });
        if (this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) {
          return;
        }
        if (this.args.length > this.registeredArguments.length) {
          this._excessArguments(this.args);
        }
      }
      /**
       * Process this.args using this.registeredArguments and save as this.processedArgs!
       *
       * @private
       */
      _processArguments() {
        const myParseArg = (argument, value, previous) => {
          let parsedValue = value;
          if (value !== null && argument.parseArg) {
            const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
            parsedValue = this._callParseArg(
              argument,
              value,
              previous,
              invalidValueMessage
            );
          }
          return parsedValue;
        };
        this._checkNumberOfArguments();
        const processedArgs = [];
        this.registeredArguments.forEach((declaredArg, index) => {
          let value = declaredArg.defaultValue;
          if (declaredArg.variadic) {
            if (index < this.args.length) {
              value = this.args.slice(index);
              if (declaredArg.parseArg) {
                value = value.reduce((processed, v) => {
                  return myParseArg(declaredArg, v, processed);
                }, declaredArg.defaultValue);
              }
            } else if (value === void 0) {
              value = [];
            }
          } else if (index < this.args.length) {
            value = this.args[index];
            if (declaredArg.parseArg) {
              value = myParseArg(declaredArg, value, declaredArg.defaultValue);
            }
          }
          processedArgs[index] = value;
        });
        this.processedArgs = processedArgs;
      }
      /**
       * Once we have a promise we chain, but call synchronously until then.
       *
       * @param {(Promise|undefined)} promise
       * @param {Function} fn
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCall(promise, fn) {
        if (promise?.then && typeof promise.then === "function") {
          return promise.then(() => fn());
        }
        return fn();
      }
      /**
       *
       * @param {(Promise|undefined)} promise
       * @param {string} event
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCallHooks(promise, event) {
        let result = promise;
        const hooks = [];
        this._getCommandAndAncestors().reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== void 0).forEach((hookedCommand) => {
          hookedCommand._lifeCycleHooks[event].forEach((callback) => {
            hooks.push({ hookedCommand, callback });
          });
        });
        if (event === "postAction") {
          hooks.reverse();
        }
        hooks.forEach((hookDetail) => {
          result = this._chainOrCall(result, () => {
            return hookDetail.callback(hookDetail.hookedCommand, this);
          });
        });
        return result;
      }
      /**
       *
       * @param {(Promise|undefined)} promise
       * @param {Command} subCommand
       * @param {string} event
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCallSubCommandHook(promise, subCommand, event) {
        let result = promise;
        if (this._lifeCycleHooks[event] !== void 0) {
          this._lifeCycleHooks[event].forEach((hook) => {
            result = this._chainOrCall(result, () => {
              return hook(this, subCommand);
            });
          });
        }
        return result;
      }
      /**
       * Process arguments in context of this command.
       * Returns action result, in case it is a promise.
       *
       * @private
       */
      _parseCommand(operands, unknown) {
        const parsed = this.parseOptions(unknown);
        this._parseOptionsEnv();
        this._parseOptionsImplied();
        operands = operands.concat(parsed.operands);
        unknown = parsed.unknown;
        this.args = operands.concat(unknown);
        if (operands && this._findCommand(operands[0])) {
          return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
        }
        if (this._getHelpCommand() && operands[0] === this._getHelpCommand().name()) {
          return this._dispatchHelpCommand(operands[1]);
        }
        if (this._defaultCommandName) {
          this._outputHelpIfRequested(unknown);
          return this._dispatchSubcommand(
            this._defaultCommandName,
            operands,
            unknown
          );
        }
        if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
          this.help({ error: true });
        }
        this._outputHelpIfRequested(parsed.unknown);
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        const checkForUnknownOptions = () => {
          if (parsed.unknown.length > 0) {
            this.unknownOption(parsed.unknown[0]);
          }
        };
        const commandEvent = `command:${this.name()}`;
        if (this._actionHandler) {
          checkForUnknownOptions();
          this._processArguments();
          let promiseChain;
          promiseChain = this._chainOrCallHooks(promiseChain, "preAction");
          promiseChain = this._chainOrCall(
            promiseChain,
            () => this._actionHandler(this.processedArgs)
          );
          if (this.parent) {
            promiseChain = this._chainOrCall(promiseChain, () => {
              this.parent.emit(commandEvent, operands, unknown);
            });
          }
          promiseChain = this._chainOrCallHooks(promiseChain, "postAction");
          return promiseChain;
        }
        if (this.parent?.listenerCount(commandEvent)) {
          checkForUnknownOptions();
          this._processArguments();
          this.parent.emit(commandEvent, operands, unknown);
        } else if (operands.length) {
          if (this._findCommand("*")) {
            return this._dispatchSubcommand("*", operands, unknown);
          }
          if (this.listenerCount("command:*")) {
            this.emit("command:*", operands, unknown);
          } else if (this.commands.length) {
            this.unknownCommand();
          } else {
            checkForUnknownOptions();
            this._processArguments();
          }
        } else if (this.commands.length) {
          checkForUnknownOptions();
          this.help({ error: true });
        } else {
          checkForUnknownOptions();
          this._processArguments();
        }
      }
      /**
       * Find matching command.
       *
       * @private
       * @return {Command | undefined}
       */
      _findCommand(name) {
        if (!name) return void 0;
        return this.commands.find(
          (cmd) => cmd._name === name || cmd._aliases.includes(name)
        );
      }
      /**
       * Return an option matching `arg` if any.
       *
       * @param {string} arg
       * @return {Option}
       * @package
       */
      _findOption(arg) {
        return this.options.find((option) => option.is(arg));
      }
      /**
       * Display an error message if a mandatory option does not have a value.
       * Called after checking for help flags in leaf subcommand.
       *
       * @private
       */
      _checkForMissingMandatoryOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd.options.forEach((anOption) => {
            if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === void 0) {
              cmd.missingMandatoryOptionValue(anOption);
            }
          });
        });
      }
      /**
       * Display an error message if conflicting options are used together in this.
       *
       * @private
       */
      _checkForConflictingLocalOptions() {
        const definedNonDefaultOptions = this.options.filter((option) => {
          const optionKey = option.attributeName();
          if (this.getOptionValue(optionKey) === void 0) {
            return false;
          }
          return this.getOptionValueSource(optionKey) !== "default";
        });
        const optionsWithConflicting = definedNonDefaultOptions.filter(
          (option) => option.conflictsWith.length > 0
        );
        optionsWithConflicting.forEach((option) => {
          const conflictingAndDefined = definedNonDefaultOptions.find(
            (defined) => option.conflictsWith.includes(defined.attributeName())
          );
          if (conflictingAndDefined) {
            this._conflictingOption(option, conflictingAndDefined);
          }
        });
      }
      /**
       * Display an error message if conflicting options are used together.
       * Called after checking for help flags in leaf subcommand.
       *
       * @private
       */
      _checkForConflictingOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd._checkForConflictingLocalOptions();
        });
      }
      /**
       * Parse options from `argv` removing known options,
       * and return argv split into operands and unknown arguments.
       *
       * Side effects: modifies command by storing options. Does not reset state if called again.
       *
       * Examples:
       *
       *     argv => operands, unknown
       *     --known kkk op => [op], []
       *     op --known kkk => [op], []
       *     sub --unknown uuu op => [sub], [--unknown uuu op]
       *     sub -- --unknown uuu op => [sub --unknown uuu op], []
       *
       * @param {string[]} args
       * @return {{operands: string[], unknown: string[]}}
       */
      parseOptions(args) {
        const operands = [];
        const unknown = [];
        let dest = operands;
        function maybeOption(arg) {
          return arg.length > 1 && arg[0] === "-";
        }
        const negativeNumberArg = (arg) => {
          if (!/^-(\d+|\d*\.\d+)(e[+-]?\d+)?$/.test(arg)) return false;
          return !this._getCommandAndAncestors().some(
            (cmd) => cmd.options.map((opt) => opt.short).some((short) => /^-\d$/.test(short))
          );
        };
        let activeVariadicOption = null;
        let activeGroup = null;
        let i = 0;
        while (i < args.length || activeGroup) {
          const arg = activeGroup ?? args[i++];
          activeGroup = null;
          if (arg === "--") {
            if (dest === unknown) dest.push(arg);
            dest.push(...args.slice(i));
            break;
          }
          if (activeVariadicOption && (!maybeOption(arg) || negativeNumberArg(arg))) {
            this.emit(`option:${activeVariadicOption.name()}`, arg);
            continue;
          }
          activeVariadicOption = null;
          if (maybeOption(arg)) {
            const option = this._findOption(arg);
            if (option) {
              if (option.required) {
                const value = args[i++];
                if (value === void 0) this.optionMissingArgument(option);
                this.emit(`option:${option.name()}`, value);
              } else if (option.optional) {
                let value = null;
                if (i < args.length && (!maybeOption(args[i]) || negativeNumberArg(args[i]))) {
                  value = args[i++];
                }
                this.emit(`option:${option.name()}`, value);
              } else {
                this.emit(`option:${option.name()}`);
              }
              activeVariadicOption = option.variadic ? option : null;
              continue;
            }
          }
          if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
            const option = this._findOption(`-${arg[1]}`);
            if (option) {
              if (option.required || option.optional && this._combineFlagAndOptionalValue) {
                this.emit(`option:${option.name()}`, arg.slice(2));
              } else {
                this.emit(`option:${option.name()}`);
                activeGroup = `-${arg.slice(2)}`;
              }
              continue;
            }
          }
          if (/^--[^=]+=/.test(arg)) {
            const index = arg.indexOf("=");
            const option = this._findOption(arg.slice(0, index));
            if (option && (option.required || option.optional)) {
              this.emit(`option:${option.name()}`, arg.slice(index + 1));
              continue;
            }
          }
          if (dest === operands && maybeOption(arg) && !(this.commands.length === 0 && negativeNumberArg(arg))) {
            dest = unknown;
          }
          if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
            if (this._findCommand(arg)) {
              operands.push(arg);
              unknown.push(...args.slice(i));
              break;
            } else if (this._getHelpCommand() && arg === this._getHelpCommand().name()) {
              operands.push(arg, ...args.slice(i));
              break;
            } else if (this._defaultCommandName) {
              unknown.push(arg, ...args.slice(i));
              break;
            }
          }
          if (this._passThroughOptions) {
            dest.push(arg, ...args.slice(i));
            break;
          }
          dest.push(arg);
        }
        return { operands, unknown };
      }
      /**
       * Return an object containing local option values as key-value pairs.
       *
       * @return {object}
       */
      opts() {
        if (this._storeOptionsAsProperties) {
          const result = {};
          const len = this.options.length;
          for (let i = 0; i < len; i++) {
            const key = this.options[i].attributeName();
            result[key] = key === this._versionOptionName ? this._version : this[key];
          }
          return result;
        }
        return this._optionValues;
      }
      /**
       * Return an object containing merged local and global option values as key-value pairs.
       *
       * @return {object}
       */
      optsWithGlobals() {
        return this._getCommandAndAncestors().reduce(
          (combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
          {}
        );
      }
      /**
       * Display error message and exit (or call exitOverride).
       *
       * @param {string} message
       * @param {object} [errorOptions]
       * @param {string} [errorOptions.code] - an id string representing the error
       * @param {number} [errorOptions.exitCode] - used with process.exit
       */
      error(message, errorOptions) {
        this._outputConfiguration.outputError(
          `${message}
`,
          this._outputConfiguration.writeErr
        );
        if (typeof this._showHelpAfterError === "string") {
          this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
        } else if (this._showHelpAfterError) {
          this._outputConfiguration.writeErr("\n");
          this.outputHelp({ error: true });
        }
        const config = errorOptions || {};
        const exitCode = config.exitCode || 1;
        const code = config.code || "commander.error";
        this._exit(exitCode, code, message);
      }
      /**
       * Apply any option related environment variables, if option does
       * not have a value from cli or client code.
       *
       * @private
       */
      _parseOptionsEnv() {
        this.options.forEach((option) => {
          if (option.envVar && option.envVar in process5.env) {
            const optionKey = option.attributeName();
            if (this.getOptionValue(optionKey) === void 0 || ["default", "config", "env"].includes(
              this.getOptionValueSource(optionKey)
            )) {
              if (option.required || option.optional) {
                this.emit(`optionEnv:${option.name()}`, process5.env[option.envVar]);
              } else {
                this.emit(`optionEnv:${option.name()}`);
              }
            }
          }
        });
      }
      /**
       * Apply any implied option values, if option is undefined or default value.
       *
       * @private
       */
      _parseOptionsImplied() {
        const dualHelper = new DualOptions(this.options);
        const hasCustomOptionValue = (optionKey) => {
          return this.getOptionValue(optionKey) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
        };
        this.options.filter(
          (option) => option.implied !== void 0 && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(
            this.getOptionValue(option.attributeName()),
            option
          )
        ).forEach((option) => {
          Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
            this.setOptionValueWithSource(
              impliedKey,
              option.implied[impliedKey],
              "implied"
            );
          });
        });
      }
      /**
       * Argument `name` is missing.
       *
       * @param {string} name
       * @private
       */
      missingArgument(name) {
        const message = `error: missing required argument '${name}'`;
        this.error(message, { code: "commander.missingArgument" });
      }
      /**
       * `Option` is missing an argument.
       *
       * @param {Option} option
       * @private
       */
      optionMissingArgument(option) {
        const message = `error: option '${option.flags}' argument missing`;
        this.error(message, { code: "commander.optionMissingArgument" });
      }
      /**
       * `Option` does not have a value, and is a mandatory option.
       *
       * @param {Option} option
       * @private
       */
      missingMandatoryOptionValue(option) {
        const message = `error: required option '${option.flags}' not specified`;
        this.error(message, { code: "commander.missingMandatoryOptionValue" });
      }
      /**
       * `Option` conflicts with another option.
       *
       * @param {Option} option
       * @param {Option} conflictingOption
       * @private
       */
      _conflictingOption(option, conflictingOption) {
        const findBestOptionFromValue = (option2) => {
          const optionKey = option2.attributeName();
          const optionValue = this.getOptionValue(optionKey);
          const negativeOption = this.options.find(
            (target) => target.negate && optionKey === target.attributeName()
          );
          const positiveOption = this.options.find(
            (target) => !target.negate && optionKey === target.attributeName()
          );
          if (negativeOption && (negativeOption.presetArg === void 0 && optionValue === false || negativeOption.presetArg !== void 0 && optionValue === negativeOption.presetArg)) {
            return negativeOption;
          }
          return positiveOption || option2;
        };
        const getErrorMessage = (option2) => {
          const bestOption = findBestOptionFromValue(option2);
          const optionKey = bestOption.attributeName();
          const source = this.getOptionValueSource(optionKey);
          if (source === "env") {
            return `environment variable '${bestOption.envVar}'`;
          }
          return `option '${bestOption.flags}'`;
        };
        const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
        this.error(message, { code: "commander.conflictingOption" });
      }
      /**
       * Unknown option `flag`.
       *
       * @param {string} flag
       * @private
       */
      unknownOption(flag) {
        if (this._allowUnknownOption) return;
        let suggestion = "";
        if (flag.startsWith("--") && this._showSuggestionAfterError) {
          let candidateFlags = [];
          let command = this;
          do {
            const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
            candidateFlags = candidateFlags.concat(moreFlags);
            command = command.parent;
          } while (command && !command._enablePositionalOptions);
          suggestion = suggestSimilar(flag, candidateFlags);
        }
        const message = `error: unknown option '${flag}'${suggestion}`;
        this.error(message, { code: "commander.unknownOption" });
      }
      /**
       * Excess arguments, more than expected.
       *
       * @param {string[]} receivedArgs
       * @private
       */
      _excessArguments(receivedArgs) {
        if (this._allowExcessArguments) return;
        const expected = this.registeredArguments.length;
        const s = expected === 1 ? "" : "s";
        const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
        const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
        this.error(message, { code: "commander.excessArguments" });
      }
      /**
       * Unknown command.
       *
       * @private
       */
      unknownCommand() {
        const unknownName = this.args[0];
        let suggestion = "";
        if (this._showSuggestionAfterError) {
          const candidateNames = [];
          this.createHelp().visibleCommands(this).forEach((command) => {
            candidateNames.push(command.name());
            if (command.alias()) candidateNames.push(command.alias());
          });
          suggestion = suggestSimilar(unknownName, candidateNames);
        }
        const message = `error: unknown command '${unknownName}'${suggestion}`;
        this.error(message, { code: "commander.unknownCommand" });
      }
      /**
       * Get or set the program version.
       *
       * This method auto-registers the "-V, --version" option which will print the version number.
       *
       * You can optionally supply the flags and description to override the defaults.
       *
       * @param {string} [str]
       * @param {string} [flags]
       * @param {string} [description]
       * @return {(this | string | undefined)} `this` command for chaining, or version string if no arguments
       */
      version(str2, flags, description) {
        if (str2 === void 0) return this._version;
        this._version = str2;
        flags = flags || "-V, --version";
        description = description || "output the version number";
        const versionOption = this.createOption(flags, description);
        this._versionOptionName = versionOption.attributeName();
        this._registerOption(versionOption);
        this.on("option:" + versionOption.name(), () => {
          this._outputConfiguration.writeOut(`${str2}
`);
          this._exit(0, "commander.version", str2);
        });
        return this;
      }
      /**
       * Set the description.
       *
       * @param {string} [str]
       * @param {object} [argsDescription]
       * @return {(string|Command)}
       */
      description(str2, argsDescription) {
        if (str2 === void 0 && argsDescription === void 0)
          return this._description;
        this._description = str2;
        if (argsDescription) {
          this._argsDescription = argsDescription;
        }
        return this;
      }
      /**
       * Set the summary. Used when listed as subcommand of parent.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      summary(str2) {
        if (str2 === void 0) return this._summary;
        this._summary = str2;
        return this;
      }
      /**
       * Set an alias for the command.
       *
       * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
       *
       * @param {string} [alias]
       * @return {(string|Command)}
       */
      alias(alias) {
        if (alias === void 0) return this._aliases[0];
        let command = this;
        if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
          command = this.commands[this.commands.length - 1];
        }
        if (alias === command._name)
          throw new Error("Command alias can't be the same as its name");
        const matchingCommand = this.parent?._findCommand(alias);
        if (matchingCommand) {
          const existingCmd = [matchingCommand.name()].concat(matchingCommand.aliases()).join("|");
          throw new Error(
            `cannot add alias '${alias}' to command '${this.name()}' as already have command '${existingCmd}'`
          );
        }
        command._aliases.push(alias);
        return this;
      }
      /**
       * Set aliases for the command.
       *
       * Only the first alias is shown in the auto-generated help.
       *
       * @param {string[]} [aliases]
       * @return {(string[]|Command)}
       */
      aliases(aliases) {
        if (aliases === void 0) return this._aliases;
        aliases.forEach((alias) => this.alias(alias));
        return this;
      }
      /**
       * Set / get the command usage `str`.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      usage(str2) {
        if (str2 === void 0) {
          if (this._usage) return this._usage;
          const args = this.registeredArguments.map((arg) => {
            return humanReadableArgName(arg);
          });
          return [].concat(
            this.options.length || this._helpOption !== null ? "[options]" : [],
            this.commands.length ? "[command]" : [],
            this.registeredArguments.length ? args : []
          ).join(" ");
        }
        this._usage = str2;
        return this;
      }
      /**
       * Get or set the name of the command.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      name(str2) {
        if (str2 === void 0) return this._name;
        this._name = str2;
        return this;
      }
      /**
       * Set/get the help group heading for this subcommand in parent command's help.
       *
       * @param {string} [heading]
       * @return {Command | string}
       */
      helpGroup(heading) {
        if (heading === void 0) return this._helpGroupHeading ?? "";
        this._helpGroupHeading = heading;
        return this;
      }
      /**
       * Set/get the default help group heading for subcommands added to this command.
       * (This does not override a group set directly on the subcommand using .helpGroup().)
       *
       * @example
       * program.commandsGroup('Development Commands:);
       * program.command('watch')...
       * program.command('lint')...
       * ...
       *
       * @param {string} [heading]
       * @returns {Command | string}
       */
      commandsGroup(heading) {
        if (heading === void 0) return this._defaultCommandGroup ?? "";
        this._defaultCommandGroup = heading;
        return this;
      }
      /**
       * Set/get the default help group heading for options added to this command.
       * (This does not override a group set directly on the option using .helpGroup().)
       *
       * @example
       * program
       *   .optionsGroup('Development Options:')
       *   .option('-d, --debug', 'output extra debugging')
       *   .option('-p, --profile', 'output profiling information')
       *
       * @param {string} [heading]
       * @returns {Command | string}
       */
      optionsGroup(heading) {
        if (heading === void 0) return this._defaultOptionGroup ?? "";
        this._defaultOptionGroup = heading;
        return this;
      }
      /**
       * @param {Option} option
       * @private
       */
      _initOptionGroup(option) {
        if (this._defaultOptionGroup && !option.helpGroupHeading)
          option.helpGroup(this._defaultOptionGroup);
      }
      /**
       * @param {Command} cmd
       * @private
       */
      _initCommandGroup(cmd) {
        if (this._defaultCommandGroup && !cmd.helpGroup())
          cmd.helpGroup(this._defaultCommandGroup);
      }
      /**
       * Set the name of the command from script filename, such as process.argv[1],
       * or require.main.filename, or __filename.
       *
       * (Used internally and public although not documented in README.)
       *
       * @example
       * program.nameFromFilename(require.main.filename);
       *
       * @param {string} filename
       * @return {Command}
       */
      nameFromFilename(filename) {
        this._name = path20.basename(filename, path20.extname(filename));
        return this;
      }
      /**
       * Get or set the directory for searching for executable subcommands of this command.
       *
       * @example
       * program.executableDir(__dirname);
       * // or
       * program.executableDir('subcommands');
       *
       * @param {string} [path]
       * @return {(string|null|Command)}
       */
      executableDir(path21) {
        if (path21 === void 0) return this._executableDir;
        this._executableDir = path21;
        return this;
      }
      /**
       * Return program help documentation.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
       * @return {string}
       */
      helpInformation(contextOptions) {
        const helper = this.createHelp();
        const context = this._getOutputContext(contextOptions);
        helper.prepareContext({
          error: context.error,
          helpWidth: context.helpWidth,
          outputHasColors: context.hasColors
        });
        const text = helper.formatHelp(this, helper);
        if (context.hasColors) return text;
        return this._outputConfiguration.stripColor(text);
      }
      /**
       * @typedef HelpContext
       * @type {object}
       * @property {boolean} error
       * @property {number} helpWidth
       * @property {boolean} hasColors
       * @property {function} write - includes stripColor if needed
       *
       * @returns {HelpContext}
       * @private
       */
      _getOutputContext(contextOptions) {
        contextOptions = contextOptions || {};
        const error = !!contextOptions.error;
        let baseWrite;
        let hasColors;
        let helpWidth;
        if (error) {
          baseWrite = (str2) => this._outputConfiguration.writeErr(str2);
          hasColors = this._outputConfiguration.getErrHasColors();
          helpWidth = this._outputConfiguration.getErrHelpWidth();
        } else {
          baseWrite = (str2) => this._outputConfiguration.writeOut(str2);
          hasColors = this._outputConfiguration.getOutHasColors();
          helpWidth = this._outputConfiguration.getOutHelpWidth();
        }
        const write = (str2) => {
          if (!hasColors) str2 = this._outputConfiguration.stripColor(str2);
          return baseWrite(str2);
        };
        return { error, write, hasColors, helpWidth };
      }
      /**
       * Output help information for this command.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      outputHelp(contextOptions) {
        let deprecatedCallback;
        if (typeof contextOptions === "function") {
          deprecatedCallback = contextOptions;
          contextOptions = void 0;
        }
        const outputContext = this._getOutputContext(contextOptions);
        const eventContext = {
          error: outputContext.error,
          write: outputContext.write,
          command: this
        };
        this._getCommandAndAncestors().reverse().forEach((command) => command.emit("beforeAllHelp", eventContext));
        this.emit("beforeHelp", eventContext);
        let helpInformation = this.helpInformation({ error: outputContext.error });
        if (deprecatedCallback) {
          helpInformation = deprecatedCallback(helpInformation);
          if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) {
            throw new Error("outputHelp callback must return a string or a Buffer");
          }
        }
        outputContext.write(helpInformation);
        if (this._getHelpOption()?.long) {
          this.emit(this._getHelpOption().long);
        }
        this.emit("afterHelp", eventContext);
        this._getCommandAndAncestors().forEach(
          (command) => command.emit("afterAllHelp", eventContext)
        );
      }
      /**
       * You can pass in flags and a description to customise the built-in help option.
       * Pass in false to disable the built-in help option.
       *
       * @example
       * program.helpOption('-?, --help' 'show help'); // customise
       * program.helpOption(false); // disable
       *
       * @param {(string | boolean)} flags
       * @param {string} [description]
       * @return {Command} `this` command for chaining
       */
      helpOption(flags, description) {
        if (typeof flags === "boolean") {
          if (flags) {
            if (this._helpOption === null) this._helpOption = void 0;
            if (this._defaultOptionGroup) {
              this._initOptionGroup(this._getHelpOption());
            }
          } else {
            this._helpOption = null;
          }
          return this;
        }
        this._helpOption = this.createOption(
          flags ?? "-h, --help",
          description ?? "display help for command"
        );
        if (flags || description) this._initOptionGroup(this._helpOption);
        return this;
      }
      /**
       * Lazy create help option.
       * Returns null if has been disabled with .helpOption(false).
       *
       * @returns {(Option | null)} the help option
       * @package
       */
      _getHelpOption() {
        if (this._helpOption === void 0) {
          this.helpOption(void 0, void 0);
        }
        return this._helpOption;
      }
      /**
       * Supply your own option to use for the built-in help option.
       * This is an alternative to using helpOption() to customise the flags and description etc.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addHelpOption(option) {
        this._helpOption = option;
        this._initOptionGroup(option);
        return this;
      }
      /**
       * Output help information and exit.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      help(contextOptions) {
        this.outputHelp(contextOptions);
        let exitCode = Number(process5.exitCode ?? 0);
        if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) {
          exitCode = 1;
        }
        this._exit(exitCode, "commander.help", "(outputHelp)");
      }
      /**
       * // Do a little typing to coordinate emit and listener for the help text events.
       * @typedef HelpTextEventContext
       * @type {object}
       * @property {boolean} error
       * @property {Command} command
       * @property {function} write
       */
      /**
       * Add additional text to be displayed with the built-in help.
       *
       * Position is 'before' or 'after' to affect just this command,
       * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
       *
       * @param {string} position - before or after built-in help
       * @param {(string | Function)} text - string to add, or a function returning a string
       * @return {Command} `this` command for chaining
       */
      addHelpText(position, text) {
        const allowedValues = ["beforeAll", "before", "after", "afterAll"];
        if (!allowedValues.includes(position)) {
          throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        const helpEvent = `${position}Help`;
        this.on(helpEvent, (context) => {
          let helpStr;
          if (typeof text === "function") {
            helpStr = text({ error: context.error, command: context.command });
          } else {
            helpStr = text;
          }
          if (helpStr) {
            context.write(`${helpStr}
`);
          }
        });
        return this;
      }
      /**
       * Output help information if help flags specified
       *
       * @param {Array} args - array of options to search for help flags
       * @private
       */
      _outputHelpIfRequested(args) {
        const helpOption = this._getHelpOption();
        const helpRequested = helpOption && args.find((arg) => helpOption.is(arg));
        if (helpRequested) {
          this.outputHelp();
          this._exit(0, "commander.helpDisplayed", "(outputHelp)");
        }
      }
    };
    function incrementNodeInspectorPort(args) {
      return args.map((arg) => {
        if (!arg.startsWith("--inspect")) {
          return arg;
        }
        let debugOption;
        let debugHost = "127.0.0.1";
        let debugPort = "9229";
        let match;
        if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
          debugOption = match[1];
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
          debugOption = match[1];
          if (/^\d+$/.test(match[3])) {
            debugPort = match[3];
          } else {
            debugHost = match[3];
          }
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
          debugOption = match[1];
          debugHost = match[3];
          debugPort = match[4];
        }
        if (debugOption && debugPort !== "0") {
          return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
        }
        return arg;
      });
    }
    function useColor() {
      if (process5.env.NO_COLOR || process5.env.FORCE_COLOR === "0" || process5.env.FORCE_COLOR === "false")
        return false;
      if (process5.env.FORCE_COLOR || process5.env.CLICOLOR_FORCE !== void 0)
        return true;
      return void 0;
    }
    exports.Command = Command2;
    exports.useColor = useColor;
  }
});

// cli/node_modules/commander/index.js
var require_commander = __commonJS({
  "cli/node_modules/commander/index.js"(exports) {
    var { Argument: Argument2 } = require_argument();
    var { Command: Command2 } = require_command();
    var { CommanderError: CommanderError2, InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var { Help: Help2 } = require_help();
    var { Option: Option2 } = require_option();
    exports.program = new Command2();
    exports.createCommand = (name) => new Command2(name);
    exports.createOption = (flags, description) => new Option2(flags, description);
    exports.createArgument = (name, description) => new Argument2(name, description);
    exports.Command = Command2;
    exports.Option = Option2;
    exports.Argument = Argument2;
    exports.Help = Help2;
    exports.CommanderError = CommanderError2;
    exports.InvalidArgumentError = InvalidArgumentError2;
    exports.InvalidOptionArgumentError = InvalidArgumentError2;
  }
});

// cli/node_modules/commander/esm.mjs
var import_index, program, createCommand, createArgument, createOption, CommanderError, InvalidArgumentError, InvalidOptionArgumentError, Command, Argument, Option, Help;
var init_esm = __esm({
  "cli/node_modules/commander/esm.mjs"() {
    import_index = __toESM(require_commander(), 1);
    ({
      program,
      createCommand,
      createArgument,
      createOption,
      CommanderError,
      InvalidArgumentError,
      InvalidOptionArgumentError,
      Command: (
        // deprecated old name
        Command
      ),
      Argument,
      Option,
      Help
    } = import_index.default);
  }
});

// cli/node_modules/@inquirer/core/dist/lib/key.js
var isUpKey, isDownKey, isBackspaceKey, isTabKey, isNumberKey, isEnterKey;
var init_key = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/key.js"() {
    isUpKey = (key, keybindings = []) => (
      // The up key
      key.name === "up" || // Vim keybinding: hjkl keys map to left/down/up/right
      keybindings.includes("vim") && key.name === "k" || // Emacs keybinding: Ctrl+P means "previous" in Emacs navigation conventions
      keybindings.includes("emacs") && key.ctrl && key.name === "p"
    );
    isDownKey = (key, keybindings = []) => (
      // The down key
      key.name === "down" || // Vim keybinding: hjkl keys map to left/down/up/right
      keybindings.includes("vim") && key.name === "j" || // Emacs keybinding: Ctrl+N means "next" in Emacs navigation conventions
      keybindings.includes("emacs") && key.ctrl && key.name === "n"
    );
    isBackspaceKey = (key) => key.name === "backspace";
    isTabKey = (key) => key.name === "tab";
    isNumberKey = (key) => "1234567890".includes(key.name);
    isEnterKey = (key) => key.name === "enter" || key.name === "return";
  }
});

// cli/node_modules/@inquirer/core/dist/lib/errors.js
var AbortPromptError, CancelPromptError, ExitPromptError, HookError, ValidationError;
var init_errors = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/errors.js"() {
    AbortPromptError = class extends Error {
      name = "AbortPromptError";
      message = "Prompt was aborted";
      constructor(options) {
        super();
        this.cause = options?.cause;
      }
    };
    CancelPromptError = class extends Error {
      name = "CancelPromptError";
      message = "Prompt was canceled";
    };
    ExitPromptError = class extends Error {
      name = "ExitPromptError";
    };
    HookError = class extends Error {
      name = "HookError";
    };
    ValidationError = class extends Error {
      name = "ValidationError";
    };
  }
});

// cli/node_modules/@inquirer/core/dist/lib/hook-engine.js
import { AsyncLocalStorage, AsyncResource } from "node:async_hooks";
function createStore(rl) {
  const store = {
    rl,
    hooks: [],
    hooksCleanup: [],
    hooksEffect: [],
    index: 0,
    handleChange() {
    }
  };
  return store;
}
function withHooks(rl, cb) {
  const store = createStore(rl);
  return hookStorage.run(store, () => {
    function cycle(render) {
      store.handleChange = () => {
        store.index = 0;
        render();
      };
      store.handleChange();
    }
    return cb(cycle);
  });
}
function getStore() {
  const store = hookStorage.getStore();
  if (!store) {
    throw new HookError("[Inquirer] Hook functions can only be called from within a prompt");
  }
  return store;
}
function readline() {
  return getStore().rl;
}
function withUpdates(fn) {
  const wrapped = (...args) => {
    const store = getStore();
    let shouldUpdate = false;
    const oldHandleChange = store.handleChange;
    store.handleChange = () => {
      shouldUpdate = true;
    };
    const returnValue = fn(...args);
    if (shouldUpdate) {
      oldHandleChange();
    }
    store.handleChange = oldHandleChange;
    return returnValue;
  };
  return AsyncResource.bind(wrapped);
}
function withPointer(cb) {
  const store = getStore();
  const { index } = store;
  const pointer = {
    get() {
      return store.hooks[index];
    },
    set(value) {
      store.hooks[index] = value;
    },
    initialized: index in store.hooks
  };
  const returnValue = cb(pointer);
  store.index++;
  return returnValue;
}
function handleChange() {
  getStore().handleChange();
}
var hookStorage, effectScheduler;
var init_hook_engine = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/hook-engine.js"() {
    init_errors();
    hookStorage = new AsyncLocalStorage();
    effectScheduler = {
      queue(cb) {
        const store = getStore();
        const { index } = store;
        store.hooksEffect.push(() => {
          store.hooksCleanup[index]?.();
          const cleanFn = cb(readline());
          if (cleanFn != null && typeof cleanFn !== "function") {
            throw new ValidationError("useEffect return value must be a cleanup function or nothing.");
          }
          store.hooksCleanup[index] = cleanFn;
        });
      },
      run() {
        const store = getStore();
        withUpdates(() => {
          store.hooksEffect.forEach((effect) => {
            effect();
          });
          store.hooksEffect.length = 0;
        })();
      },
      clearAll() {
        const store = getStore();
        store.hooksCleanup.forEach((cleanFn) => {
          cleanFn?.();
        });
        store.hooksEffect.length = 0;
        store.hooksCleanup.length = 0;
      }
    };
  }
});

// cli/node_modules/@inquirer/core/dist/lib/use-state.js
import { AsyncResource as AsyncResource2 } from "node:async_hooks";
function isFactory(value) {
  return typeof value === "function";
}
function useState(defaultValue) {
  return withPointer((pointer) => {
    const setState = AsyncResource2.bind(function setState2(newValue) {
      if (pointer.get() !== newValue) {
        pointer.set(newValue);
        handleChange();
      }
    });
    if (pointer.initialized) {
      return [pointer.get(), setState];
    }
    const value = isFactory(defaultValue) ? defaultValue() : defaultValue;
    pointer.set(value);
    return [value, setState];
  });
}
var init_use_state = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/use-state.js"() {
    init_hook_engine();
  }
});

// cli/node_modules/@inquirer/core/dist/lib/use-effect.js
function useEffect(cb, depArray) {
  withPointer((pointer) => {
    const oldDeps = pointer.get();
    const hasChanged = !Array.isArray(oldDeps) || depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
    if (hasChanged) {
      effectScheduler.queue(cb);
    }
    pointer.set(depArray);
  });
}
var init_use_effect = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/use-effect.js"() {
    init_hook_engine();
  }
});

// cli/node_modules/@inquirer/figures/dist/index.js
import process2 from "node:process";
function isUnicodeSupported() {
  if (!process2.platform.startsWith("win")) {
    return process2.env["TERM"] !== "linux";
  }
  return Boolean(process2.env["CI"]) || // CI environments generally support unicode
  Boolean(process2.env["WT_SESSION"]) || // Windows Terminal
  Boolean(process2.env["TERMINUS_SUBLIME"]) || // Terminus (<0.2.27)
  process2.env["ConEmuTask"] === "{cmd::Cmder}" || // ConEmu and cmder
  process2.env["TERM_PROGRAM"] === "Terminus-Sublime" || process2.env["TERM_PROGRAM"] === "vscode" || process2.env["TERM"] === "xterm-256color" || process2.env["TERM"] === "alacritty" || process2.env["TERMINAL_EMULATOR"] === "JetBrains-JediTerm";
}
var common, specialMainSymbols, specialFallbackSymbols, mainSymbols, fallbackSymbols, shouldUseMain, figures, dist_default, replacements;
var init_dist = __esm({
  "cli/node_modules/@inquirer/figures/dist/index.js"() {
    common = {
      circleQuestionMark: "(?)",
      questionMarkPrefix: "(?)",
      square: "\u2588",
      squareDarkShade: "\u2593",
      squareMediumShade: "\u2592",
      squareLightShade: "\u2591",
      squareTop: "\u2580",
      squareBottom: "\u2584",
      squareLeft: "\u258C",
      squareRight: "\u2590",
      squareCenter: "\u25A0",
      bullet: "\u25CF",
      dot: "\u2024",
      ellipsis: "\u2026",
      pointerSmall: "\u203A",
      triangleUp: "\u25B2",
      triangleUpSmall: "\u25B4",
      triangleDown: "\u25BC",
      triangleDownSmall: "\u25BE",
      triangleLeftSmall: "\u25C2",
      triangleRightSmall: "\u25B8",
      home: "\u2302",
      heart: "\u2665",
      musicNote: "\u266A",
      musicNoteBeamed: "\u266B",
      arrowUp: "\u2191",
      arrowDown: "\u2193",
      arrowLeft: "\u2190",
      arrowRight: "\u2192",
      arrowLeftRight: "\u2194",
      arrowUpDown: "\u2195",
      almostEqual: "\u2248",
      notEqual: "\u2260",
      lessOrEqual: "\u2264",
      greaterOrEqual: "\u2265",
      identical: "\u2261",
      infinity: "\u221E",
      subscriptZero: "\u2080",
      subscriptOne: "\u2081",
      subscriptTwo: "\u2082",
      subscriptThree: "\u2083",
      subscriptFour: "\u2084",
      subscriptFive: "\u2085",
      subscriptSix: "\u2086",
      subscriptSeven: "\u2087",
      subscriptEight: "\u2088",
      subscriptNine: "\u2089",
      oneHalf: "\xBD",
      oneThird: "\u2153",
      oneQuarter: "\xBC",
      oneFifth: "\u2155",
      oneSixth: "\u2159",
      oneEighth: "\u215B",
      twoThirds: "\u2154",
      twoFifths: "\u2156",
      threeQuarters: "\xBE",
      threeFifths: "\u2157",
      threeEighths: "\u215C",
      fourFifths: "\u2158",
      fiveSixths: "\u215A",
      fiveEighths: "\u215D",
      sevenEighths: "\u215E",
      line: "\u2500",
      lineBold: "\u2501",
      lineDouble: "\u2550",
      lineDashed0: "\u2504",
      lineDashed1: "\u2505",
      lineDashed2: "\u2508",
      lineDashed3: "\u2509",
      lineDashed4: "\u254C",
      lineDashed5: "\u254D",
      lineDashed6: "\u2574",
      lineDashed7: "\u2576",
      lineDashed8: "\u2578",
      lineDashed9: "\u257A",
      lineDashed10: "\u257C",
      lineDashed11: "\u257E",
      lineDashed12: "\u2212",
      lineDashed13: "\u2013",
      lineDashed14: "\u2010",
      lineDashed15: "\u2043",
      lineVertical: "\u2502",
      lineVerticalBold: "\u2503",
      lineVerticalDouble: "\u2551",
      lineVerticalDashed0: "\u2506",
      lineVerticalDashed1: "\u2507",
      lineVerticalDashed2: "\u250A",
      lineVerticalDashed3: "\u250B",
      lineVerticalDashed4: "\u254E",
      lineVerticalDashed5: "\u254F",
      lineVerticalDashed6: "\u2575",
      lineVerticalDashed7: "\u2577",
      lineVerticalDashed8: "\u2579",
      lineVerticalDashed9: "\u257B",
      lineVerticalDashed10: "\u257D",
      lineVerticalDashed11: "\u257F",
      lineDownLeft: "\u2510",
      lineDownLeftArc: "\u256E",
      lineDownBoldLeftBold: "\u2513",
      lineDownBoldLeft: "\u2512",
      lineDownLeftBold: "\u2511",
      lineDownDoubleLeftDouble: "\u2557",
      lineDownDoubleLeft: "\u2556",
      lineDownLeftDouble: "\u2555",
      lineDownRight: "\u250C",
      lineDownRightArc: "\u256D",
      lineDownBoldRightBold: "\u250F",
      lineDownBoldRight: "\u250E",
      lineDownRightBold: "\u250D",
      lineDownDoubleRightDouble: "\u2554",
      lineDownDoubleRight: "\u2553",
      lineDownRightDouble: "\u2552",
      lineUpLeft: "\u2518",
      lineUpLeftArc: "\u256F",
      lineUpBoldLeftBold: "\u251B",
      lineUpBoldLeft: "\u251A",
      lineUpLeftBold: "\u2519",
      lineUpDoubleLeftDouble: "\u255D",
      lineUpDoubleLeft: "\u255C",
      lineUpLeftDouble: "\u255B",
      lineUpRight: "\u2514",
      lineUpRightArc: "\u2570",
      lineUpBoldRightBold: "\u2517",
      lineUpBoldRight: "\u2516",
      lineUpRightBold: "\u2515",
      lineUpDoubleRightDouble: "\u255A",
      lineUpDoubleRight: "\u2559",
      lineUpRightDouble: "\u2558",
      lineUpDownLeft: "\u2524",
      lineUpBoldDownBoldLeftBold: "\u252B",
      lineUpBoldDownBoldLeft: "\u2528",
      lineUpDownLeftBold: "\u2525",
      lineUpBoldDownLeftBold: "\u2529",
      lineUpDownBoldLeftBold: "\u252A",
      lineUpDownBoldLeft: "\u2527",
      lineUpBoldDownLeft: "\u2526",
      lineUpDoubleDownDoubleLeftDouble: "\u2563",
      lineUpDoubleDownDoubleLeft: "\u2562",
      lineUpDownLeftDouble: "\u2561",
      lineUpDownRight: "\u251C",
      lineUpBoldDownBoldRightBold: "\u2523",
      lineUpBoldDownBoldRight: "\u2520",
      lineUpDownRightBold: "\u251D",
      lineUpBoldDownRightBold: "\u2521",
      lineUpDownBoldRightBold: "\u2522",
      lineUpDownBoldRight: "\u251F",
      lineUpBoldDownRight: "\u251E",
      lineUpDoubleDownDoubleRightDouble: "\u2560",
      lineUpDoubleDownDoubleRight: "\u255F",
      lineUpDownRightDouble: "\u255E",
      lineDownLeftRight: "\u252C",
      lineDownBoldLeftBoldRightBold: "\u2533",
      lineDownLeftBoldRightBold: "\u252F",
      lineDownBoldLeftRight: "\u2530",
      lineDownBoldLeftBoldRight: "\u2531",
      lineDownBoldLeftRightBold: "\u2532",
      lineDownLeftRightBold: "\u252E",
      lineDownLeftBoldRight: "\u252D",
      lineDownDoubleLeftDoubleRightDouble: "\u2566",
      lineDownDoubleLeftRight: "\u2565",
      lineDownLeftDoubleRightDouble: "\u2564",
      lineUpLeftRight: "\u2534",
      lineUpBoldLeftBoldRightBold: "\u253B",
      lineUpLeftBoldRightBold: "\u2537",
      lineUpBoldLeftRight: "\u2538",
      lineUpBoldLeftBoldRight: "\u2539",
      lineUpBoldLeftRightBold: "\u253A",
      lineUpLeftRightBold: "\u2536",
      lineUpLeftBoldRight: "\u2535",
      lineUpDoubleLeftDoubleRightDouble: "\u2569",
      lineUpDoubleLeftRight: "\u2568",
      lineUpLeftDoubleRightDouble: "\u2567",
      lineUpDownLeftRight: "\u253C",
      lineUpBoldDownBoldLeftBoldRightBold: "\u254B",
      lineUpDownBoldLeftBoldRightBold: "\u2548",
      lineUpBoldDownLeftBoldRightBold: "\u2547",
      lineUpBoldDownBoldLeftRightBold: "\u254A",
      lineUpBoldDownBoldLeftBoldRight: "\u2549",
      lineUpBoldDownLeftRight: "\u2540",
      lineUpDownBoldLeftRight: "\u2541",
      lineUpDownLeftBoldRight: "\u253D",
      lineUpDownLeftRightBold: "\u253E",
      lineUpBoldDownBoldLeftRight: "\u2542",
      lineUpDownLeftBoldRightBold: "\u253F",
      lineUpBoldDownLeftBoldRight: "\u2543",
      lineUpBoldDownLeftRightBold: "\u2544",
      lineUpDownBoldLeftBoldRight: "\u2545",
      lineUpDownBoldLeftRightBold: "\u2546",
      lineUpDoubleDownDoubleLeftDoubleRightDouble: "\u256C",
      lineUpDoubleDownDoubleLeftRight: "\u256B",
      lineUpDownLeftDoubleRightDouble: "\u256A",
      lineCross: "\u2573",
      lineBackslash: "\u2572",
      lineSlash: "\u2571"
    };
    specialMainSymbols = {
      tick: "\u2714",
      info: "\u2139",
      warning: "\u26A0",
      cross: "\u2718",
      squareSmall: "\u25FB",
      squareSmallFilled: "\u25FC",
      circle: "\u25EF",
      circleFilled: "\u25C9",
      circleDotted: "\u25CC",
      circleDouble: "\u25CE",
      circleCircle: "\u24DE",
      circleCross: "\u24E7",
      circlePipe: "\u24BE",
      radioOn: "\u25C9",
      radioOff: "\u25EF",
      checkboxOn: "\u2612",
      checkboxOff: "\u2610",
      checkboxCircleOn: "\u24E7",
      checkboxCircleOff: "\u24BE",
      pointer: "\u276F",
      triangleUpOutline: "\u25B3",
      triangleLeft: "\u25C0",
      triangleRight: "\u25B6",
      lozenge: "\u25C6",
      lozengeOutline: "\u25C7",
      hamburger: "\u2630",
      smiley: "\u32E1",
      mustache: "\u0DF4",
      star: "\u2605",
      play: "\u25B6",
      nodejs: "\u2B22",
      oneSeventh: "\u2150",
      oneNinth: "\u2151",
      oneTenth: "\u2152"
    };
    specialFallbackSymbols = {
      tick: "\u221A",
      info: "i",
      warning: "\u203C",
      cross: "\xD7",
      squareSmall: "\u25A1",
      squareSmallFilled: "\u25A0",
      circle: "( )",
      circleFilled: "(*)",
      circleDotted: "( )",
      circleDouble: "( )",
      circleCircle: "(\u25CB)",
      circleCross: "(\xD7)",
      circlePipe: "(\u2502)",
      radioOn: "(*)",
      radioOff: "( )",
      checkboxOn: "[\xD7]",
      checkboxOff: "[ ]",
      checkboxCircleOn: "(\xD7)",
      checkboxCircleOff: "( )",
      pointer: ">",
      triangleUpOutline: "\u2206",
      triangleLeft: "\u25C4",
      triangleRight: "\u25BA",
      lozenge: "\u2666",
      lozengeOutline: "\u25CA",
      hamburger: "\u2261",
      smiley: "\u263A",
      mustache: "\u250C\u2500\u2510",
      star: "\u2736",
      play: "\u25BA",
      nodejs: "\u2666",
      oneSeventh: "1/7",
      oneNinth: "1/9",
      oneTenth: "1/10"
    };
    mainSymbols = {
      ...common,
      ...specialMainSymbols
    };
    fallbackSymbols = {
      ...common,
      ...specialFallbackSymbols
    };
    shouldUseMain = isUnicodeSupported();
    figures = shouldUseMain ? mainSymbols : fallbackSymbols;
    dist_default = figures;
    replacements = Object.entries(specialMainSymbols);
  }
});

// cli/node_modules/@inquirer/core/dist/lib/theme.js
import { styleText } from "node:util";
var defaultTheme;
var init_theme = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/theme.js"() {
    init_dist();
    defaultTheme = {
      prefix: {
        idle: styleText("blue", "?"),
        done: styleText("green", dist_default.tick)
      },
      spinner: {
        interval: 80,
        frames: ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"].map((frame) => styleText("yellow", frame))
      },
      style: {
        answer: (text) => styleText("cyan", text),
        message: (text) => styleText("bold", text),
        error: (text) => styleText("red", `> ${text}`),
        defaultAnswer: (text) => styleText("dim", `(${text})`),
        help: (text) => styleText("dim", text),
        highlight: (text) => styleText("cyan", text),
        key: (text) => styleText("cyan", styleText("bold", `<${text}>`))
      }
    };
  }
});

// cli/node_modules/@inquirer/core/dist/lib/make-theme.js
function isPlainObject(value) {
  if (typeof value !== "object" || value === null)
    return false;
  let proto2 = value;
  while (Object.getPrototypeOf(proto2) !== null) {
    proto2 = Object.getPrototypeOf(proto2);
  }
  return Object.getPrototypeOf(value) === proto2;
}
function deepMerge(...objects) {
  const output = {};
  for (const obj of objects) {
    for (const [key, value] of Object.entries(obj)) {
      const prevValue = output[key];
      output[key] = isPlainObject(prevValue) && isPlainObject(value) ? deepMerge(prevValue, value) : value;
    }
  }
  return output;
}
function makeTheme(...themes) {
  const themesToMerge = [
    defaultTheme,
    ...themes.filter((theme) => theme != null)
  ];
  return deepMerge(...themesToMerge);
}
var init_make_theme = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/make-theme.js"() {
    init_theme();
  }
});

// cli/node_modules/@inquirer/core/dist/lib/use-prefix.js
function usePrefix({ status = "idle", theme }) {
  const [showLoader, setShowLoader] = useState(false);
  const [tick, setTick] = useState(0);
  const { prefix, spinner } = makeTheme(theme);
  useEffect(() => {
    if (status === "loading") {
      let tickInterval;
      let inc = -1;
      const delayTimeout = setTimeout(() => {
        setShowLoader(true);
        tickInterval = setInterval(() => {
          inc = inc + 1;
          setTick(inc % spinner.frames.length);
        }, spinner.interval);
      }, 300);
      return () => {
        clearTimeout(delayTimeout);
        clearInterval(tickInterval);
      };
    } else {
      setShowLoader(false);
    }
  }, [status]);
  if (showLoader) {
    return spinner.frames[tick];
  }
  const iconName = status === "loading" ? "idle" : status;
  return typeof prefix === "string" ? prefix : prefix[iconName] ?? prefix["idle"];
}
var init_use_prefix = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/use-prefix.js"() {
    init_use_state();
    init_use_effect();
    init_make_theme();
  }
});

// cli/node_modules/@inquirer/core/dist/lib/use-memo.js
function useMemo(fn, dependencies) {
  return withPointer((pointer) => {
    const prev = pointer.get();
    if (!prev || prev.dependencies.length !== dependencies.length || prev.dependencies.some((dep, i) => dep !== dependencies[i])) {
      const value = fn();
      pointer.set({ value, dependencies });
      return value;
    }
    return prev.value;
  });
}
var init_use_memo = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/use-memo.js"() {
    init_hook_engine();
  }
});

// cli/node_modules/@inquirer/core/dist/lib/use-ref.js
function useRef(val) {
  return useState({ current: val })[0];
}
var init_use_ref = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/use-ref.js"() {
    init_use_state();
  }
});

// cli/node_modules/@inquirer/core/dist/lib/use-keypress.js
function useKeypress(userHandler) {
  const signal = useRef(userHandler);
  signal.current = userHandler;
  useEffect((rl) => {
    let ignore = false;
    const handler = withUpdates((_input, event) => {
      if (ignore)
        return;
      void signal.current(event, rl);
    });
    rl.input.on("keypress", handler);
    return () => {
      ignore = true;
      rl.input.removeListener("keypress", handler);
    };
  }, []);
}
var init_use_keypress = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/use-keypress.js"() {
    init_use_ref();
    init_use_effect();
    init_hook_engine();
  }
});

// cli/node_modules/cli-width/index.js
var require_cli_width = __commonJS({
  "cli/node_modules/cli-width/index.js"(exports, module) {
    "use strict";
    module.exports = cliWidth2;
    function normalizeOpts(options) {
      const defaultOpts = {
        defaultWidth: 0,
        output: process.stdout,
        tty: __require("tty")
      };
      if (!options) {
        return defaultOpts;
      }
      Object.keys(defaultOpts).forEach(function(key) {
        if (!options[key]) {
          options[key] = defaultOpts[key];
        }
      });
      return options;
    }
    function cliWidth2(options) {
      const opts = normalizeOpts(options);
      if (opts.output.getWindowSize) {
        return opts.output.getWindowSize()[0] || opts.defaultWidth;
      }
      if (opts.tty.getWindowSize) {
        return opts.tty.getWindowSize()[1] || opts.defaultWidth;
      }
      if (opts.output.columns) {
        return opts.output.columns;
      }
      if (process.env.CLI_WIDTH) {
        const width = parseInt(process.env.CLI_WIDTH, 10);
        if (!isNaN(width) && width !== 0) {
          return width;
        }
      }
      return opts.defaultWidth;
    }
  }
});

// cli/node_modules/fast-string-truncated-width/dist/utils.js
var getCodePointsLength, isFullWidth, isWideNotCJKTNotEmoji;
var init_utils = __esm({
  "cli/node_modules/fast-string-truncated-width/dist/utils.js"() {
    getCodePointsLength = /* @__PURE__ */ (() => {
      const SURROGATE_PAIR_RE = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
      return (input) => {
        let surrogatePairsNr = 0;
        SURROGATE_PAIR_RE.lastIndex = 0;
        while (SURROGATE_PAIR_RE.test(input)) {
          surrogatePairsNr += 1;
        }
        return input.length - surrogatePairsNr;
      };
    })();
    isFullWidth = (x) => {
      return x === 12288 || x >= 65281 && x <= 65376 || x >= 65504 && x <= 65510;
    };
    isWideNotCJKTNotEmoji = (x) => {
      return x === 8987 || x === 9001 || x >= 12272 && x <= 12287 || x >= 12289 && x <= 12350 || x >= 12441 && x <= 12543 || x >= 12549 && x <= 12591 || x >= 12593 && x <= 12686 || x >= 12688 && x <= 12771 || x >= 12783 && x <= 12830 || x >= 12832 && x <= 12871 || x >= 12880 && x <= 19903 || x >= 65040 && x <= 65049 || x >= 65072 && x <= 65106 || x >= 65108 && x <= 65126 || x >= 65128 && x <= 65131 || x >= 127488 && x <= 127490 || x >= 127504 && x <= 127547 || x >= 127552 && x <= 127560 || x >= 131072 && x <= 196605 || x >= 196608 && x <= 262141;
    };
  }
});

// cli/node_modules/fast-string-truncated-width/dist/index.js
var ANSI_RE, CONTROL_RE, CJKT_WIDE_RE, TAB_RE, EMOJI_RE, LATIN_RE, MODIFIER_RE, NO_TRUNCATION, getStringTruncatedWidth, dist_default2;
var init_dist2 = __esm({
  "cli/node_modules/fast-string-truncated-width/dist/index.js"() {
    init_utils();
    ANSI_RE = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]|\u001b\]8;[^;]*;.*?(?:\u0007|\u001b\u005c)/y;
    CONTROL_RE = /[\x00-\x08\x0A-\x1F\x7F-\x9F]{1,1000}/y;
    CJKT_WIDE_RE = /(?:(?![\uFF61-\uFF9F\uFF00-\uFFEF])[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Tangut}]){1,1000}/yu;
    TAB_RE = /\t{1,1000}/y;
    EMOJI_RE = new RegExp("[\\u{1F1E6}-\\u{1F1FF}]{2}|\\u{1F3F4}[\\u{E0061}-\\u{E007A}]{2}[\\u{E0030}-\\u{E0039}\\u{E0061}-\\u{E007A}]{1,3}\\u{E007F}|(?:\\p{Emoji}\\uFE0F\\u20E3?|\\p{Emoji_Modifier_Base}\\p{Emoji_Modifier}?|\\p{Emoji_Presentation})(?:\\u200D(?:\\p{Emoji_Modifier_Base}\\p{Emoji_Modifier}?|\\p{Emoji_Presentation}|\\p{Emoji}\\uFE0F\\u20E3?))*", "yu");
    LATIN_RE = /(?:[\x20-\x7E\xA0-\xFF](?!\uFE0F)){1,1000}/y;
    MODIFIER_RE = new RegExp("\\p{M}+", "gu");
    NO_TRUNCATION = { limit: Infinity, ellipsis: "" };
    getStringTruncatedWidth = (input, truncationOptions = {}, widthOptions = {}) => {
      const LIMIT = truncationOptions.limit ?? Infinity;
      const ELLIPSIS = truncationOptions.ellipsis ?? "";
      const ELLIPSIS_WIDTH = truncationOptions?.ellipsisWidth ?? (ELLIPSIS ? getStringTruncatedWidth(ELLIPSIS, NO_TRUNCATION, widthOptions).width : 0);
      const ANSI_WIDTH = 0;
      const CONTROL_WIDTH = widthOptions.controlWidth ?? 0;
      const TAB_WIDTH = widthOptions.tabWidth ?? 8;
      const EMOJI_WIDTH = widthOptions.emojiWidth ?? 2;
      const FULL_WIDTH_WIDTH = 2;
      const REGULAR_WIDTH = widthOptions.regularWidth ?? 1;
      const WIDE_WIDTH = widthOptions.wideWidth ?? FULL_WIDTH_WIDTH;
      const PARSE_BLOCKS = [
        [LATIN_RE, REGULAR_WIDTH],
        [ANSI_RE, ANSI_WIDTH],
        [CONTROL_RE, CONTROL_WIDTH],
        [TAB_RE, TAB_WIDTH],
        [EMOJI_RE, EMOJI_WIDTH],
        [CJKT_WIDE_RE, WIDE_WIDTH]
      ];
      let indexPrev = 0;
      let index = 0;
      let length = input.length;
      let lengthExtra = 0;
      let truncationEnabled = false;
      let truncationIndex = length;
      let truncationLimit = Math.max(0, LIMIT - ELLIPSIS_WIDTH);
      let unmatchedStart = 0;
      let unmatchedEnd = 0;
      let width = 0;
      let widthExtra = 0;
      outer: while (true) {
        if (unmatchedEnd > unmatchedStart || index >= length && index > indexPrev) {
          const unmatched = input.slice(unmatchedStart, unmatchedEnd) || input.slice(indexPrev, index);
          lengthExtra = 0;
          for (const char of unmatched.replaceAll(MODIFIER_RE, "")) {
            const codePoint = char.codePointAt(0) || 0;
            if (isFullWidth(codePoint)) {
              widthExtra = FULL_WIDTH_WIDTH;
            } else if (isWideNotCJKTNotEmoji(codePoint)) {
              widthExtra = WIDE_WIDTH;
            } else {
              widthExtra = REGULAR_WIDTH;
            }
            if (width + widthExtra > truncationLimit) {
              truncationIndex = Math.min(truncationIndex, Math.max(unmatchedStart, indexPrev) + lengthExtra);
            }
            if (width + widthExtra > LIMIT) {
              truncationEnabled = true;
              break outer;
            }
            lengthExtra += char.length;
            width += widthExtra;
          }
          unmatchedStart = unmatchedEnd = 0;
        }
        if (index >= length) {
          break outer;
        }
        for (let i = 0, l = PARSE_BLOCKS.length; i < l; i++) {
          const [BLOCK_RE, BLOCK_WIDTH] = PARSE_BLOCKS[i];
          BLOCK_RE.lastIndex = index;
          if (BLOCK_RE.test(input)) {
            lengthExtra = BLOCK_RE === CJKT_WIDE_RE ? getCodePointsLength(input.slice(index, BLOCK_RE.lastIndex)) : BLOCK_RE === EMOJI_RE ? 1 : BLOCK_RE.lastIndex - index;
            widthExtra = lengthExtra * BLOCK_WIDTH;
            if (width + widthExtra > truncationLimit) {
              truncationIndex = Math.min(truncationIndex, index + Math.floor((truncationLimit - width) / BLOCK_WIDTH));
            }
            if (width + widthExtra > LIMIT) {
              truncationEnabled = true;
              break outer;
            }
            width += widthExtra;
            unmatchedStart = indexPrev;
            unmatchedEnd = index;
            index = indexPrev = BLOCK_RE.lastIndex;
            continue outer;
          }
        }
        index += 1;
      }
      return {
        width: truncationEnabled ? truncationLimit : width,
        index: truncationEnabled ? truncationIndex : length,
        truncated: truncationEnabled,
        ellipsed: truncationEnabled && LIMIT >= ELLIPSIS_WIDTH
      };
    };
    dist_default2 = getStringTruncatedWidth;
  }
});

// cli/node_modules/fast-string-width/dist/index.js
var NO_TRUNCATION2, fastStringWidth, dist_default3;
var init_dist3 = __esm({
  "cli/node_modules/fast-string-width/dist/index.js"() {
    init_dist2();
    NO_TRUNCATION2 = {
      limit: Infinity,
      ellipsis: "",
      ellipsisWidth: 0
    };
    fastStringWidth = (input, options = {}) => {
      return dist_default2(input, NO_TRUNCATION2, options).width;
    };
    dist_default3 = fastStringWidth;
  }
});

// cli/node_modules/fast-wrap-ansi/lib/main.js
function wrapAnsi(string, columns, options) {
  return String(string).normalize().split(CRLF_OR_LF).map((line) => exec(line, columns, options)).join("\n");
}
var ESC, CSI, END_CODE, ANSI_ESCAPE_BELL, ANSI_CSI, ANSI_OSC, ANSI_SGR_TERMINATOR, ANSI_ESCAPE_LINK, GROUP_REGEX, getClosingCode, wrapAnsiCode, wrapAnsiHyperlink, wrapWord, stringVisibleTrimSpacesRight, exec, CRLF_OR_LF;
var init_main = __esm({
  "cli/node_modules/fast-wrap-ansi/lib/main.js"() {
    init_dist3();
    ESC = "\x1B";
    CSI = "\x9B";
    END_CODE = 39;
    ANSI_ESCAPE_BELL = "\x07";
    ANSI_CSI = "[";
    ANSI_OSC = "]";
    ANSI_SGR_TERMINATOR = "m";
    ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;
    GROUP_REGEX = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`, "y");
    getClosingCode = (openingCode) => {
      if (openingCode >= 30 && openingCode <= 37)
        return 39;
      if (openingCode >= 90 && openingCode <= 97)
        return 39;
      if (openingCode >= 40 && openingCode <= 47)
        return 49;
      if (openingCode >= 100 && openingCode <= 107)
        return 49;
      if (openingCode === 1 || openingCode === 2)
        return 22;
      if (openingCode === 3)
        return 23;
      if (openingCode === 4)
        return 24;
      if (openingCode === 7)
        return 27;
      if (openingCode === 8)
        return 28;
      if (openingCode === 9)
        return 29;
      if (openingCode === 0)
        return 0;
      return void 0;
    };
    wrapAnsiCode = (code) => `${ESC}${ANSI_CSI}${code}${ANSI_SGR_TERMINATOR}`;
    wrapAnsiHyperlink = (url) => `${ESC}${ANSI_ESCAPE_LINK}${url}${ANSI_ESCAPE_BELL}`;
    wrapWord = (rows, word, columns) => {
      const characters = word[Symbol.iterator]();
      let isInsideEscape = false;
      let isInsideLinkEscape = false;
      let lastRow = rows.at(-1);
      let visible = lastRow === void 0 ? 0 : dist_default3(lastRow);
      let currentCharacter = characters.next();
      let nextCharacter = characters.next();
      let rawCharacterIndex = 0;
      while (!currentCharacter.done) {
        const character = currentCharacter.value;
        const characterLength = dist_default3(character);
        if (visible + characterLength <= columns) {
          rows[rows.length - 1] += character;
        } else {
          rows.push(character);
          visible = 0;
        }
        if (character === ESC || character === CSI) {
          isInsideEscape = true;
          isInsideLinkEscape = word.startsWith(ANSI_ESCAPE_LINK, rawCharacterIndex + 1);
        }
        if (isInsideEscape) {
          if (isInsideLinkEscape) {
            if (character === ANSI_ESCAPE_BELL) {
              isInsideEscape = false;
              isInsideLinkEscape = false;
            }
          } else if (character === ANSI_SGR_TERMINATOR) {
            isInsideEscape = false;
          }
        } else {
          visible += characterLength;
          if (visible === columns && !nextCharacter.done) {
            rows.push("");
            visible = 0;
          }
        }
        currentCharacter = nextCharacter;
        nextCharacter = characters.next();
        rawCharacterIndex += character.length;
      }
      lastRow = rows.at(-1);
      if (!visible && lastRow !== void 0 && lastRow.length && rows.length > 1) {
        rows[rows.length - 2] += rows.pop();
      }
    };
    stringVisibleTrimSpacesRight = (string) => {
      const words = string.split(" ");
      let last = words.length;
      while (last) {
        if (dist_default3(words[last - 1])) {
          break;
        }
        last--;
      }
      if (last === words.length) {
        return string;
      }
      return words.slice(0, last).join(" ") + words.slice(last).join("");
    };
    exec = (string, columns, options = {}) => {
      if (options.trim !== false && string.trim() === "") {
        return "";
      }
      let returnValue = "";
      let escapeCode;
      let escapeUrl;
      const words = string.split(" ");
      let rows = [""];
      let rowLength = 0;
      for (let index = 0; index < words.length; index++) {
        const word = words[index];
        if (options.trim !== false) {
          const row = rows.at(-1) ?? "";
          const trimmed = row.trimStart();
          if (row.length !== trimmed.length) {
            rows[rows.length - 1] = trimmed;
            rowLength = dist_default3(trimmed);
          }
        }
        if (index !== 0) {
          if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
            rows.push("");
            rowLength = 0;
          }
          if (rowLength || options.trim === false) {
            rows[rows.length - 1] += " ";
            rowLength++;
          }
        }
        const wordLength = dist_default3(word);
        if (options.hard && wordLength > columns) {
          const remainingColumns = columns - rowLength;
          const breaksStartingThisLine = 1 + Math.floor((wordLength - remainingColumns - 1) / columns);
          const breaksStartingNextLine = Math.floor((wordLength - 1) / columns);
          if (breaksStartingNextLine < breaksStartingThisLine) {
            rows.push("");
          }
          wrapWord(rows, word, columns);
          rowLength = dist_default3(rows.at(-1) ?? "");
          continue;
        }
        if (rowLength + wordLength > columns && rowLength && wordLength) {
          if (options.wordWrap === false && rowLength < columns) {
            wrapWord(rows, word, columns);
            rowLength = dist_default3(rows.at(-1) ?? "");
            continue;
          }
          rows.push("");
          rowLength = 0;
        }
        if (rowLength + wordLength > columns && options.wordWrap === false) {
          wrapWord(rows, word, columns);
          rowLength = dist_default3(rows.at(-1) ?? "");
          continue;
        }
        rows[rows.length - 1] += word;
        rowLength += wordLength;
      }
      if (options.trim !== false) {
        rows = rows.map((row) => stringVisibleTrimSpacesRight(row));
      }
      const preString = rows.join("\n");
      let inSurrogate = false;
      for (let i = 0; i < preString.length; i++) {
        const character = preString[i];
        returnValue += character;
        if (!inSurrogate) {
          inSurrogate = character >= "\uD800" && character <= "\uDBFF";
          if (inSurrogate) {
            continue;
          }
        } else {
          inSurrogate = false;
        }
        if (character === ESC || character === CSI) {
          GROUP_REGEX.lastIndex = i + 1;
          const groupsResult = GROUP_REGEX.exec(preString);
          const groups = groupsResult?.groups;
          if (groups?.code !== void 0) {
            const code = Number.parseFloat(groups.code);
            escapeCode = code === END_CODE ? void 0 : code;
          } else if (groups?.uri !== void 0) {
            escapeUrl = groups.uri.length === 0 ? void 0 : groups.uri;
          }
        }
        if (preString[i + 1] === "\n") {
          if (escapeUrl) {
            returnValue += wrapAnsiHyperlink("");
          }
          const closingCode = escapeCode ? getClosingCode(escapeCode) : void 0;
          if (escapeCode && closingCode) {
            returnValue += wrapAnsiCode(closingCode);
          }
        } else if (character === "\n") {
          if (escapeCode && getClosingCode(escapeCode)) {
            returnValue += wrapAnsiCode(escapeCode);
          }
          if (escapeUrl) {
            returnValue += wrapAnsiHyperlink(escapeUrl);
          }
        }
      }
      return returnValue;
    };
    CRLF_OR_LF = /\r?\n/;
  }
});

// cli/node_modules/@inquirer/core/dist/lib/utils.js
function breakLines(content, width) {
  return content.split("\n").flatMap((line) => wrapAnsi(line, width, { trim: false, hard: true }).split("\n").map((str2) => str2.trimEnd())).join("\n");
}
function readlineWidth() {
  return (0, import_cli_width.default)({ defaultWidth: 80, output: readline().output });
}
var import_cli_width;
var init_utils2 = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/utils.js"() {
    import_cli_width = __toESM(require_cli_width(), 1);
    init_main();
    init_hook_engine();
  }
});

// cli/node_modules/@inquirer/core/dist/lib/pagination/use-pagination.js
function usePointerPosition({ active, renderedItems, pageSize, loop }) {
  const state = useRef({
    lastPointer: active,
    lastActive: void 0
  });
  const { lastPointer, lastActive } = state.current;
  const middle = Math.floor(pageSize / 2);
  const renderedLength = renderedItems.reduce((acc, item) => acc + item.length, 0);
  const defaultPointerPosition = renderedItems.slice(0, active).reduce((acc, item) => acc + item.length, 0);
  let pointer = defaultPointerPosition;
  if (renderedLength > pageSize) {
    if (loop) {
      pointer = lastPointer;
      if (
        // First render, skip this logic.
        lastActive != null && // Only move the pointer down when the user moves down.
        lastActive < active && // Check user didn't move up across page boundary.
        active - lastActive < pageSize
      ) {
        pointer = Math.min(
          // Furthest allowed position for the pointer is the middle of the list
          middle,
          Math.abs(active - lastActive) === 1 ? Math.min(
            // Move the pointer at most the height of the last active item.
            lastPointer + (renderedItems[lastActive]?.length ?? 0),
            // If the user moved by one item, move the pointer to the natural position of the active item as
            // long as it doesn't move the cursor up.
            Math.max(defaultPointerPosition, lastPointer)
          ) : (
            // Otherwise, move the pointer down by the difference between the active and last active item.
            lastPointer + active - lastActive
          )
        );
      }
    } else {
      const spaceUnderActive = renderedItems.slice(active).reduce((acc, item) => acc + item.length, 0);
      pointer = spaceUnderActive < pageSize - middle ? (
        // If the active item is near the end of the list, progressively move the cursor towards the end.
        pageSize - spaceUnderActive
      ) : (
        // Otherwise, progressively move the pointer to the middle of the list.
        Math.min(defaultPointerPosition, middle)
      );
    }
  }
  state.current.lastPointer = pointer;
  state.current.lastActive = active;
  return pointer;
}
function usePagination({ items, active, renderItem, pageSize, loop = true }) {
  const width = readlineWidth();
  const bound = (num) => (num % items.length + items.length) % items.length;
  const renderedItems = items.map((item, index) => {
    if (item == null)
      return [];
    return breakLines(renderItem({ item, index, isActive: index === active }), width).split("\n");
  });
  const renderedLength = renderedItems.reduce((acc, item) => acc + item.length, 0);
  const renderItemAtIndex = (index) => renderedItems[index] ?? [];
  const pointer = usePointerPosition({ active, renderedItems, pageSize, loop });
  const activeItem = renderItemAtIndex(active).slice(0, pageSize);
  const activeItemPosition = pointer + activeItem.length <= pageSize ? pointer : pageSize - activeItem.length;
  const pageBuffer = Array.from({ length: pageSize });
  pageBuffer.splice(activeItemPosition, activeItem.length, ...activeItem);
  const itemVisited = /* @__PURE__ */ new Set([active]);
  let bufferPointer = activeItemPosition + activeItem.length;
  let itemPointer = bound(active + 1);
  while (bufferPointer < pageSize && !itemVisited.has(itemPointer) && (loop && renderedLength > pageSize ? itemPointer !== active : itemPointer > active)) {
    const lines = renderItemAtIndex(itemPointer);
    const linesToAdd = lines.slice(0, pageSize - bufferPointer);
    pageBuffer.splice(bufferPointer, linesToAdd.length, ...linesToAdd);
    itemVisited.add(itemPointer);
    bufferPointer += linesToAdd.length;
    itemPointer = bound(itemPointer + 1);
  }
  bufferPointer = activeItemPosition - 1;
  itemPointer = bound(active - 1);
  while (bufferPointer >= 0 && !itemVisited.has(itemPointer) && (loop && renderedLength > pageSize ? itemPointer !== active : itemPointer < active)) {
    const lines = renderItemAtIndex(itemPointer);
    const linesToAdd = lines.slice(Math.max(0, lines.length - bufferPointer - 1));
    pageBuffer.splice(bufferPointer - linesToAdd.length + 1, linesToAdd.length, ...linesToAdd);
    itemVisited.add(itemPointer);
    bufferPointer -= linesToAdd.length;
    itemPointer = bound(itemPointer - 1);
  }
  return pageBuffer.filter((line) => typeof line === "string").join("\n");
}
var init_use_pagination = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/pagination/use-pagination.js"() {
    init_use_ref();
    init_utils2();
  }
});

// cli/node_modules/mute-stream/lib/index.js
var require_lib = __commonJS({
  "cli/node_modules/mute-stream/lib/index.js"(exports, module) {
    var Stream = __require("stream");
    var MuteStream2 = class extends Stream {
      #isTTY = null;
      constructor(opts = {}) {
        super(opts);
        this.writable = this.readable = true;
        this.muted = false;
        this.on("pipe", this._onpipe);
        this.replace = opts.replace;
        this._prompt = opts.prompt || null;
        this._hadControl = false;
      }
      #destSrc(key, def) {
        if (this._dest) {
          return this._dest[key];
        }
        if (this._src) {
          return this._src[key];
        }
        return def;
      }
      #proxy(method, ...args) {
        if (typeof this._dest?.[method] === "function") {
          this._dest[method](...args);
        }
        if (typeof this._src?.[method] === "function") {
          this._src[method](...args);
        }
      }
      get isTTY() {
        if (this.#isTTY !== null) {
          return this.#isTTY;
        }
        return this.#destSrc("isTTY", false);
      }
      // basically just get replace the getter/setter with a regular value
      set isTTY(val) {
        this.#isTTY = val;
      }
      get rows() {
        return this.#destSrc("rows");
      }
      get columns() {
        return this.#destSrc("columns");
      }
      mute() {
        this.muted = true;
      }
      unmute() {
        this.muted = false;
      }
      _onpipe(src) {
        this._src = src;
      }
      pipe(dest, options) {
        this._dest = dest;
        return super.pipe(dest, options);
      }
      pause() {
        if (this._src) {
          return this._src.pause();
        }
      }
      resume() {
        if (this._src) {
          return this._src.resume();
        }
      }
      write(c) {
        if (this.muted) {
          if (!this.replace) {
            return true;
          }
          if (c.match(/^\u001b/)) {
            if (c.indexOf(this._prompt) === 0) {
              c = c.slice(this._prompt.length);
              c = c.replace(/./g, this.replace);
              c = this._prompt + c;
            }
            this._hadControl = true;
            return this.emit("data", c);
          } else {
            if (this._prompt && this._hadControl && c.indexOf(this._prompt) === 0) {
              this._hadControl = false;
              this.emit("data", this._prompt);
              c = c.slice(this._prompt.length);
            }
            c = c.toString().replace(/./g, this.replace);
          }
        }
        this.emit("data", c);
      }
      end(c) {
        if (this.muted) {
          if (c && this.replace) {
            c = c.toString().replace(/./g, this.replace);
          } else {
            c = null;
          }
        }
        if (c) {
          this.emit("data", c);
        }
        this.emit("end");
      }
      destroy(...args) {
        return this.#proxy("destroy", ...args);
      }
      destroySoon(...args) {
        return this.#proxy("destroySoon", ...args);
      }
      close(...args) {
        return this.#proxy("close", ...args);
      }
    };
    module.exports = MuteStream2;
  }
});

// cli/node_modules/signal-exit/dist/mjs/signals.js
var signals;
var init_signals = __esm({
  "cli/node_modules/signal-exit/dist/mjs/signals.js"() {
    signals = [];
    signals.push("SIGHUP", "SIGINT", "SIGTERM");
    if (process.platform !== "win32") {
      signals.push(
        "SIGALRM",
        "SIGABRT",
        "SIGVTALRM",
        "SIGXCPU",
        "SIGXFSZ",
        "SIGUSR2",
        "SIGTRAP",
        "SIGSYS",
        "SIGQUIT",
        "SIGIOT"
        // should detect profiler and enable/disable accordingly.
        // see #21
        // 'SIGPROF'
      );
    }
    if (process.platform === "linux") {
      signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
    }
  }
});

// cli/node_modules/signal-exit/dist/mjs/index.js
var processOk, kExitEmitter, global, ObjectDefineProperty, Emitter, SignalExitBase, signalExitWrap, SignalExitFallback, SignalExit, process3, onExit, load, unload;
var init_mjs = __esm({
  "cli/node_modules/signal-exit/dist/mjs/index.js"() {
    init_signals();
    processOk = (process5) => !!process5 && typeof process5 === "object" && typeof process5.removeListener === "function" && typeof process5.emit === "function" && typeof process5.reallyExit === "function" && typeof process5.listeners === "function" && typeof process5.kill === "function" && typeof process5.pid === "number" && typeof process5.on === "function";
    kExitEmitter = Symbol.for("signal-exit emitter");
    global = globalThis;
    ObjectDefineProperty = Object.defineProperty.bind(Object);
    Emitter = class {
      emitted = {
        afterExit: false,
        exit: false
      };
      listeners = {
        afterExit: [],
        exit: []
      };
      count = 0;
      id = Math.random();
      constructor() {
        if (global[kExitEmitter]) {
          return global[kExitEmitter];
        }
        ObjectDefineProperty(global, kExitEmitter, {
          value: this,
          writable: false,
          enumerable: false,
          configurable: false
        });
      }
      on(ev, fn) {
        this.listeners[ev].push(fn);
      }
      removeListener(ev, fn) {
        const list = this.listeners[ev];
        const i = list.indexOf(fn);
        if (i === -1) {
          return;
        }
        if (i === 0 && list.length === 1) {
          list.length = 0;
        } else {
          list.splice(i, 1);
        }
      }
      emit(ev, code, signal) {
        if (this.emitted[ev]) {
          return false;
        }
        this.emitted[ev] = true;
        let ret = false;
        for (const fn of this.listeners[ev]) {
          ret = fn(code, signal) === true || ret;
        }
        if (ev === "exit") {
          ret = this.emit("afterExit", code, signal) || ret;
        }
        return ret;
      }
    };
    SignalExitBase = class {
    };
    signalExitWrap = (handler) => {
      return {
        onExit(cb, opts) {
          return handler.onExit(cb, opts);
        },
        load() {
          return handler.load();
        },
        unload() {
          return handler.unload();
        }
      };
    };
    SignalExitFallback = class extends SignalExitBase {
      onExit() {
        return () => {
        };
      }
      load() {
      }
      unload() {
      }
    };
    SignalExit = class extends SignalExitBase {
      // "SIGHUP" throws an `ENOSYS` error on Windows,
      // so use a supported signal instead
      /* c8 ignore start */
      #hupSig = process3.platform === "win32" ? "SIGINT" : "SIGHUP";
      /* c8 ignore stop */
      #emitter = new Emitter();
      #process;
      #originalProcessEmit;
      #originalProcessReallyExit;
      #sigListeners = {};
      #loaded = false;
      constructor(process5) {
        super();
        this.#process = process5;
        this.#sigListeners = {};
        for (const sig of signals) {
          this.#sigListeners[sig] = () => {
            const listeners = this.#process.listeners(sig);
            let { count } = this.#emitter;
            const p = process5;
            if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
              count += p.__signal_exit_emitter__.count;
            }
            if (listeners.length === count) {
              this.unload();
              const ret = this.#emitter.emit("exit", null, sig);
              const s = sig === "SIGHUP" ? this.#hupSig : sig;
              if (!ret)
                process5.kill(process5.pid, s);
            }
          };
        }
        this.#originalProcessReallyExit = process5.reallyExit;
        this.#originalProcessEmit = process5.emit;
      }
      onExit(cb, opts) {
        if (!processOk(this.#process)) {
          return () => {
          };
        }
        if (this.#loaded === false) {
          this.load();
        }
        const ev = opts?.alwaysLast ? "afterExit" : "exit";
        this.#emitter.on(ev, cb);
        return () => {
          this.#emitter.removeListener(ev, cb);
          if (this.#emitter.listeners["exit"].length === 0 && this.#emitter.listeners["afterExit"].length === 0) {
            this.unload();
          }
        };
      }
      load() {
        if (this.#loaded) {
          return;
        }
        this.#loaded = true;
        this.#emitter.count += 1;
        for (const sig of signals) {
          try {
            const fn = this.#sigListeners[sig];
            if (fn)
              this.#process.on(sig, fn);
          } catch (_) {
          }
        }
        this.#process.emit = (ev, ...a) => {
          return this.#processEmit(ev, ...a);
        };
        this.#process.reallyExit = (code) => {
          return this.#processReallyExit(code);
        };
      }
      unload() {
        if (!this.#loaded) {
          return;
        }
        this.#loaded = false;
        signals.forEach((sig) => {
          const listener = this.#sigListeners[sig];
          if (!listener) {
            throw new Error("Listener not defined for signal: " + sig);
          }
          try {
            this.#process.removeListener(sig, listener);
          } catch (_) {
          }
        });
        this.#process.emit = this.#originalProcessEmit;
        this.#process.reallyExit = this.#originalProcessReallyExit;
        this.#emitter.count -= 1;
      }
      #processReallyExit(code) {
        if (!processOk(this.#process)) {
          return 0;
        }
        this.#process.exitCode = code || 0;
        this.#emitter.emit("exit", this.#process.exitCode, null);
        return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
      }
      #processEmit(ev, ...args) {
        const og = this.#originalProcessEmit;
        if (ev === "exit" && processOk(this.#process)) {
          if (typeof args[0] === "number") {
            this.#process.exitCode = args[0];
          }
          const ret = og.call(this.#process, ev, ...args);
          this.#emitter.emit("exit", this.#process.exitCode, null);
          return ret;
        } else {
          return og.call(this.#process, ev, ...args);
        }
      }
    };
    process3 = globalThis.process;
    ({
      onExit: (
        /**
         * Called when the process is exiting, whether via signal, explicit
         * exit, or running out of stuff to do.
         *
         * If the global process object is not suitable for instrumentation,
         * then this will be a no-op.
         *
         * Returns a function that may be used to unload signal-exit.
         */
        onExit
      ),
      load: (
        /**
         * Load the listeners.  Likely you never need to call this, unless
         * doing a rather deep integration with signal-exit functionality.
         * Mostly exposed for the benefit of testing.
         *
         * @internal
         */
        load
      ),
      unload: (
        /**
         * Unload the listeners.  Likely you never need to call this, unless
         * doing a rather deep integration with signal-exit functionality.
         * Mostly exposed for the benefit of testing.
         *
         * @internal
         */
        unload
      )
    } = signalExitWrap(processOk(process3) ? new SignalExit(process3) : new SignalExitFallback()));
  }
});

// cli/node_modules/@inquirer/ansi/dist/index.js
var ESC2, cursorLeft, cursorHide, cursorShow, cursorUp, cursorDown, cursorTo, eraseLine, eraseLines;
var init_dist4 = __esm({
  "cli/node_modules/@inquirer/ansi/dist/index.js"() {
    ESC2 = "\x1B[";
    cursorLeft = ESC2 + "G";
    cursorHide = ESC2 + "?25l";
    cursorShow = ESC2 + "?25h";
    cursorUp = (rows = 1) => rows > 0 ? `${ESC2}${rows}A` : "";
    cursorDown = (rows = 1) => rows > 0 ? `${ESC2}${rows}B` : "";
    cursorTo = (x, y) => {
      if (typeof y === "number" && !Number.isNaN(y)) {
        return `${ESC2}${y + 1};${x + 1}H`;
      }
      return `${ESC2}${x + 1}G`;
    };
    eraseLine = ESC2 + "2K";
    eraseLines = (lines) => lines > 0 ? (eraseLine + cursorUp(1)).repeat(lines - 1) + eraseLine + cursorLeft : "";
  }
});

// cli/node_modules/@inquirer/core/dist/lib/screen-manager.js
import { stripVTControlCharacters } from "node:util";
var height, lastLine, ScreenManager;
var init_screen_manager = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/screen-manager.js"() {
    init_utils2();
    init_dist4();
    height = (content) => content.split("\n").length;
    lastLine = (content) => content.split("\n").pop() ?? "";
    ScreenManager = class {
      // These variables are keeping information to allow correct prompt re-rendering
      height = 0;
      extraLinesUnderPrompt = 0;
      cursorPos;
      rl;
      constructor(rl) {
        this.rl = rl;
        this.cursorPos = rl.getCursorPos();
      }
      write(content) {
        this.rl.output.unmute();
        this.rl.output.write(content);
        this.rl.output.mute();
      }
      render(content, bottomContent = "") {
        const promptLine = lastLine(content);
        const rawPromptLine = stripVTControlCharacters(promptLine);
        let prompt = rawPromptLine;
        if (this.rl.line.length > 0) {
          prompt = prompt.slice(0, -this.rl.line.length);
        }
        this.rl.setPrompt(prompt);
        this.cursorPos = this.rl.getCursorPos();
        const width = readlineWidth();
        content = breakLines(content, width);
        bottomContent = breakLines(bottomContent, width);
        if (rawPromptLine.length % width === 0) {
          content += "\n";
        }
        let output = content + (bottomContent ? "\n" + bottomContent : "");
        const promptLineUpDiff = Math.floor(rawPromptLine.length / width) - this.cursorPos.rows;
        const bottomContentHeight = promptLineUpDiff + (bottomContent ? height(bottomContent) : 0);
        if (bottomContentHeight > 0)
          output += cursorUp(bottomContentHeight);
        output += cursorTo(this.cursorPos.cols);
        this.write(cursorDown(this.extraLinesUnderPrompt) + eraseLines(this.height) + output);
        this.extraLinesUnderPrompt = bottomContentHeight;
        this.height = height(output);
      }
      checkCursorPos() {
        const cursorPos = this.rl.getCursorPos();
        if (cursorPos.cols !== this.cursorPos.cols) {
          this.write(cursorTo(cursorPos.cols));
          this.cursorPos = cursorPos;
        }
      }
      done({ clearContent }) {
        this.rl.setPrompt("");
        let output = cursorDown(this.extraLinesUnderPrompt);
        output += clearContent ? eraseLines(this.height) : "\n";
        output += cursorShow;
        this.write(output);
        this.rl.close();
      }
    };
  }
});

// cli/node_modules/@inquirer/core/dist/lib/promise-polyfill.js
var PromisePolyfill;
var init_promise_polyfill = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/promise-polyfill.js"() {
    PromisePolyfill = class extends Promise {
      // Available starting from Node 22
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers
      static withResolver() {
        let resolve3;
        let reject;
        const promise = new Promise((res, rej) => {
          resolve3 = res;
          reject = rej;
        });
        return { promise, resolve: resolve3, reject };
      }
    };
  }
});

// cli/node_modules/@inquirer/core/dist/lib/create-prompt.js
import * as readline2 from "node:readline";
import { AsyncResource as AsyncResource3 } from "node:async_hooks";
import path from "node:path";
function getCallSites() {
  const _prepareStackTrace = Error.prepareStackTrace;
  let result = [];
  try {
    Error.prepareStackTrace = (_, callSites) => {
      const callSitesWithoutCurrent = callSites.slice(1);
      result = callSitesWithoutCurrent;
      return callSitesWithoutCurrent;
    };
    new Error().stack;
  } catch {
    return result;
  }
  Error.prepareStackTrace = _prepareStackTrace;
  return result;
}
function createPrompt(view) {
  const callSites = getCallSites();
  const prompt = (config, context = {}) => {
    const { input = process.stdin, signal } = context;
    const cleanups = /* @__PURE__ */ new Set();
    const output = new import_mute_stream.default();
    output.pipe(context.output ?? process.stdout);
    const rl = readline2.createInterface({
      terminal: true,
      input,
      output
    });
    output.mute();
    const screen = new ScreenManager(rl);
    const { promise, resolve: resolve3, reject } = PromisePolyfill.withResolver();
    const cancel = () => reject(new CancelPromptError());
    if (signal) {
      const abort = () => reject(new AbortPromptError({ cause: signal.reason }));
      if (signal.aborted) {
        abort();
        return Object.assign(promise, { cancel });
      }
      signal.addEventListener("abort", abort);
      cleanups.add(() => signal.removeEventListener("abort", abort));
    }
    cleanups.add(onExit((code, signal2) => {
      reject(new ExitPromptError(`User force closed the prompt with ${code} ${signal2}`));
    }));
    const sigint = () => reject(new ExitPromptError(`User force closed the prompt with SIGINT`));
    rl.on("SIGINT", sigint);
    cleanups.add(() => rl.removeListener("SIGINT", sigint));
    return withHooks(rl, (cycle) => {
      const hooksCleanup = AsyncResource3.bind(() => effectScheduler.clearAll());
      rl.on("close", hooksCleanup);
      cleanups.add(() => rl.removeListener("close", hooksCleanup));
      const startCycle = () => {
        const checkCursorPos = () => screen.checkCursorPos();
        rl.input.on("keypress", checkCursorPos);
        cleanups.add(() => rl.input.removeListener("keypress", checkCursorPos));
        let pendingDone = null;
        cycle(() => {
          let effectsSettled = false;
          try {
            const nextView = view(config, (value) => {
              if (effectsSettled) {
                resolve3(value);
              } else {
                pendingDone = { value };
              }
            });
            if (nextView === void 0) {
              let callerFilename = callSites[1]?.getFileName();
              if (callerFilename && !callerFilename.startsWith("file://")) {
                callerFilename = path.resolve(callerFilename);
              }
              throw new Error(`Prompt functions must return a string.
    at ${callerFilename}`);
            }
            const [content, bottomContent] = typeof nextView === "string" ? [nextView] : nextView;
            screen.render(content, bottomContent);
            effectScheduler.run();
          } catch (error) {
            reject(error);
          }
          effectsSettled = true;
          if (pendingDone !== null) {
            const { value } = pendingDone;
            pendingDone = null;
            resolve3(value);
          }
        });
      };
      if ("readableFlowing" in input) {
        nativeSetImmediate(startCycle);
      } else {
        startCycle();
      }
      return Object.assign(promise.then((answer) => {
        effectScheduler.clearAll();
        return answer;
      }, (error) => {
        effectScheduler.clearAll();
        throw error;
      }).finally(() => {
        cleanups.forEach((cleanup) => cleanup());
        screen.done({ clearContent: Boolean(context.clearPromptOnDone) });
        output.end();
      }).then(() => promise), { cancel });
    });
  };
  return prompt;
}
var import_mute_stream, nativeSetImmediate;
var init_create_prompt = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/create-prompt.js"() {
    import_mute_stream = __toESM(require_lib(), 1);
    init_mjs();
    init_screen_manager();
    init_promise_polyfill();
    init_hook_engine();
    init_errors();
    nativeSetImmediate = globalThis.setImmediate;
  }
});

// cli/node_modules/@inquirer/core/dist/lib/Separator.js
import { styleText as styleText2 } from "node:util";
var Separator;
var init_Separator = __esm({
  "cli/node_modules/@inquirer/core/dist/lib/Separator.js"() {
    init_dist();
    Separator = class {
      separator = styleText2("dim", Array.from({ length: 15 }).join(dist_default.line));
      type = "separator";
      constructor(separator) {
        if (separator) {
          this.separator = separator;
        }
      }
      static isSeparator(choice) {
        return Boolean(choice && typeof choice === "object" && "type" in choice && choice.type === "separator");
      }
    };
  }
});

// cli/node_modules/@inquirer/core/dist/index.js
var init_dist5 = __esm({
  "cli/node_modules/@inquirer/core/dist/index.js"() {
    init_key();
    init_errors();
    init_use_prefix();
    init_use_state();
    init_use_effect();
    init_use_memo();
    init_use_ref();
    init_use_keypress();
    init_make_theme();
    init_use_pagination();
    init_create_prompt();
    init_Separator();
  }
});

// cli/node_modules/@inquirer/confirm/dist/index.js
function getBooleanValue(value, defaultValue) {
  let answer = defaultValue !== false;
  if (/^(y|yes)/i.test(value))
    answer = true;
  else if (/^(n|no)/i.test(value))
    answer = false;
  return answer;
}
function boolToString(value) {
  return value ? "Yes" : "No";
}
var dist_default4;
var init_dist6 = __esm({
  "cli/node_modules/@inquirer/confirm/dist/index.js"() {
    init_dist5();
    dist_default4 = createPrompt((config, done) => {
      const { transformer = boolToString } = config;
      const [status, setStatus] = useState("idle");
      const [value, setValue] = useState("");
      const theme = makeTheme(config.theme);
      const prefix = usePrefix({ status, theme });
      useKeypress((key, rl) => {
        if (status !== "idle")
          return;
        if (isEnterKey(key)) {
          const answer = getBooleanValue(value, config.default);
          setValue(transformer(answer));
          setStatus("done");
          done(answer);
        } else if (isTabKey(key)) {
          const answer = boolToString(!getBooleanValue(value, config.default));
          rl.clearLine(0);
          rl.write(answer);
          setValue(answer);
        } else {
          setValue(rl.line);
        }
      });
      let formattedValue = value;
      let defaultValue = "";
      if (status === "done") {
        formattedValue = theme.style.answer(value);
      } else {
        defaultValue = ` ${theme.style.defaultAnswer(config.default === false ? "y/N" : "Y/n")}`;
      }
      const message = theme.style.message(config.message, status);
      return `${prefix} ${message}${defaultValue} ${formattedValue}`;
    });
  }
});

// cli/node_modules/@inquirer/input/dist/index.js
var inputTheme, dist_default5;
var init_dist7 = __esm({
  "cli/node_modules/@inquirer/input/dist/index.js"() {
    init_dist5();
    inputTheme = {
      validationFailureMode: "keep"
    };
    dist_default5 = createPrompt((config, done) => {
      const { prefill = "tab" } = config;
      const theme = makeTheme(inputTheme, config.theme);
      const [status, setStatus] = useState("idle");
      const [defaultValue, setDefaultValue] = useState(String(config.default ?? ""));
      const [errorMsg, setError] = useState();
      const [value, setValue] = useState("");
      const prefix = usePrefix({ status, theme });
      async function validate(value2) {
        const { required, pattern, patternError = "Invalid input" } = config;
        if (required && !value2) {
          return "You must provide a value";
        }
        if (pattern && !pattern.test(value2)) {
          return patternError;
        }
        if (typeof config.validate === "function") {
          return await config.validate(value2) || "You must provide a valid value";
        }
        return true;
      }
      useKeypress(async (key, rl) => {
        if (status !== "idle") {
          return;
        }
        if (isEnterKey(key)) {
          const answer = value || defaultValue;
          setStatus("loading");
          const isValid = await validate(answer);
          if (isValid === true) {
            setValue(answer);
            setStatus("done");
            done(answer);
          } else {
            if (theme.validationFailureMode === "clear") {
              setValue("");
            } else {
              rl.write(value);
            }
            setError(isValid);
            setStatus("idle");
          }
        } else if (isBackspaceKey(key) && !value) {
          setDefaultValue("");
        } else if (isTabKey(key) && !value) {
          setDefaultValue("");
          rl.clearLine(0);
          rl.write(defaultValue);
          setValue(defaultValue);
        } else {
          setValue(rl.line);
          setError(void 0);
        }
      });
      useEffect((rl) => {
        if (prefill === "editable" && defaultValue) {
          rl.write(defaultValue);
          setValue(defaultValue);
        }
      }, []);
      const message = theme.style.message(config.message, status);
      let formattedValue = value;
      if (typeof config.transformer === "function") {
        formattedValue = config.transformer(value, { isFinal: status === "done" });
      } else if (status === "done") {
        formattedValue = theme.style.answer(value);
      }
      let defaultStr;
      if (defaultValue && status !== "done" && !value) {
        defaultStr = theme.style.defaultAnswer(defaultValue);
      }
      let error = "";
      if (errorMsg) {
        error = theme.style.error(errorMsg);
      }
      return [
        [prefix, message, defaultStr, formattedValue].filter((v) => v !== void 0).join(" "),
        error
      ];
    });
  }
});

// cli/node_modules/@inquirer/select/dist/index.js
import { styleText as styleText3 } from "node:util";
function isSelectable(item) {
  return !Separator.isSeparator(item) && !item.disabled;
}
function isNavigable(item) {
  return !Separator.isSeparator(item);
}
function normalizeChoices(choices) {
  return choices.map((choice) => {
    if (Separator.isSeparator(choice))
      return choice;
    if (typeof choice !== "object" || choice === null || !("value" in choice)) {
      const name2 = String(choice);
      return {
        value: choice,
        name: name2,
        short: name2,
        disabled: false
      };
    }
    const name = choice.name ?? String(choice.value);
    const normalizedChoice = {
      value: choice.value,
      name,
      short: choice.short ?? name,
      disabled: choice.disabled ?? false
    };
    if (choice.description) {
      normalizedChoice.description = choice.description;
    }
    return normalizedChoice;
  });
}
var selectTheme, dist_default6;
var init_dist8 = __esm({
  "cli/node_modules/@inquirer/select/dist/index.js"() {
    init_dist5();
    init_dist4();
    init_dist();
    selectTheme = {
      icon: { cursor: dist_default.pointer },
      style: {
        disabled: (text) => styleText3("dim", text),
        description: (text) => styleText3("cyan", text),
        keysHelpTip: (keys) => keys.map(([key, action]) => `${styleText3("bold", key)} ${styleText3("dim", action)}`).join(styleText3("dim", " \u2022 "))
      },
      i18n: { disabledError: "This option is disabled and cannot be selected." },
      indexMode: "hidden",
      keybindings: []
    };
    dist_default6 = createPrompt((config, done) => {
      const { loop = true, pageSize = 7 } = config;
      const theme = makeTheme(selectTheme, config.theme);
      const { keybindings } = theme;
      const [status, setStatus] = useState("idle");
      const prefix = usePrefix({ status, theme });
      const searchTimeoutRef = useRef();
      const searchEnabled = !keybindings.includes("vim");
      const items = useMemo(() => normalizeChoices(config.choices), [config.choices]);
      const bounds = useMemo(() => {
        const first = items.findIndex(isNavigable);
        const last = items.findLastIndex(isNavigable);
        if (first === -1) {
          throw new ValidationError("[select prompt] No selectable choices. All choices are disabled.");
        }
        return { first, last };
      }, [items]);
      const defaultItemIndex = useMemo(() => {
        if (!("default" in config))
          return -1;
        return items.findIndex((item) => isSelectable(item) && item.value === config.default);
      }, [config.default, items]);
      const [active, setActive] = useState(defaultItemIndex === -1 ? bounds.first : defaultItemIndex);
      const selectedChoice = items[active];
      if (selectedChoice == null || Separator.isSeparator(selectedChoice)) {
        throw new Error("Active index does not point to a choice");
      }
      const [errorMsg, setError] = useState();
      useKeypress((key, rl) => {
        clearTimeout(searchTimeoutRef.current);
        if (errorMsg) {
          setError(void 0);
        }
        if (isEnterKey(key)) {
          if (selectedChoice.disabled) {
            setError(theme.i18n.disabledError);
          } else {
            setStatus("done");
            done(selectedChoice.value);
          }
        } else if (isUpKey(key, keybindings) || isDownKey(key, keybindings)) {
          rl.clearLine(0);
          if (loop || isUpKey(key, keybindings) && active !== bounds.first || isDownKey(key, keybindings) && active !== bounds.last) {
            const offset = isUpKey(key, keybindings) ? -1 : 1;
            let next = active;
            do {
              next = (next + offset + items.length) % items.length;
            } while (!isNavigable(items[next]));
            setActive(next);
          }
        } else if (isNumberKey(key) && !Number.isNaN(Number(rl.line))) {
          const selectedIndex = Number(rl.line) - 1;
          let selectableIndex = -1;
          const position = items.findIndex((item2) => {
            if (Separator.isSeparator(item2))
              return false;
            selectableIndex++;
            return selectableIndex === selectedIndex;
          });
          const item = items[position];
          if (item != null && isSelectable(item)) {
            setActive(position);
          }
          searchTimeoutRef.current = setTimeout(() => {
            rl.clearLine(0);
          }, 700);
        } else if (isBackspaceKey(key)) {
          rl.clearLine(0);
        } else if (searchEnabled) {
          const searchTerm = rl.line.toLowerCase();
          const matchIndex = items.findIndex((item) => {
            if (Separator.isSeparator(item) || !isSelectable(item))
              return false;
            return item.name.toLowerCase().startsWith(searchTerm);
          });
          if (matchIndex !== -1) {
            setActive(matchIndex);
          }
          searchTimeoutRef.current = setTimeout(() => {
            rl.clearLine(0);
          }, 700);
        }
      });
      useEffect(() => () => {
        clearTimeout(searchTimeoutRef.current);
      }, []);
      const message = theme.style.message(config.message, status);
      const helpLine = theme.style.keysHelpTip([
        ["\u2191\u2193", "navigate"],
        ["\u23CE", "select"]
      ]);
      let separatorCount = 0;
      const page = usePagination({
        items,
        active,
        renderItem({ item, isActive, index }) {
          if (Separator.isSeparator(item)) {
            separatorCount++;
            return ` ${item.separator}`;
          }
          const cursor = isActive ? theme.icon.cursor : " ";
          const indexLabel = theme.indexMode === "number" ? `${index + 1 - separatorCount}. ` : "";
          if (item.disabled) {
            const disabledLabel = typeof item.disabled === "string" ? item.disabled : "(disabled)";
            const disabledCursor = isActive ? theme.icon.cursor : "-";
            return theme.style.disabled(`${disabledCursor} ${indexLabel}${item.name} ${disabledLabel}`);
          }
          const color = isActive ? theme.style.highlight : (x) => x;
          return color(`${cursor} ${indexLabel}${item.name}`);
        },
        pageSize,
        loop
      });
      if (status === "done") {
        return [prefix, message, theme.style.answer(selectedChoice.short)].filter(Boolean).join(" ");
      }
      const { description } = selectedChoice;
      const lines = [
        [prefix, message].filter(Boolean).join(" "),
        page,
        " ",
        description ? theme.style.description(description) : "",
        errorMsg ? theme.style.error(errorMsg) : "",
        helpLine
      ].filter(Boolean).join("\n").trimEnd();
      return `${lines}${cursorHide}`;
    });
  }
});

// cli/node_modules/@inquirer/prompts/dist/index.js
var init_dist9 = __esm({
  "cli/node_modules/@inquirer/prompts/dist/index.js"() {
    init_dist6();
    init_dist7();
    init_dist8();
  }
});

// cli/src/framework/errors.ts
var RadorchError, UserError, SystemError;
var init_errors2 = __esm({
  "cli/src/framework/errors.ts"() {
    "use strict";
    RadorchError = class extends Error {
      constructor(message) {
        super(message);
        this.name = new.target.name;
      }
    };
    UserError = class extends RadorchError {
      type = "user_error";
    };
    SystemError = class extends RadorchError {
      type = "system_error";
    };
  }
});

// cli/src/framework/prompter.ts
function createPrompter(opts) {
  function gate(missing) {
    throw new UserError(`Missing required input "${missing}". Re-run with the matching flag or in an interactive terminal.`);
  }
  const allowed = opts.isTTY && !opts.nonInteractive;
  return {
    async input(o) {
      if (!allowed) gate(o.message);
      return dist_default5({ message: o.message, default: o.default }, { output: process.stderr });
    },
    async confirm(o) {
      if (!allowed) gate(o.message);
      return dist_default4({ message: o.message, default: o.defaultValue }, { output: process.stderr });
    },
    async select(o) {
      if (!allowed) gate(o.message);
      const choice = await dist_default6({ message: o.message, choices: o.choices.map((c) => ({ value: c, name: c })), default: o.default }, { output: process.stderr });
      return choice;
    }
  };
}
var init_prompter = __esm({
  "cli/src/framework/prompter.ts"() {
    "use strict";
    init_dist9();
    init_errors2();
  }
});

// cli/node_modules/chalk/source/vendor/ansi-styles/index.js
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ANSI_BACKGROUND_OFFSET, wrapAnsi16, wrapAnsi256, wrapAnsi16m, styles, modifierNames, foregroundColorNames, backgroundColorNames, colorNames, ansiStyles, ansi_styles_default;
var init_ansi_styles = __esm({
  "cli/node_modules/chalk/source/vendor/ansi-styles/index.js"() {
    ANSI_BACKGROUND_OFFSET = 10;
    wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
    wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
    wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
    styles = {
      modifier: {
        reset: [0, 0],
        // 21 isn't widely supported and 22 does the same thing
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        overline: [53, 55],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        // Bright color
        blackBright: [90, 39],
        gray: [90, 39],
        // Alias of `blackBright`
        grey: [90, 39],
        // Alias of `blackBright`
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39]
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        // Bright color
        bgBlackBright: [100, 49],
        bgGray: [100, 49],
        // Alias of `bgBlackBright`
        bgGrey: [100, 49],
        // Alias of `bgBlackBright`
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49]
      }
    };
    modifierNames = Object.keys(styles.modifier);
    foregroundColorNames = Object.keys(styles.color);
    backgroundColorNames = Object.keys(styles.bgColor);
    colorNames = [...foregroundColorNames, ...backgroundColorNames];
    ansiStyles = assembleStyles();
    ansi_styles_default = ansiStyles;
  }
});

// cli/node_modules/chalk/source/vendor/supports-color/index.js
import process4 from "node:process";
import os from "node:os";
import tty from "node:tty";
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : process4.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (process4.platform === "win32") {
    const osRelease = os.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((key) => key in env)) {
      return 3;
    }
    if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if (env.TERM === "xterm-ghostty") {
    return 3;
  }
  if (env.TERM === "wezterm") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var env, flagForceColor, supportsColor, supports_color_default;
var init_supports_color = __esm({
  "cli/node_modules/chalk/source/vendor/supports-color/index.js"() {
    ({ env } = process4);
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      flagForceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      flagForceColor = 1;
    }
    supportsColor = {
      stdout: createSupportsColor({ isTTY: tty.isatty(1) }),
      stderr: createSupportsColor({ isTTY: tty.isatty(2) })
    };
    supports_color_default = supportsColor;
  }
});

// cli/node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
var init_utilities = __esm({
  "cli/node_modules/chalk/source/utilities.js"() {
  }
});

// cli/node_modules/chalk/source/index.js
function createChalk(options) {
  return chalkFactory(options);
}
var stdoutColor, stderrColor, GENERATOR, STYLER, IS_EMPTY, levelMapping, styles2, applyOptions, Chalk, chalkFactory, getModelAnsi, usedModels, proto, createStyler, createBuilder, applyStyle, chalk, chalkStderr;
var init_source = __esm({
  "cli/node_modules/chalk/source/index.js"() {
    init_ansi_styles();
    init_supports_color();
    init_utilities();
    ({ stdout: stdoutColor, stderr: stderrColor } = supports_color_default);
    GENERATOR = Symbol("GENERATOR");
    STYLER = Symbol("STYLER");
    IS_EMPTY = Symbol("IS_EMPTY");
    levelMapping = [
      "ansi",
      "ansi",
      "ansi256",
      "ansi16m"
    ];
    styles2 = /* @__PURE__ */ Object.create(null);
    applyOptions = (object, options = {}) => {
      if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
        throw new Error("The `level` option should be an integer from 0 to 3");
      }
      const colorLevel = stdoutColor ? stdoutColor.level : 0;
      object.level = options.level === void 0 ? colorLevel : options.level;
    };
    Chalk = class {
      constructor(options) {
        return chalkFactory(options);
      }
    };
    chalkFactory = (options) => {
      const chalk2 = (...strings) => strings.join(" ");
      applyOptions(chalk2, options);
      Object.setPrototypeOf(chalk2, createChalk.prototype);
      return chalk2;
    };
    Object.setPrototypeOf(createChalk.prototype, Function.prototype);
    for (const [styleName, style] of Object.entries(ansi_styles_default)) {
      styles2[styleName] = {
        get() {
          const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
          Object.defineProperty(this, styleName, { value: builder });
          return builder;
        }
      };
    }
    styles2.visible = {
      get() {
        const builder = createBuilder(this, this[STYLER], true);
        Object.defineProperty(this, "visible", { value: builder });
        return builder;
      }
    };
    getModelAnsi = (model, level, type2, ...arguments_) => {
      if (model === "rgb") {
        if (level === "ansi16m") {
          return ansi_styles_default[type2].ansi16m(...arguments_);
        }
        if (level === "ansi256") {
          return ansi_styles_default[type2].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
        }
        return ansi_styles_default[type2].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
      }
      if (model === "hex") {
        return getModelAnsi("rgb", level, type2, ...ansi_styles_default.hexToRgb(...arguments_));
      }
      return ansi_styles_default[type2][model](...arguments_);
    };
    usedModels = ["rgb", "hex", "ansi256"];
    for (const model of usedModels) {
      styles2[model] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
            return createBuilder(this, styler, this[IS_EMPTY]);
          };
        }
      };
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles2[bgModel] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
            return createBuilder(this, styler, this[IS_EMPTY]);
          };
        }
      };
    }
    proto = Object.defineProperties(() => {
    }, {
      ...styles2,
      level: {
        enumerable: true,
        get() {
          return this[GENERATOR].level;
        },
        set(level) {
          this[GENERATOR].level = level;
        }
      }
    });
    createStyler = (open, close, parent) => {
      let openAll;
      let closeAll;
      if (parent === void 0) {
        openAll = open;
        closeAll = close;
      } else {
        openAll = parent.openAll + open;
        closeAll = close + parent.closeAll;
      }
      return {
        open,
        close,
        openAll,
        closeAll,
        parent
      };
    };
    createBuilder = (self, _styler, _isEmpty) => {
      const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
      Object.setPrototypeOf(builder, proto);
      builder[GENERATOR] = self;
      builder[STYLER] = _styler;
      builder[IS_EMPTY] = _isEmpty;
      return builder;
    };
    applyStyle = (self, string) => {
      if (self.level <= 0 || !string) {
        return self[IS_EMPTY] ? "" : string;
      }
      let styler = self[STYLER];
      if (styler === void 0) {
        return string;
      }
      const { openAll, closeAll } = styler;
      if (string.includes("\x1B")) {
        while (styler !== void 0) {
          string = stringReplaceAll(string, styler.close, styler.open);
          styler = styler.parent;
        }
      }
      const lfIndex = string.indexOf("\n");
      if (lfIndex !== -1) {
        string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
      }
      return openAll + string + closeAll;
    };
    Object.defineProperties(createChalk.prototype, styles2);
    chalk = createChalk();
    chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
  }
});

// cli/src/framework/theme.ts
function makeTheme2(opts) {
  if (opts.noColor) {
    return { banner: identity, heading: identity, success: identity, warning: identity, error: identity, hint: identity };
  }
  const chalk2 = new Chalk({ level: 3 });
  return {
    banner: (s) => chalk2.greenBright.bold(s),
    heading: (s) => chalk2.greenBright.bold(s),
    success: (s) => chalk2.greenBright(s),
    warning: (s) => chalk2.yellowBright(s),
    error: (s) => chalk2.red(s),
    hint: (s) => chalk2.dim(s)
  };
}
var identity;
var init_theme2 = __esm({
  "cli/src/framework/theme.ts"() {
    "use strict";
    init_source();
    identity = (s) => s;
  }
});

// cli/src/framework/logger/file-sink.ts
import fs from "node:fs/promises";
import path2 from "node:path";
function createFileSink(opts) {
  const env2 = opts.env ?? process.env;
  const disabled = env2["RADORCH_NO_LOG"] === "1";
  async function rotateIfNeeded() {
    let stat;
    try {
      stat = await fs.stat(opts.file);
    } catch {
      return;
    }
    if (stat.size < opts.maxBytes) return;
    for (let i = opts.maxFiles - 1; i >= 1; i--) {
      const src = `${opts.file}.${i}`;
      const dst = `${opts.file}.${i + 1}`;
      try {
        await fs.rename(src, dst);
      } catch {
      }
    }
    try {
      await fs.rename(opts.file, `${opts.file}.1`);
    } catch {
    }
    try {
      await fs.unlink(`${opts.file}.${opts.maxFiles + 1}`);
    } catch {
    }
  }
  return {
    async write(entry) {
      if (disabled) return;
      if (opts.requireDirExists) {
        try {
          await fs.stat(path2.dirname(opts.file));
        } catch {
          return;
        }
      } else {
        await fs.mkdir(path2.dirname(opts.file), { recursive: true });
      }
      await rotateIfNeeded();
      await fs.appendFile(opts.file, JSON.stringify(entry) + "\n", "utf8");
    },
    async flush() {
    }
  };
}
var init_file_sink = __esm({
  "cli/src/framework/logger/file-sink.ts"() {
    "use strict";
  }
});

// cli/src/framework/logger/types.ts
var LOG_LEVELS;
var init_types = __esm({
  "cli/src/framework/logger/types.ts"() {
    "use strict";
    LOG_LEVELS = ["error", "warn", "info", "debug"];
  }
});

// cli/src/framework/logger/logger.ts
function resolveLogLevel(env2 = process.env, fallback = "info") {
  const raw = env2["RADORCH_LOG_LEVEL"];
  if (raw && LOG_LEVELS.includes(raw)) return raw;
  return fallback;
}
function createLogger(opts) {
  async function emit2(level, message, payload = {}) {
    if (RANK[level] > RANK[opts.level]) return;
    const entry = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      level,
      source: opts.source,
      ...payload,
      message
    };
    await opts.sink.write(entry);
  }
  return {
    error: (m, p) => emit2("error", m, p),
    warn: (m, p) => emit2("warn", m, p),
    info: (m, p) => emit2("info", m, p),
    debug: (m, p) => emit2("debug", m, p),
    flush: () => opts.sink.flush()
  };
}
var RANK;
var init_logger = __esm({
  "cli/src/framework/logger/logger.ts"() {
    "use strict";
    init_types();
    RANK = { error: 0, warn: 1, info: 2, debug: 3 };
  }
});

// cli/src/framework/output.ts
function validateEnvelope(env2) {
  if (!env2 || typeof env2 !== "object") throw new Error("envelope must be an object");
  const e = env2;
  if (typeof e["ok"] !== "boolean") throw new Error("envelope missing boolean `ok`");
  if (e["ok"] === true) {
    if (!("data" in e)) throw new Error("success envelope must carry `data`");
    if ("error" in e) throw new Error("success envelope must not carry `error` (data xor error)");
    if ("exit_code" in e && typeof e["exit_code"] !== "number") {
      throw new Error("success envelope `exit_code` must be a number when present");
    }
  } else {
    if (!("error" in e) || !e["error"] || typeof e["error"] !== "object") {
      throw new Error("failure envelope must carry an `error` object");
    }
    const err = e["error"];
    if (typeof err["message"] !== "string") throw new Error("error.message must be a string");
    if (!ALLOWED_ERROR_TYPES.includes(err["type"])) {
      throw new Error(`error.type must be one of ${ALLOWED_ERROR_TYPES.join(" | ")}`);
    }
    if ("data" in e) {
      const d = e["data"];
      if (!d || typeof d !== "object") {
        throw new Error("failure envelope `data` must be an object when present");
      }
      const dRec = d;
      if (typeof dRec["event"] !== "string") {
        throw new Error("failure envelope `data.event` must be a string when `data` is present");
      }
      if ("field" in dRec && dRec["field"] !== void 0 && typeof dRec["field"] !== "string") {
        throw new Error("failure envelope `data.field` must be a string when present");
      }
    }
  }
}
function emit(env2) {
  validateEnvelope(env2);
  console.log(JSON.stringify(env2));
}
var ALLOWED_ERROR_TYPES;
var init_output = __esm({
  "cli/src/framework/output.ts"() {
    "use strict";
    ALLOWED_ERROR_TYPES = ["user_error", "system_error"];
  }
});

// cli/src/framework/exit-codes.ts
var ExitCode;
var init_exit_codes = __esm({
  "cli/src/framework/exit-codes.ts"() {
    "use strict";
    ExitCode = {
      Success: 0,
      UserError: 1,
      SystemError: 2
    };
  }
});

// cli/src/lib/paths.ts
import os2 from "node:os";
import path3 from "node:path";
function userDataPaths() {
  const root = path3.join(os2.homedir(), ".radorch");
  return {
    root,
    installJson: path3.join(root, "install.json"),
    orchestrationYml: path3.join(root, "orchestration.yml"),
    ui: path3.join(root, "ui"),
    templates: path3.join(root, "templates"),
    projects: path3.join(root, "projects"),
    logs: path3.join(root, "logs"),
    runtime: path3.join(root, "runtime"),
    bootstrapLock: path3.join(root, "runtime", "bootstrap.lock")
  };
}
function resolveInstallRoot() {
  return path3.join(os2.homedir(), ".radorch");
}
function installPaths(root) {
  const join6 = path3.join;
  return {
    root,
    installJson: join6(root, "install.json"),
    gitignore: join6(root, ".gitignore"),
    projectsDir: join6(root, "projects"),
    worktreesDir: join6(root, "worktrees"),
    logsDir: join6(root, "logs"),
    cliLog: join6(root, "logs", "cli.log"),
    harnessesDir: join6(root, "runtime", "harnesses"),
    runtimeDir: join6(root, "runtime"),
    uiPidFile: join6(root, "runtime", "ui.pid"),
    uiLog: join6(root, "logs", "ui.log")
  };
}
var init_paths = __esm({
  "cli/src/lib/paths.ts"() {
    "use strict";
  }
});

// cli/src/lib/fs-helpers.ts
import fs2 from "node:fs/promises";
import path4 from "node:path";
async function ensureDir(dir) {
  await fs2.mkdir(dir, { recursive: true });
}
async function writeFileAtomic(file, content) {
  await ensureDir(path4.dirname(file));
  const tmp = `${file}.tmp-${process.pid}-${Date.now()}`;
  await fs2.writeFile(tmp, content, "utf8");
  await fs2.rename(tmp, file);
}
async function pathExists(target) {
  try {
    await fs2.stat(target);
    return true;
  } catch {
    return false;
  }
}
var init_fs_helpers = __esm({
  "cli/src/lib/fs-helpers.ts"() {
    "use strict";
  }
});

// cli/src/lib/config.ts
import fs3 from "node:fs/promises";
async function readInstallJson(file) {
  const text = await fs3.readFile(file, "utf8");
  const parsed = JSON.parse(text);
  if ("state_schema_version" in parsed) delete parsed.state_schema_version;
  if (typeof parsed.harnesses !== "object" || parsed.harnesses === null) {
    return { harnesses: {} };
  }
  return parsed;
}
async function writeInstallJson(file, value) {
  const sanitized = { ...value };
  delete sanitized.state_schema_version;
  await writeFileAtomic(file, JSON.stringify(sanitized, null, 2) + "\n");
}
var init_config = __esm({
  "cli/src/lib/config.ts"() {
    "use strict";
    init_fs_helpers();
  }
});

// cli/src/lib/install-json.ts
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
    } else if (typeof x === "number") {
      return 1;
    } else if (typeof y === "number") {
      return -1;
    } else if (x !== y) {
      return x < y ? -1 : 1;
    }
  }
  return 0;
}
function readLastWriterVersion(ij) {
  let latest;
  for (const entry of Object.values(ij.harnesses)) {
    if (!entry) continue;
    if (!latest || cmpSemver(entry.last_writer_version, latest) > 0) {
      latest = entry.last_writer_version;
    }
  }
  return latest;
}
async function stampLastWriter(installJsonPath, version) {
  if (!await pathExists(installJsonPath)) return;
  const ij = await readInstallJson(installJsonPath);
  let mutated = false;
  for (const key of Object.keys(ij.harnesses)) {
    const entry = ij.harnesses[key];
    if (!entry) continue;
    if (!entry.last_writer_version || cmpSemver(version, entry.last_writer_version) >= 0) {
      entry.last_writer_version = version;
      mutated = true;
    }
  }
  if (mutated) await writeInstallJson(installJsonPath, ij);
}
async function checkVersionSkew(opts) {
  if (!await pathExists(opts.installJsonPath)) return { ok: true };
  const ij = await readInstallJson(opts.installJsonPath);
  const lastWriter = readLastWriterVersion(ij);
  if (!lastWriter) return { ok: true };
  if (cmpSemver(opts.localVersion, lastWriter) < 0) {
    return {
      ok: false,
      message: `state was last written by radorch ${lastWriter} in another harness's plugin; this plugin has ${opts.localVersion} \u2014 update via /plugin update rad-orchestration in the harness that wrote it`
    };
  }
  return { ok: true };
}
var INSTALL_KEYS;
var init_install_json = __esm({
  "cli/src/lib/install-json.ts"() {
    "use strict";
    init_config();
    init_fs_helpers();
    INSTALL_KEYS = ["claude", "claude-plugin", "copilot-cli", "copilot-cli-plugin", "copilot-vscode", "copilot-vscode-plugin"];
  }
});

// cli/src/lib/package-version.ts
function getCliVersion() {
  return "1.0.0-alpha.9";
}
var init_package_version = __esm({
  "cli/src/lib/package-version.ts"() {
    "use strict";
  }
});

// cli/src/framework/command.ts
function pickLogLevel(flag, env2) {
  if (flag && LOG_LEVELS.includes(flag)) return flag;
  return resolveLogLevel(env2);
}
function defineCommand(def) {
  return def;
}
async function runCommand(def, opts) {
  const cmd = new Command(def.name).description(def.description).exitOverride();
  cmd.option("--non-interactive", "disable prompts");
  cmd.option("--json", "force machine-readable output");
  cmd.option("--no-color", "disable ANSI color");
  cmd.option("--log-level <level>", "log level (error|warn|info|debug)");
  for (const [name, spec] of Object.entries(def.args)) {
    cmd.option(`--${name} <value>`, spec.description, spec.default);
  }
  for (const [name, spec] of Object.entries(def.flags)) {
    if (spec.type === "string") cmd.option(`--${name} <value>`, spec.description, spec.default);
    else cmd.option(`--${name}`, spec.description);
  }
  const start = Date.now();
  const noColorEnv = opts.env["NO_COLOR"] !== void 0 && opts.env["NO_COLOR"] !== "";
  const ux = {
    isTTY: opts.isTTY,
    nonInteractive: false,
    noColor: noColorEnv || !opts.isTTY,
    json: false
  };
  const installRoot = resolveInstallRoot();
  const paths = installPaths(installRoot);
  if (def.name !== "install") {
    const skew = await checkVersionSkew({ installJsonPath: paths.installJson, localVersion: pkg.version });
    if (!skew.ok) {
      emit({ ok: false, error: { type: "user_error", message: skew.message } });
      process.exit(ExitCode.UserError);
      return;
    }
  }
  const sink = createFileSink({
    file: paths.cliLog,
    maxBytes: 10 * 1024 * 1024,
    maxFiles: 5,
    env: opts.env,
    requireDirExists: true
  });
  let logger = createLogger({ level: resolveLogLevel(opts.env), sink, source: "cli" });
  try {
    cmd.parse(opts.argv, { from: "user" });
    const parsed = cmd.opts();
    ux.nonInteractive = Boolean(parsed["nonInteractive"]);
    ux.json = Boolean(parsed["json"]);
    ux.noColor = ux.noColor || parsed["color"] === false;
    logger = createLogger({ level: pickLogLevel(parsed["logLevel"], opts.env), sink, source: "cli" });
    const argsResult = {};
    const allowedToPrompt = ux.isTTY && !ux.nonInteractive && !ux.json;
    const prompter = createPrompter({ isTTY: ux.isTTY, nonInteractive: ux.nonInteractive || ux.json });
    for (const [name, spec] of Object.entries(def.args)) {
      const camel = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      let value = parsed[camel] ?? parsed[name];
      if (value === void 0 && spec.required) {
        if (allowedToPrompt) {
          value = await prompter.input({ message: `${name}: ${spec.description}`, default: spec.default });
        } else {
          throw new UserError(`Missing required argument --${name} (${spec.description}). Supply --${name}=<value> or run interactively.`);
        }
      }
      argsResult[name] = value ?? spec.default;
    }
    const flagsResult = {};
    for (const name of Object.keys(def.flags)) {
      const camel = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      flagsResult[name] = parsed[camel] ?? parsed[name];
    }
    const ctx = {
      env: opts.env,
      stderr: opts.stderr,
      logger,
      prompter,
      theme: makeTheme2({ noColor: ux.noColor }),
      ux
    };
    const result = await def.handler({ args: argsResult, flags: flagsResult, ctx });
    const envelope = def.mapResult ? def.mapResult(result) : { ok: true, data: result };
    await logger.info("command_complete", {
      command: def.name,
      args: argsResult,
      duration_ms: Date.now() - start,
      result: envelope.ok ? "ok" : "fail"
    });
    await logger.flush();
    emit(envelope);
    const overrideExit = envelope.ok && typeof envelope.exit_code === "number" ? envelope.exit_code : void 0;
    const exitCode = overrideExit !== void 0 ? overrideExit : envelope.ok ? ExitCode.Success : envelope.error?.type === "user_error" ? ExitCode.UserError : ExitCode.SystemError;
    if (envelope.ok && def.name !== "install") {
      try {
        await stampLastWriter(paths.installJson, pkg.version);
      } catch {
      }
    }
    process.exit(exitCode);
  } catch (e) {
    if (e instanceof CommanderError) {
      if (e.code === "commander.helpDisplayed" || e.code === "commander.help" || e.code === "commander.version") {
        await logger.flush();
        process.exit(0);
        return;
      }
      const userErr = new UserError(e.message);
      await logger.error("command_failed", {
        command: def.name,
        duration_ms: Date.now() - start,
        error: { type: userErr.type, message: userErr.message }
      });
      await logger.flush();
      emit({ ok: false, error: { type: userErr.type, message: userErr.message } });
      process.exit(ExitCode.UserError);
      return;
    }
    const err = e instanceof RadorchError ? e : new SystemError(e instanceof Error ? e.message : String(e));
    await logger.error("command_failed", {
      command: def.name,
      duration_ms: Date.now() - start,
      error: { type: err.type, message: err.message }
    });
    await logger.flush();
    emit({ ok: false, error: { type: err.type, message: err.message } });
    process.exit(err.type === "user_error" ? ExitCode.UserError : ExitCode.SystemError);
  }
}
var pkg;
var init_command = __esm({
  "cli/src/framework/command.ts"() {
    "use strict";
    init_esm();
    init_prompter();
    init_theme2();
    init_file_sink();
    init_logger();
    init_output();
    init_exit_codes();
    init_errors2();
    init_paths();
    init_install_json();
    init_package_version();
    init_types();
    pkg = { version: getCliVersion() };
  }
});

// cli/node_modules/js-yaml/dist/js-yaml.mjs
function isNothing(subject) {
  return typeof subject === "undefined" || subject === null;
}
function isObject(subject) {
  return typeof subject === "object" && subject !== null;
}
function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];
  return [sequence];
}
function extend(target, source) {
  var index, length, key, sourceKeys;
  if (source) {
    sourceKeys = Object.keys(source);
    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }
  return target;
}
function repeat(string, count) {
  var result = "", cycle;
  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }
  return result;
}
function isNegativeZero(number) {
  return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
function formatError(exception2, compact) {
  var where = "", message = exception2.reason || "(unknown reason)";
  if (!exception2.mark) return message;
  if (exception2.mark.name) {
    where += 'in "' + exception2.mark.name + '" ';
  }
  where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
  if (!compact && exception2.mark.snippet) {
    where += "\n\n" + exception2.mark.snippet;
  }
  return message + " " + where;
}
function YAMLException$1(reason, mark) {
  Error.call(this);
  this.name = "YAMLException";
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack || "";
  }
}
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
  var head = "";
  var tail = "";
  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
  if (position - lineStart > maxHalfLength) {
    head = " ... ";
    lineStart = position - maxHalfLength + head.length;
  }
  if (lineEnd - position > maxHalfLength) {
    tail = " ...";
    lineEnd = position + maxHalfLength - tail.length;
  }
  return {
    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") + tail,
    pos: position - lineStart + head.length
    // relative position
  };
}
function padStart(string, max) {
  return common2.repeat(" ", max - string.length) + string;
}
function makeSnippet(mark, options) {
  options = Object.create(options || null);
  if (!mark.buffer) return null;
  if (!options.maxLength) options.maxLength = 79;
  if (typeof options.indent !== "number") options.indent = 1;
  if (typeof options.linesBefore !== "number") options.linesBefore = 3;
  if (typeof options.linesAfter !== "number") options.linesAfter = 2;
  var re = /\r?\n|\r|\0/g;
  var lineStarts = [0];
  var lineEnds = [];
  var match;
  var foundLineNo = -1;
  while (match = re.exec(mark.buffer)) {
    lineEnds.push(match.index);
    lineStarts.push(match.index + match[0].length);
    if (mark.position <= match.index && foundLineNo < 0) {
      foundLineNo = lineStarts.length - 2;
    }
  }
  if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
  var result = "", i, line;
  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
  for (i = 1; i <= options.linesBefore; i++) {
    if (foundLineNo - i < 0) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo - i],
      lineEnds[foundLineNo - i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
      maxLineLength
    );
    result = common2.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
  }
  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
  result += common2.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  result += common2.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
  for (i = 1; i <= options.linesAfter; i++) {
    if (foundLineNo + i >= lineEnds.length) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo + i],
      lineEnds[foundLineNo + i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
      maxLineLength
    );
    result += common2.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  }
  return result.replace(/\n$/, "");
}
function compileStyleAliases(map2) {
  var result = {};
  if (map2 !== null) {
    Object.keys(map2).forEach(function(style) {
      map2[style].forEach(function(alias) {
        result[String(alias)] = style;
      });
    });
  }
  return result;
}
function Type$1(tag, options) {
  options = options || {};
  Object.keys(options).forEach(function(name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });
  this.options = options;
  this.tag = tag;
  this.kind = options["kind"] || null;
  this.resolve = options["resolve"] || function() {
    return true;
  };
  this.construct = options["construct"] || function(data) {
    return data;
  };
  this.instanceOf = options["instanceOf"] || null;
  this.predicate = options["predicate"] || null;
  this.represent = options["represent"] || null;
  this.representName = options["representName"] || null;
  this.defaultStyle = options["defaultStyle"] || null;
  this.multi = options["multi"] || false;
  this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}
function compileList(schema2, name) {
  var result = [];
  schema2[name].forEach(function(currentType) {
    var newIndex = result.length;
    result.forEach(function(previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
        newIndex = previousIndex;
      }
    });
    result[newIndex] = currentType;
  });
  return result;
}
function compileMap() {
  var result = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, index, length;
  function collectType(type2) {
    if (type2.multi) {
      result.multi[type2.kind].push(type2);
      result.multi["fallback"].push(type2);
    } else {
      result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
    }
  }
  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}
function Schema$1(definition) {
  return this.extend(definition);
}
function resolveYamlNull(data) {
  if (data === null) return true;
  var max = data.length;
  return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
  return null;
}
function isNull(object) {
  return object === null;
}
function resolveYamlBoolean(data) {
  if (data === null) return false;
  var max = data.length;
  return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
  return data === "true" || data === "True" || data === "TRUE";
}
function isBoolean(object) {
  return Object.prototype.toString.call(object) === "[object Boolean]";
}
function isHexCode(c) {
  return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
}
function isOctCode(c) {
  return 48 <= c && c <= 55;
}
function isDecCode(c) {
  return 48 <= c && c <= 57;
}
function resolveYamlInteger(data) {
  if (data === null) return false;
  var max = data.length, index = 0, hasDigits = false, ch;
  if (!max) return false;
  ch = data[index];
  if (ch === "-" || ch === "+") {
    ch = data[++index];
  }
  if (ch === "0") {
    if (index + 1 === max) return true;
    ch = data[++index];
    if (ch === "b") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (ch !== "0" && ch !== "1") return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "o") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (!isOctCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
  }
  if (ch === "_") return false;
  for (; index < max; index++) {
    ch = data[index];
    if (ch === "_") continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_") return false;
  return true;
}
function constructYamlInteger(data) {
  var value = data, sign = 1, ch;
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-") sign = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0") return 0;
  if (ch === "0") {
    if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
    if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
    if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
  }
  return sign * parseInt(value, 10);
}
function isInteger(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common2.isNegativeZero(object));
}
function resolveYamlFloat(data) {
  if (data === null) return false;
  if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  data[data.length - 1] === "_") {
    return false;
  }
  return true;
}
function constructYamlFloat(data) {
  var value, sign;
  value = data.replace(/_/g, "").toLowerCase();
  sign = value[0] === "-" ? -1 : 1;
  if ("+-".indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === ".inf") {
    return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  } else if (value === ".nan") {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}
function representYamlFloat(object, style) {
  var res;
  if (isNaN(object)) {
    switch (style) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  } else if (common2.isNegativeZero(object)) {
    return "-0.0";
  }
  res = object.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common2.isNegativeZero(object));
}
function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}
function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match === null) throw new Error("Date resolve error");
  year = +match[1];
  month = +match[2] - 1;
  day = +match[3];
  if (!match[4]) {
    return new Date(Date.UTC(year, month, day));
  }
  hour = +match[4];
  minute = +match[5];
  second = +match[6];
  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) {
      fraction += "0";
    }
    fraction = +fraction;
  }
  if (match[9]) {
    tz_hour = +match[10];
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 6e4;
    if (match[9] === "-") delta = -delta;
  }
  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  if (delta) date.setTime(date.getTime() - delta);
  return date;
}
function representYamlTimestamp(object) {
  return object.toISOString();
}
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
function resolveYamlBinary(data) {
  if (data === null) return false;
  var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    code = map2.indexOf(data.charAt(idx));
    if (code > 64) continue;
    if (code < 0) return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
  var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
  for (idx = 0; idx < max; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map2.indexOf(input.charAt(idx));
  }
  tailbits = max % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  return new Uint8Array(result);
}
function representYamlBinary(object) {
  var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    }
    bits = (bits << 8) + object[idx];
  }
  tail = max % 3;
  if (tail === 0) {
    result += map2[bits >> 18 & 63];
    result += map2[bits >> 12 & 63];
    result += map2[bits >> 6 & 63];
    result += map2[bits & 63];
  } else if (tail === 2) {
    result += map2[bits >> 10 & 63];
    result += map2[bits >> 4 & 63];
    result += map2[bits << 2 & 63];
    result += map2[64];
  } else if (tail === 1) {
    result += map2[bits >> 2 & 63];
    result += map2[bits << 4 & 63];
    result += map2[64];
    result += map2[64];
  }
  return result;
}
function isBinary(obj) {
  return Object.prototype.toString.call(obj) === "[object Uint8Array]";
}
function resolveYamlOmap(data) {
  if (data === null) return true;
  var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;
    if (_toString$2.call(pair) !== "[object Object]") return false;
    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }
    if (!pairHasKey) return false;
    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }
  return true;
}
function constructYamlOmap(data) {
  return data !== null ? data : [];
}
function resolveYamlPairs(data) {
  if (data === null) return true;
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    if (_toString$1.call(pair) !== "[object Object]") return false;
    keys = Object.keys(pair);
    if (keys.length !== 1) return false;
    result[index] = [keys[0], pair[keys[0]]];
  }
  return true;
}
function constructYamlPairs(data) {
  if (data === null) return [];
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    keys = Object.keys(pair);
    result[index] = [keys[0], pair[keys[0]]];
  }
  return result;
}
function resolveYamlSet(data) {
  if (data === null) return true;
  var key, object = data;
  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }
  return true;
}
function constructYamlSet(data) {
  return data !== null ? data : {};
}
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function is_EOL(c) {
  return c === 10 || c === 13;
}
function is_WHITE_SPACE(c) {
  return c === 9 || c === 32;
}
function is_WS_OR_EOL(c) {
  return c === 9 || c === 32 || c === 10 || c === 13;
}
function is_FLOW_INDICATOR(c) {
  return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
}
function fromHexCode(c) {
  var lc;
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  lc = c | 32;
  if (97 <= lc && lc <= 102) {
    return lc - 97 + 10;
  }
  return -1;
}
function escapedHexLen(c) {
  if (c === 120) {
    return 2;
  }
  if (c === 117) {
    return 4;
  }
  if (c === 85) {
    return 8;
  }
  return 0;
}
function fromDecimalCode(c) {
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  return -1;
}
function simpleEscapeSequence(c) {
  return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
}
function charFromCodepoint(c) {
  if (c <= 65535) {
    return String.fromCharCode(c);
  }
  return String.fromCharCode(
    (c - 65536 >> 10) + 55296,
    (c - 65536 & 1023) + 56320
  );
}
function setProperty(object, key, value) {
  if (key === "__proto__") {
    Object.defineProperty(object, key, {
      configurable: true,
      enumerable: true,
      writable: true,
      value
    });
  } else {
    object[key] = value;
  }
}
function State$1(input, options) {
  this.input = input;
  this.filename = options["filename"] || null;
  this.schema = options["schema"] || _default;
  this.onWarning = options["onWarning"] || null;
  this.legacy = options["legacy"] || false;
  this.json = options["json"] || false;
  this.listener = options["listener"] || null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap = this.schema.compiledTypeMap;
  this.length = input.length;
  this.position = 0;
  this.line = 0;
  this.lineStart = 0;
  this.lineIndent = 0;
  this.firstTabInLine = -1;
  this.documents = [];
}
function generateError(state, message) {
  var mark = {
    name: state.filename,
    buffer: state.input.slice(0, -1),
    // omit trailing \0
    position: state.position,
    line: state.line,
    column: state.position - state.lineStart
  };
  mark.snippet = snippet(mark);
  return new exception(message, mark);
}
function throwError(state, message) {
  throw generateError(state, message);
}
function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}
function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;
  if (start < end) {
    _result = state.input.slice(start, end);
    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
          throwError(state, "expected valid JSON character");
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, "the stream contains non-printable characters");
    }
    state.result += _result;
  }
}
function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;
  if (!common2.isObject(source)) {
    throwError(state, "cannot merge mappings; the provided source object is unacceptable");
  }
  sourceKeys = Object.keys(source);
  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];
    if (!_hasOwnProperty$1.call(destination, key)) {
      setProperty(destination, key, source[key]);
      overridableKeys[key] = true;
    }
  }
}
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
  var index, quantity;
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);
    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, "nested arrays are not supported inside keys");
      }
      if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
        keyNode[index] = "[object Object]";
      }
    }
  }
  if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
    keyNode = "[object Object]";
  }
  keyNode = String(keyNode);
  if (_result === null) {
    _result = {};
  }
  if (keyTag === "tag:yaml.org,2002:merge") {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.lineStart = startLineStart || state.lineStart;
      state.position = startPos || state.position;
      throwError(state, "duplicated mapping key");
    }
    setProperty(_result, keyNode, valueNode);
    delete overridableKeys[keyNode];
  }
  return _result;
}
function readLineBreak(state) {
  var ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 10) {
    state.position++;
  } else if (ch === 13) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 10) {
      state.position++;
    }
  } else {
    throwError(state, "a line break is expected");
  }
  state.line += 1;
  state.lineStart = state.position;
  state.firstTabInLine = -1;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      if (ch === 9 && state.firstTabInLine === -1) {
        state.firstTabInLine = state.position;
      }
      ch = state.input.charCodeAt(++state.position);
    }
    if (allowComments && ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 10 && ch !== 13 && ch !== 0);
    }
    if (is_EOL(ch)) {
      readLineBreak(state);
      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;
      while (ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }
  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, "deficient indentation");
  }
  return lineBreaks;
}
function testDocumentSeparator(state) {
  var _position = state.position, ch;
  ch = state.input.charCodeAt(_position);
  if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
    _position += 3;
    ch = state.input.charCodeAt(_position);
    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }
  return false;
}
function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += " ";
  } else if (count > 1) {
    state.result += common2.repeat("\n", count - 1);
  }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
  ch = state.input.charCodeAt(state.position);
  if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
    return false;
  }
  if (ch === 63 || ch === 45) {
    following = state.input.charCodeAt(state.position + 1);
    if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }
  state.kind = "scalar";
  state.result = "";
  captureStart = captureEnd = state.position;
  hasPendingContent = false;
  while (ch !== 0) {
    if (ch === 58) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }
    } else if (ch === 35) {
      preceding = state.input.charCodeAt(state.position - 1);
      if (is_WS_OR_EOL(preceding)) {
        break;
      }
    } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;
    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);
      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }
    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }
    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }
    ch = state.input.charCodeAt(++state.position);
  }
  captureSegment(state, captureStart, captureEnd, false);
  if (state.result) {
    return true;
  }
  state.kind = _kind;
  state.result = _result;
  return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
  var ch, captureStart, captureEnd;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 39) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 39) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (ch === 39) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a single quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 34) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 34) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;
    } else if (ch === 92) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;
      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;
        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);
          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;
          } else {
            throwError(state, "expected hexadecimal character");
          }
        }
        state.result += charFromCodepoint(hexResult);
        state.position++;
      } else {
        throwError(state, "unknown escape sequence");
      }
      captureStart = captureEnd = state.position;
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a double quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readFlowCollection(state, nodeIndent) {
  var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = /* @__PURE__ */ Object.create(null), keyNode, keyTag, valueNode, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 91) {
    terminator = 93;
    isMapping = false;
    _result = [];
  } else if (ch === 123) {
    terminator = 125;
    isMapping = true;
    _result = {};
  } else {
    return false;
  }
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(++state.position);
  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? "mapping" : "sequence";
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, "missed comma between flow collection entries");
    } else if (ch === 44) {
      throwError(state, "expected the node content, but found ','");
    }
    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;
    if (ch === 63) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }
    _line = state.line;
    _lineStart = state.lineStart;
    _pos = state.position;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if ((isExplicitPair || state.line === _line) && ch === 58) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }
    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    } else {
      _result.push(keyNode);
    }
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === 44) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }
  throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockScalar(state, nodeIndent) {
  var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 124) {
    folding = false;
  } else if (ch === 62) {
    folding = true;
  } else {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);
    if (ch === 43 || ch === 45) {
      if (CHOMPING_CLIP === chomping) {
        chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, "repeat of a chomping mode identifier");
      }
    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, "repeat of an indentation width identifier");
      }
    } else {
      break;
    }
  }
  if (is_WHITE_SPACE(ch)) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (is_WHITE_SPACE(ch));
    if (ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (!is_EOL(ch) && ch !== 0);
    }
  }
  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;
    ch = state.input.charCodeAt(state.position);
    while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }
    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }
    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }
    if (state.lineIndent < textIndent) {
      if (chomping === CHOMPING_KEEP) {
        state.result += common2.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) {
          state.result += "\n";
        }
      }
      break;
    }
    if (folding) {
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        state.result += common2.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common2.repeat("\n", emptyLines + 1);
      } else if (emptyLines === 0) {
        if (didReadContent) {
          state.result += " ";
        }
      } else {
        state.result += common2.repeat("\n", emptyLines);
      }
    } else {
      state.result += common2.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    }
    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;
    while (!is_EOL(ch) && ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, state.position, false);
  }
  return true;
}
function readBlockSequence(state, nodeIndent) {
  var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
  if (state.firstTabInLine !== -1) return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    if (ch !== 45) {
      break;
    }
    following = state.input.charCodeAt(state.position + 1);
    if (!is_WS_OR_EOL(following)) {
      break;
    }
    detected = true;
    state.position++;
    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }
    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a sequence entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "sequence";
    state.result = _result;
    return true;
  }
  return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
  var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = /* @__PURE__ */ Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
  if (state.firstTabInLine !== -1) return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (!atExplicitKey && state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    following = state.input.charCodeAt(state.position + 1);
    _line = state.line;
    if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
      if (ch === 63) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        detected = true;
        atExplicitKey = true;
        allowCompact = true;
      } else if (atExplicitKey) {
        atExplicitKey = false;
        allowCompact = true;
      } else {
        throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
      }
      state.position += 1;
      ch = following;
    } else {
      _keyLine = state.line;
      _keyLineStart = state.lineStart;
      _keyPos = state.position;
      if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        break;
      }
      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 58) {
          ch = state.input.charCodeAt(++state.position);
          if (!is_WS_OR_EOL(ch)) {
            throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
          }
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;
        } else if (detected) {
          throwError(state, "can not read an implicit mapping pair; a colon is missed");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      } else if (detected) {
        throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true;
      }
    }
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (atExplicitKey) {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
      }
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }
      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
        keyTag = keyNode = valueNode = null;
      }
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a mapping entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "mapping";
    state.result = _result;
  }
  return detected;
}
function readTagProperty(state) {
  var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 33) return false;
  if (state.tag !== null) {
    throwError(state, "duplication of a tag property");
  }
  ch = state.input.charCodeAt(++state.position);
  if (ch === 60) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);
  } else if (ch === 33) {
    isNamed = true;
    tagHandle = "!!";
    ch = state.input.charCodeAt(++state.position);
  } else {
    tagHandle = "!";
  }
  _position = state.position;
  if (isVerbatim) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (ch !== 0 && ch !== 62);
    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, "unexpected end of the stream within a verbatim tag");
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      if (ch === 33) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);
          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, "named tag handle cannot contain such characters");
          }
          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, "tag suffix cannot contain exclamation marks");
        }
      }
      ch = state.input.charCodeAt(++state.position);
    }
    tagName = state.input.slice(_position, state.position);
    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, "tag suffix cannot contain flow indicator characters");
    }
  }
  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, "tag name cannot contain such characters: " + tagName);
  }
  try {
    tagName = decodeURIComponent(tagName);
  } catch (err) {
    throwError(state, "tag name is malformed: " + tagName);
  }
  if (isVerbatim) {
    state.tag = tagName;
  } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;
  } else if (tagHandle === "!") {
    state.tag = "!" + tagName;
  } else if (tagHandle === "!!") {
    state.tag = "tag:yaml.org,2002:" + tagName;
  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }
  return true;
}
function readAnchorProperty(state) {
  var _position, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 38) return false;
  if (state.anchor !== null) {
    throwError(state, "duplication of an anchor property");
  }
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an anchor node must contain at least one character");
  }
  state.anchor = state.input.slice(_position, state.position);
  return true;
}
function readAlias(state) {
  var _position, alias, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 42) return false;
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an alias node must contain at least one character");
  }
  alias = state.input.slice(_position, state.position);
  if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }
  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
  if (state.listener !== null) {
    state.listener("open", state);
  }
  state.tag = null;
  state.anchor = null;
  state.kind = null;
  state.result = null;
  allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;
      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }
  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }
  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }
  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }
    blockIndent = state.position - state.lineStart;
    if (indentStatus === 1) {
      if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;
        } else if (readAlias(state)) {
          hasContent = true;
          if (state.tag !== null || state.anchor !== null) {
            throwError(state, "alias node should not have any properties");
          }
        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;
          if (state.tag === null) {
            state.tag = "?";
          }
        }
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }
  if (state.tag === null) {
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = state.result;
    }
  } else if (state.tag === "?") {
    if (state.result !== null && state.kind !== "scalar") {
      throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
    }
    for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
      type2 = state.implicitTypes[typeIndex];
      if (type2.resolve(state.result)) {
        state.result = type2.construct(state.result);
        state.tag = type2.tag;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
        break;
      }
    }
  } else if (state.tag !== "!") {
    if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
      type2 = state.typeMap[state.kind || "fallback"][state.tag];
    } else {
      type2 = null;
      typeList = state.typeMap.multi[state.kind || "fallback"];
      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
        if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
          type2 = typeList[typeIndex];
          break;
        }
      }
    }
    if (!type2) {
      throwError(state, "unknown tag !<" + state.tag + ">");
    }
    if (state.result !== null && type2.kind !== state.kind) {
      throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
    }
    if (!type2.resolve(state.result, state.tag)) {
      throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
    } else {
      state.result = type2.construct(state.result, state.tag);
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    }
  }
  if (state.listener !== null) {
    state.listener("close", state);
  }
  return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
  var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = /* @__PURE__ */ Object.create(null);
  state.anchorMap = /* @__PURE__ */ Object.create(null);
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if (state.lineIndent > 0 || ch !== 37) {
      break;
    }
    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];
    if (directiveName.length < 1) {
      throwError(state, "directive name must not be less than one character in length");
    }
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && !is_EOL(ch));
        break;
      }
      if (is_EOL(ch)) break;
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveArgs.push(state.input.slice(_position, state.position));
    }
    if (ch !== 0) readLineBreak(state);
    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }
  skipSeparationSpace(state, true, -1);
  if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);
  } else if (hasDirectives) {
    throwError(state, "directives end mark is expected");
  }
  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);
  if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, "non-ASCII line breaks are interpreted as content");
  }
  state.documents.push(state.result);
  if (state.position === state.lineStart && testDocumentSeparator(state)) {
    if (state.input.charCodeAt(state.position) === 46) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }
  if (state.position < state.length - 1) {
    throwError(state, "end of the stream or a document separator is expected");
  } else {
    return;
  }
}
function loadDocuments(input, options) {
  input = String(input);
  options = options || {};
  if (input.length !== 0) {
    if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
      input += "\n";
    }
    if (input.charCodeAt(0) === 65279) {
      input = input.slice(1);
    }
  }
  var state = new State$1(input, options);
  var nullpos = input.indexOf("\0");
  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, "null byte is not allowed in input");
  }
  state.input += "\0";
  while (state.input.charCodeAt(state.position) === 32) {
    state.lineIndent += 1;
    state.position += 1;
  }
  while (state.position < state.length - 1) {
    readDocument(state);
  }
  return state.documents;
}
function loadAll$1(input, iterator, options) {
  if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
    options = iterator;
    iterator = null;
  }
  var documents = loadDocuments(input, options);
  if (typeof iterator !== "function") {
    return documents;
  }
  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}
function load$1(input, options) {
  var documents = loadDocuments(input, options);
  if (documents.length === 0) {
    return void 0;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new exception("expected a single document in the stream, but found more");
}
function compileStyleMap(schema2, map2) {
  var result, keys, index, length, tag, style, type2;
  if (map2 === null) return {};
  result = {};
  keys = Object.keys(map2);
  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map2[tag]);
    if (tag.slice(0, 2) === "!!") {
      tag = "tag:yaml.org,2002:" + tag.slice(2);
    }
    type2 = schema2.compiledTypeMap["fallback"][tag];
    if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
      style = type2.styleAliases[style];
    }
    result[tag] = style;
  }
  return result;
}
function encodeHex(character) {
  var string, handle, length;
  string = character.toString(16).toUpperCase();
  if (character <= 255) {
    handle = "x";
    length = 2;
  } else if (character <= 65535) {
    handle = "u";
    length = 4;
  } else if (character <= 4294967295) {
    handle = "U";
    length = 8;
  } else {
    throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
  }
  return "\\" + handle + common2.repeat("0", length - string.length) + string;
}
function State(options) {
  this.schema = options["schema"] || _default;
  this.indent = Math.max(1, options["indent"] || 2);
  this.noArrayIndent = options["noArrayIndent"] || false;
  this.skipInvalid = options["skipInvalid"] || false;
  this.flowLevel = common2.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
  this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
  this.sortKeys = options["sortKeys"] || false;
  this.lineWidth = options["lineWidth"] || 80;
  this.noRefs = options["noRefs"] || false;
  this.noCompatMode = options["noCompatMode"] || false;
  this.condenseFlow = options["condenseFlow"] || false;
  this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
  this.forceQuotes = options["forceQuotes"] || false;
  this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;
  this.tag = null;
  this.result = "";
  this.duplicates = [];
  this.usedDuplicates = null;
}
function indentString(string, spaces) {
  var ind = common2.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
  while (position < length) {
    next = string.indexOf("\n", position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }
    if (line.length && line !== "\n") result += ind;
    result += line;
  }
  return result;
}
function generateNextLine(state, level) {
  return "\n" + common2.repeat(" ", state.indent * level);
}
function testImplicitResolving(state, str2) {
  var index, length, type2;
  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type2 = state.implicitTypes[index];
    if (type2.resolve(str2)) {
      return true;
    }
  }
  return false;
}
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}
function isPrintable(c) {
  return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
}
function isNsCharOrWhitespace(c) {
  return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
function isPlainSafe(c, prev, inblock) {
  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
  return (
    // ns-plain-safe
    (inblock ? (
      // c = flow-in
      cIsNsCharOrWhitespace
    ) : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar
  );
}
function isPlainSafeFirst(c) {
  return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
function isPlainSafeLast(c) {
  return !isWhitespace(c) && c !== CHAR_COLON;
}
function codePointAt(string, pos) {
  var first = string.charCodeAt(pos), second;
  if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
    second = string.charCodeAt(pos + 1);
    if (second >= 56320 && second <= 57343) {
      return (first - 55296) * 1024 + second - 56320 + 65536;
    }
  }
  return first;
}
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
  var i;
  var char = 0;
  var prevChar = null;
  var hasLineBreak = false;
  var hasFoldableLine = false;
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1;
  var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
  if (singleLineOnly || forceQuotes) {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
  } else {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
          i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
    hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
  }
  if (!hasLineBreak && !hasFoldableLine) {
    if (plain && !forceQuotes && !testAmbiguousType(string)) {
      return STYLE_PLAIN;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  if (!forceQuotes) {
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }
  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}
function writeScalar(state, string, level, iskey, inblock) {
  state.dump = function() {
    if (string.length === 0) {
      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
    }
    if (!state.noCompatMode) {
      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
      }
    }
    var indent = state.indent * Math.max(1, level);
    var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
    var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
    function testAmbiguity(string2) {
      return testImplicitResolving(state, string2);
    }
    switch (chooseScalarStyle(
      string,
      singleLineOnly,
      state.indent,
      lineWidth,
      testAmbiguity,
      state.quotingType,
      state.forceQuotes && !iskey,
      inblock
    )) {
      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string) + '"';
      default:
        throw new exception("impossible error: invalid scalar style");
    }
  }();
}
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
  var clip = string[string.length - 1] === "\n";
  var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
  var chomp = keep ? "+" : clip ? "" : "-";
  return indentIndicator + chomp + "\n";
}
function dropEndingNewline(string) {
  return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
function foldString(string, width) {
  var lineRe = /(\n+)([^\n]*)/g;
  var result = function() {
    var nextLF = string.indexOf("\n");
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }();
  var prevMoreIndented = string[0] === "\n" || string[0] === " ";
  var moreIndented;
  var match;
  while (match = lineRe.exec(string)) {
    var prefix = match[1], line = match[2];
    moreIndented = line[0] === " ";
    result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }
  return result;
}
function foldLine(line, width) {
  if (line === "" || line[0] === " ") return line;
  var breakRe = / [^ ]/g;
  var match;
  var start = 0, end, curr = 0, next = 0;
  var result = "";
  while (match = breakRe.exec(line)) {
    next = match.index;
    if (next - start > width) {
      end = curr > start ? curr : next;
      result += "\n" + line.slice(start, end);
      start = end + 1;
    }
    curr = next;
  }
  result += "\n";
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }
  return result.slice(1);
}
function escapeString(string) {
  var result = "";
  var char = 0;
  var escapeSeq;
  for (var i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
    char = codePointAt(string, i);
    escapeSeq = ESCAPE_SEQUENCES[char];
    if (!escapeSeq && isPrintable(char)) {
      result += string[i];
      if (char >= 65536) result += string[i + 1];
    } else {
      result += escapeSeq || encodeHex(char);
    }
  }
  return result;
}
function writeFlowSequence(state, level, object) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
      if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = "[" + _result + "]";
}
function writeBlockSequence(state, level, object, compact) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
      if (!compact || _result !== "") {
        _result += generateNextLine(state, level);
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += "-";
      } else {
        _result += "- ";
      }
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = _result || "[]";
}
function writeFlowMapping(state, level, object) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (_result !== "") pairBuffer += ", ";
    if (state.condenseFlow) pairBuffer += '"';
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level, objectKey, false, false)) {
      continue;
    }
    if (state.dump.length > 1024) pairBuffer += "? ";
    pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
    if (!writeNode(state, level, objectValue, false, false)) {
      continue;
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = "{" + _result + "}";
}
function writeBlockMapping(state, level, object, compact) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
  if (state.sortKeys === true) {
    objectKeyList.sort();
  } else if (typeof state.sortKeys === "function") {
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    throw new exception("sortKeys must be a boolean or a function");
  }
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (!compact || _result !== "") {
      pairBuffer += generateNextLine(state, level);
    }
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue;
    }
    explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += "?";
      } else {
        pairBuffer += "? ";
      }
    }
    pairBuffer += state.dump;
    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }
    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue;
    }
    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ":";
    } else {
      pairBuffer += ": ";
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = _result || "{}";
}
function detectType(state, object, explicit) {
  var _result, typeList, index, length, type2, style;
  typeList = explicit ? state.explicitTypes : state.implicitTypes;
  for (index = 0, length = typeList.length; index < length; index += 1) {
    type2 = typeList[index];
    if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
      if (explicit) {
        if (type2.multi && type2.representName) {
          state.tag = type2.representName(object);
        } else {
          state.tag = type2.tag;
        }
      } else {
        state.tag = "?";
      }
      if (type2.represent) {
        style = state.styleMap[type2.tag] || type2.defaultStyle;
        if (_toString.call(type2.represent) === "[object Function]") {
          _result = type2.represent(object, style);
        } else if (_hasOwnProperty.call(type2.represent, style)) {
          _result = type2.represent[style](object, style);
        } else {
          throw new exception("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
        }
        state.dump = _result;
      }
      return true;
    }
  }
  return false;
}
function writeNode(state, level, object, block, compact, iskey, isblockseq) {
  state.tag = null;
  state.dump = object;
  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }
  var type2 = _toString.call(state.dump);
  var inblock = block;
  var tagStr;
  if (block) {
    block = state.flowLevel < 0 || state.flowLevel > level;
  }
  var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }
  if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
    compact = false;
  }
  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = "*ref_" + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type2 === "[object Object]") {
      if (block && Object.keys(state.dump).length !== 0) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object Array]") {
      if (block && state.dump.length !== 0) {
        if (state.noArrayIndent && !isblockseq && level > 0) {
          writeBlockSequence(state, level - 1, state.dump, compact);
        } else {
          writeBlockSequence(state, level, state.dump, compact);
        }
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object String]") {
      if (state.tag !== "?") {
        writeScalar(state, state.dump, level, iskey, inblock);
      }
    } else if (type2 === "[object Undefined]") {
      return false;
    } else {
      if (state.skipInvalid) return false;
      throw new exception("unacceptable kind of an object to dump " + type2);
    }
    if (state.tag !== null && state.tag !== "?") {
      tagStr = encodeURI(
        state.tag[0] === "!" ? state.tag.slice(1) : state.tag
      ).replace(/!/g, "%21");
      if (state.tag[0] === "!") {
        tagStr = "!" + tagStr;
      } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
        tagStr = "!!" + tagStr.slice(18);
      } else {
        tagStr = "!<" + tagStr + ">";
      }
      state.dump = tagStr + " " + state.dump;
    }
  }
  return true;
}
function getDuplicateReferences(object, state) {
  var objects = [], duplicatesIndexes = [], index, length;
  inspectNode(object, objects, duplicatesIndexes);
  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}
function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList, index, length;
  if (object !== null && typeof object === "object") {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);
      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);
        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}
function dump$1(input, options) {
  options = options || {};
  var state = new State(options);
  if (!state.noRefs) getDuplicateReferences(input, state);
  var value = input;
  if (state.replacer) {
    value = state.replacer.call({ "": value }, "", value);
  }
  if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
  return "";
}
function renamed(from, to) {
  return function() {
    throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
  };
}
var isNothing_1, isObject_1, toArray_1, repeat_1, isNegativeZero_1, extend_1, common2, exception, snippet, TYPE_CONSTRUCTOR_OPTIONS, YAML_NODE_KINDS, type, schema, str, seq, map, failsafe, _null, bool, int, YAML_FLOAT_PATTERN, SCIENTIFIC_WITHOUT_DOT, float, json, core, YAML_DATE_REGEXP, YAML_TIMESTAMP_REGEXP, timestamp, merge, BASE64_MAP, binary, _hasOwnProperty$3, _toString$2, omap, _toString$1, pairs, _hasOwnProperty$2, set, _default, _hasOwnProperty$1, CONTEXT_FLOW_IN, CONTEXT_FLOW_OUT, CONTEXT_BLOCK_IN, CONTEXT_BLOCK_OUT, CHOMPING_CLIP, CHOMPING_STRIP, CHOMPING_KEEP, PATTERN_NON_PRINTABLE, PATTERN_NON_ASCII_LINE_BREAKS, PATTERN_FLOW_INDICATORS, PATTERN_TAG_HANDLE, PATTERN_TAG_URI, simpleEscapeCheck, simpleEscapeMap, i, directiveHandlers, loadAll_1, load_1, loader, _toString, _hasOwnProperty, CHAR_BOM, CHAR_TAB, CHAR_LINE_FEED, CHAR_CARRIAGE_RETURN, CHAR_SPACE, CHAR_EXCLAMATION, CHAR_DOUBLE_QUOTE, CHAR_SHARP, CHAR_PERCENT, CHAR_AMPERSAND, CHAR_SINGLE_QUOTE, CHAR_ASTERISK, CHAR_COMMA, CHAR_MINUS, CHAR_COLON, CHAR_EQUALS, CHAR_GREATER_THAN, CHAR_QUESTION, CHAR_COMMERCIAL_AT, CHAR_LEFT_SQUARE_BRACKET, CHAR_RIGHT_SQUARE_BRACKET, CHAR_GRAVE_ACCENT, CHAR_LEFT_CURLY_BRACKET, CHAR_VERTICAL_LINE, CHAR_RIGHT_CURLY_BRACKET, ESCAPE_SEQUENCES, DEPRECATED_BOOLEANS_SYNTAX, DEPRECATED_BASE60_SYNTAX, QUOTING_TYPE_SINGLE, QUOTING_TYPE_DOUBLE, STYLE_PLAIN, STYLE_SINGLE, STYLE_LITERAL, STYLE_FOLDED, STYLE_DOUBLE, dump_1, dumper, Type, Schema, FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA, load2, loadAll, dump, YAMLException, types, safeLoad, safeLoadAll, safeDump, jsYaml;
var init_js_yaml = __esm({
  "cli/node_modules/js-yaml/dist/js-yaml.mjs"() {
    isNothing_1 = isNothing;
    isObject_1 = isObject;
    toArray_1 = toArray;
    repeat_1 = repeat;
    isNegativeZero_1 = isNegativeZero;
    extend_1 = extend;
    common2 = {
      isNothing: isNothing_1,
      isObject: isObject_1,
      toArray: toArray_1,
      repeat: repeat_1,
      isNegativeZero: isNegativeZero_1,
      extend: extend_1
    };
    YAMLException$1.prototype = Object.create(Error.prototype);
    YAMLException$1.prototype.constructor = YAMLException$1;
    YAMLException$1.prototype.toString = function toString(compact) {
      return this.name + ": " + formatError(this, compact);
    };
    exception = YAMLException$1;
    snippet = makeSnippet;
    TYPE_CONSTRUCTOR_OPTIONS = [
      "kind",
      "multi",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "representName",
      "defaultStyle",
      "styleAliases"
    ];
    YAML_NODE_KINDS = [
      "scalar",
      "sequence",
      "mapping"
    ];
    type = Type$1;
    Schema$1.prototype.extend = function extend2(definition) {
      var implicit = [];
      var explicit = [];
      if (definition instanceof type) {
        explicit.push(definition);
      } else if (Array.isArray(definition)) {
        explicit = explicit.concat(definition);
      } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
        if (definition.implicit) implicit = implicit.concat(definition.implicit);
        if (definition.explicit) explicit = explicit.concat(definition.explicit);
      } else {
        throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
      }
      implicit.forEach(function(type$1) {
        if (!(type$1 instanceof type)) {
          throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
        }
        if (type$1.loadKind && type$1.loadKind !== "scalar") {
          throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
        }
        if (type$1.multi) {
          throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
        }
      });
      explicit.forEach(function(type$1) {
        if (!(type$1 instanceof type)) {
          throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
        }
      });
      var result = Object.create(Schema$1.prototype);
      result.implicit = (this.implicit || []).concat(implicit);
      result.explicit = (this.explicit || []).concat(explicit);
      result.compiledImplicit = compileList(result, "implicit");
      result.compiledExplicit = compileList(result, "explicit");
      result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
      return result;
    };
    schema = Schema$1;
    str = new type("tag:yaml.org,2002:str", {
      kind: "scalar",
      construct: function(data) {
        return data !== null ? data : "";
      }
    });
    seq = new type("tag:yaml.org,2002:seq", {
      kind: "sequence",
      construct: function(data) {
        return data !== null ? data : [];
      }
    });
    map = new type("tag:yaml.org,2002:map", {
      kind: "mapping",
      construct: function(data) {
        return data !== null ? data : {};
      }
    });
    failsafe = new schema({
      explicit: [
        str,
        seq,
        map
      ]
    });
    _null = new type("tag:yaml.org,2002:null", {
      kind: "scalar",
      resolve: resolveYamlNull,
      construct: constructYamlNull,
      predicate: isNull,
      represent: {
        canonical: function() {
          return "~";
        },
        lowercase: function() {
          return "null";
        },
        uppercase: function() {
          return "NULL";
        },
        camelcase: function() {
          return "Null";
        },
        empty: function() {
          return "";
        }
      },
      defaultStyle: "lowercase"
    });
    bool = new type("tag:yaml.org,2002:bool", {
      kind: "scalar",
      resolve: resolveYamlBoolean,
      construct: constructYamlBoolean,
      predicate: isBoolean,
      represent: {
        lowercase: function(object) {
          return object ? "true" : "false";
        },
        uppercase: function(object) {
          return object ? "TRUE" : "FALSE";
        },
        camelcase: function(object) {
          return object ? "True" : "False";
        }
      },
      defaultStyle: "lowercase"
    });
    int = new type("tag:yaml.org,2002:int", {
      kind: "scalar",
      resolve: resolveYamlInteger,
      construct: constructYamlInteger,
      predicate: isInteger,
      represent: {
        binary: function(obj) {
          return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
        },
        octal: function(obj) {
          return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
          return obj.toString(10);
        },
        /* eslint-disable max-len */
        hexadecimal: function(obj) {
          return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
        }
      },
      defaultStyle: "decimal",
      styleAliases: {
        binary: [2, "bin"],
        octal: [8, "oct"],
        decimal: [10, "dec"],
        hexadecimal: [16, "hex"]
      }
    });
    YAML_FLOAT_PATTERN = new RegExp(
      // 2.5e4, 2.5 and integers
      "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
    );
    SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
    float = new type("tag:yaml.org,2002:float", {
      kind: "scalar",
      resolve: resolveYamlFloat,
      construct: constructYamlFloat,
      predicate: isFloat,
      represent: representYamlFloat,
      defaultStyle: "lowercase"
    });
    json = failsafe.extend({
      implicit: [
        _null,
        bool,
        int,
        float
      ]
    });
    core = json;
    YAML_DATE_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
    );
    YAML_TIMESTAMP_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
    );
    timestamp = new type("tag:yaml.org,2002:timestamp", {
      kind: "scalar",
      resolve: resolveYamlTimestamp,
      construct: constructYamlTimestamp,
      instanceOf: Date,
      represent: representYamlTimestamp
    });
    merge = new type("tag:yaml.org,2002:merge", {
      kind: "scalar",
      resolve: resolveYamlMerge
    });
    BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    binary = new type("tag:yaml.org,2002:binary", {
      kind: "scalar",
      resolve: resolveYamlBinary,
      construct: constructYamlBinary,
      predicate: isBinary,
      represent: representYamlBinary
    });
    _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
    _toString$2 = Object.prototype.toString;
    omap = new type("tag:yaml.org,2002:omap", {
      kind: "sequence",
      resolve: resolveYamlOmap,
      construct: constructYamlOmap
    });
    _toString$1 = Object.prototype.toString;
    pairs = new type("tag:yaml.org,2002:pairs", {
      kind: "sequence",
      resolve: resolveYamlPairs,
      construct: constructYamlPairs
    });
    _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
    set = new type("tag:yaml.org,2002:set", {
      kind: "mapping",
      resolve: resolveYamlSet,
      construct: constructYamlSet
    });
    _default = core.extend({
      implicit: [
        timestamp,
        merge
      ],
      explicit: [
        binary,
        omap,
        pairs,
        set
      ]
    });
    _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
    CONTEXT_FLOW_IN = 1;
    CONTEXT_FLOW_OUT = 2;
    CONTEXT_BLOCK_IN = 3;
    CONTEXT_BLOCK_OUT = 4;
    CHOMPING_CLIP = 1;
    CHOMPING_STRIP = 2;
    CHOMPING_KEEP = 3;
    PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
    PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
    PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    simpleEscapeCheck = new Array(256);
    simpleEscapeMap = new Array(256);
    for (i = 0; i < 256; i++) {
      simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
      simpleEscapeMap[i] = simpleEscapeSequence(i);
    }
    directiveHandlers = {
      YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) {
          throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
          throwError(state, "YAML directive accepts exactly one argument");
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
          throwError(state, "ill-formed argument of the YAML directive");
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) {
          throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
          throwWarning(state, "unsupported YAML version of the document");
        }
      },
      TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
          throwError(state, "TAG directive accepts exactly two arguments");
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
          throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        }
        if (_hasOwnProperty$1.call(state.tagMap, handle)) {
          throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
          throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        }
        try {
          prefix = decodeURIComponent(prefix);
        } catch (err) {
          throwError(state, "tag prefix is malformed: " + prefix);
        }
        state.tagMap[handle] = prefix;
      }
    };
    loadAll_1 = loadAll$1;
    load_1 = load$1;
    loader = {
      loadAll: loadAll_1,
      load: load_1
    };
    _toString = Object.prototype.toString;
    _hasOwnProperty = Object.prototype.hasOwnProperty;
    CHAR_BOM = 65279;
    CHAR_TAB = 9;
    CHAR_LINE_FEED = 10;
    CHAR_CARRIAGE_RETURN = 13;
    CHAR_SPACE = 32;
    CHAR_EXCLAMATION = 33;
    CHAR_DOUBLE_QUOTE = 34;
    CHAR_SHARP = 35;
    CHAR_PERCENT = 37;
    CHAR_AMPERSAND = 38;
    CHAR_SINGLE_QUOTE = 39;
    CHAR_ASTERISK = 42;
    CHAR_COMMA = 44;
    CHAR_MINUS = 45;
    CHAR_COLON = 58;
    CHAR_EQUALS = 61;
    CHAR_GREATER_THAN = 62;
    CHAR_QUESTION = 63;
    CHAR_COMMERCIAL_AT = 64;
    CHAR_LEFT_SQUARE_BRACKET = 91;
    CHAR_RIGHT_SQUARE_BRACKET = 93;
    CHAR_GRAVE_ACCENT = 96;
    CHAR_LEFT_CURLY_BRACKET = 123;
    CHAR_VERTICAL_LINE = 124;
    CHAR_RIGHT_CURLY_BRACKET = 125;
    ESCAPE_SEQUENCES = {};
    ESCAPE_SEQUENCES[0] = "\\0";
    ESCAPE_SEQUENCES[7] = "\\a";
    ESCAPE_SEQUENCES[8] = "\\b";
    ESCAPE_SEQUENCES[9] = "\\t";
    ESCAPE_SEQUENCES[10] = "\\n";
    ESCAPE_SEQUENCES[11] = "\\v";
    ESCAPE_SEQUENCES[12] = "\\f";
    ESCAPE_SEQUENCES[13] = "\\r";
    ESCAPE_SEQUENCES[27] = "\\e";
    ESCAPE_SEQUENCES[34] = '\\"';
    ESCAPE_SEQUENCES[92] = "\\\\";
    ESCAPE_SEQUENCES[133] = "\\N";
    ESCAPE_SEQUENCES[160] = "\\_";
    ESCAPE_SEQUENCES[8232] = "\\L";
    ESCAPE_SEQUENCES[8233] = "\\P";
    DEPRECATED_BOOLEANS_SYNTAX = [
      "y",
      "Y",
      "yes",
      "Yes",
      "YES",
      "on",
      "On",
      "ON",
      "n",
      "N",
      "no",
      "No",
      "NO",
      "off",
      "Off",
      "OFF"
    ];
    DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
    QUOTING_TYPE_SINGLE = 1;
    QUOTING_TYPE_DOUBLE = 2;
    STYLE_PLAIN = 1;
    STYLE_SINGLE = 2;
    STYLE_LITERAL = 3;
    STYLE_FOLDED = 4;
    STYLE_DOUBLE = 5;
    dump_1 = dump$1;
    dumper = {
      dump: dump_1
    };
    Type = type;
    Schema = schema;
    FAILSAFE_SCHEMA = failsafe;
    JSON_SCHEMA = json;
    CORE_SCHEMA = core;
    DEFAULT_SCHEMA = _default;
    load2 = loader.load;
    loadAll = loader.loadAll;
    dump = dumper.dump;
    YAMLException = exception;
    types = {
      binary,
      float,
      map,
      null: _null,
      pairs,
      set,
      timestamp,
      bool,
      int,
      merge,
      omap,
      seq,
      str
    };
    safeLoad = renamed("safeLoad", "load");
    safeLoadAll = renamed("safeLoadAll", "loadAll");
    safeDump = renamed("safeDump", "dump");
    jsYaml = {
      Type,
      Schema,
      FAILSAFE_SCHEMA,
      JSON_SCHEMA,
      CORE_SCHEMA,
      DEFAULT_SCHEMA,
      load: load2,
      loadAll,
      dump,
      YAMLException,
      types,
      safeLoad,
      safeLoadAll,
      safeDump
    };
  }
});

// cli/src/lib/skill-manifest.ts
import { readdirSync as readdirSync2, readFileSync as readFileSync2 } from "node:fs";
import path14 from "node:path";
function* walkSkillFiles(root) {
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop();
    let entries;
    try {
      entries = readdirSync2(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      if (e.isDirectory()) {
        if (EXCLUDED_DIRS.has(e.name)) continue;
        stack.push(path14.join(dir, e.name));
      } else if (e.isFile() && e.name === "SKILL.md") {
        yield path14.join(dir, e.name);
      }
    }
  }
}
function parseFrontmatter(text) {
  if (!text.startsWith("---")) return { error: "no frontmatter block" };
  const end = text.indexOf("\n---", 3);
  if (end === -1) return { error: "frontmatter not terminated" };
  const raw = text.slice(3, end);
  const fm = {};
  for (const rawLine of raw.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+$/, "");
    if (!line || line.startsWith("#")) continue;
    const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_-]*)\s*:\s*(.*)$/);
    if (!m) return { error: `malformed line: ${line}` };
    const rawValue = m[2].trim();
    const wasQuoted = rawValue.length >= 2 && (rawValue.startsWith('"') && rawValue.endsWith('"') || rawValue.startsWith("'") && rawValue.endsWith("'"));
    let value;
    if (wasQuoted) value = rawValue.slice(1, -1);
    else if (rawValue === "true") value = true;
    else if (rawValue === "false") value = false;
    else value = rawValue;
    fm[m[1]] = value;
  }
  return { frontmatter: fm };
}
function buildSkillManifest(opts) {
  const warn = opts.warn ?? ((msg) => process.stderr.write(msg + "\n"));
  const out = [];
  for (const file of walkSkillFiles(opts.repoRoot)) {
    let text;
    try {
      text = readFileSync2(file, "utf8");
    } catch (err) {
      warn(`warn: ${file}: ${err.message}`);
      continue;
    }
    const parsed = parseFrontmatter(text);
    if (parsed.error) {
      warn(`warn: ${file}: ${parsed.error}`);
      continue;
    }
    const fm = parsed.frontmatter;
    const name = fm["name"];
    const description = fm["description"];
    if (typeof name !== "string" || !name) {
      warn(`warn: ${file}: missing name`);
      continue;
    }
    if (typeof description !== "string" || !description) {
      warn(`warn: ${file}: missing description`);
      continue;
    }
    if (name.startsWith("rad-")) continue;
    if (fm["disable-model-invocation"] === true) continue;
    out.push({ name, description, path: path14.resolve(file) });
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}
var EXCLUDED_DIRS;
var init_skill_manifest = __esm({
  "cli/src/lib/skill-manifest.ts"() {
    "use strict";
    EXCLUDED_DIRS = /* @__PURE__ */ new Set([
      "node_modules",
      ".git",
      "dist",
      "build",
      "out",
      "coverage",
      "prompt-tests"
    ]);
  }
});

// cli/src/lib/pipeline-engine/constants.ts
var NODE_KINDS, NODE_STATUSES, GRAPH_STATUSES, CONDITION_OPERATORS, NEXT_ACTIONS, EVENTS, OUT_OF_BAND_EVENTS, REVIEW_VERDICTS, VALID_VERDICTS, ALLOWED_NODE_TRANSITIONS;
var init_constants = __esm({
  "cli/src/lib/pipeline-engine/constants.ts"() {
    "use strict";
    NODE_KINDS = Object.freeze({
      STEP: "step",
      GATE: "gate",
      FOR_EACH_PHASE: "for_each_phase",
      FOR_EACH_TASK: "for_each_task",
      CONDITIONAL: "conditional",
      PARALLEL: "parallel"
    });
    NODE_STATUSES = Object.freeze({
      NOT_STARTED: "not_started",
      IN_PROGRESS: "in_progress",
      COMPLETED: "completed",
      FAILED: "failed",
      HALTED: "halted",
      SKIPPED: "skipped"
    });
    GRAPH_STATUSES = Object.freeze({
      NOT_STARTED: "not_started",
      IN_PROGRESS: "in_progress",
      COMPLETED: "completed",
      HALTED: "halted"
    });
    CONDITION_OPERATORS = Object.freeze({
      EQ: "eq",
      NEQ: "neq",
      IN: "in",
      NOT_IN: "not_in",
      TRUTHY: "truthy",
      FALSY: "falsy"
    });
    NEXT_ACTIONS = Object.freeze({
      // Planning agent spawns
      SPAWN_REQUIREMENTS: "spawn_requirements",
      SPAWN_MASTER_PLAN: "spawn_master_plan",
      // Planning scripts
      EXPLODE_MASTER_PLAN: "explode_master_plan",
      // Human gates
      REQUEST_PLAN_APPROVAL: "request_plan_approval",
      GATE_TASK: "gate_task",
      GATE_PHASE: "gate_phase",
      ASK_GATE_MODE: "ask_gate_mode",
      REQUEST_FINAL_APPROVAL: "request_final_approval",
      // Execution agent spawns
      EXECUTE_TASK: "execute_task",
      SPAWN_CODE_REVIEWER: "spawn_code_reviewer",
      SPAWN_PHASE_REVIEWER: "spawn_phase_reviewer",
      SPAWN_FINAL_REVIEWER: "spawn_final_reviewer",
      // Source control
      INVOKE_SOURCE_CONTROL_COMMIT: "invoke_source_control_commit",
      INVOKE_SOURCE_CONTROL_PR: "invoke_source_control_pr",
      // Terminal states
      DISPLAY_HALTED: "display_halted",
      DISPLAY_COMPLETE: "display_complete"
    });
    EVENTS = Object.freeze({
      // ── Planning step events ──────────────────────────────────────────────
      REQUIREMENTS_STARTED: "requirements_started",
      REQUIREMENTS_COMPLETED: "requirements_completed",
      MASTER_PLAN_STARTED: "master_plan_started",
      MASTER_PLAN_COMPLETED: "master_plan_completed",
      EXPLOSION_STARTED: "explosion_started",
      EXPLOSION_COMPLETED: "explosion_completed",
      EXPLOSION_FAILED: "explosion_failed",
      // ── Gate approved events ──────────────────────────────────────────────
      PLAN_APPROVED: "plan_approved",
      TASK_GATE_APPROVED: "task_gate_approved",
      PHASE_GATE_APPROVED: "phase_gate_approved",
      FINAL_APPROVED: "final_approved",
      // ── Task execution events ─────────────────────────────────────────────
      EXECUTION_STARTED: "execution_started",
      TASK_COMPLETED: "task_completed",
      CODE_REVIEW_STARTED: "code_review_started",
      CODE_REVIEW_COMPLETED: "code_review_completed",
      // ── Phase review events ───────────────────────────────────────────────
      PHASE_REVIEW_STARTED: "phase_review_started",
      PHASE_REVIEW_COMPLETED: "phase_review_completed",
      // ── Final review events ───────────────────────────────────────────────
      FINAL_REVIEW_STARTED: "final_review_started",
      FINAL_REVIEW_COMPLETED: "final_review_completed",
      // ── Source control events ─────────────────────────────────────────────
      COMMIT_STARTED: "commit_started",
      COMMIT_COMPLETED: "commit_completed",
      PR_REQUESTED: "pr_requested",
      PR_CREATED: "pr_created",
      // ── Out-of-band events ────────────────────────────────────────────────
      PLAN_REJECTED: "plan_rejected",
      GATE_REJECTED: "gate_rejected",
      FINAL_REJECTED: "final_rejected",
      HALT: "halt",
      GATE_MODE_SET: "gate_mode_set",
      SOURCE_CONTROL_INIT: "source_control_init"
    });
    OUT_OF_BAND_EVENTS = /* @__PURE__ */ new Set([
      "plan_rejected",
      "gate_rejected",
      "final_rejected",
      "halt",
      "gate_mode_set",
      "source_control_init",
      // Parse-failure recovery loop: step-level `failed` events are not template-indexed
      // by buildEventIndex, so routing `explosion_failed` requires the out-of-band path.
      "explosion_failed"
    ]);
    REVIEW_VERDICTS = Object.freeze({
      APPROVED: "approved",
      CHANGES_REQUESTED: "changes_requested",
      REJECTED: "rejected"
    });
    VALID_VERDICTS = new Set(Object.values(REVIEW_VERDICTS));
    ALLOWED_NODE_TRANSITIONS = /* @__PURE__ */ new Map([
      ["not_started", /* @__PURE__ */ new Set(["in_progress", "skipped", "completed"])],
      ["in_progress", /* @__PURE__ */ new Set(["completed", "failed", "halted"])],
      ["completed", /* @__PURE__ */ new Set(["not_started", "in_progress"])],
      ["failed", /* @__PURE__ */ new Set(["in_progress"])],
      ["halted", /* @__PURE__ */ new Set([])],
      ["skipped", /* @__PURE__ */ new Set([])]
    ]);
  }
});

// cli/src/lib/pipeline-engine/template-validator.ts
function makeError(subtype, templateId, message, detail) {
  return {
    type: "template_validation_error",
    subtype,
    template_id: templateId,
    message,
    detail
  };
}
function validateScope(nodes, templateId, errors, warnings) {
  const scopeIds = new Set(nodes.map((n) => n.id));
  for (const node of nodes) {
    if (!VALID_KINDS.includes(node.kind)) {
      errors.push(makeError(
        "invalid_kind",
        templateId,
        `Template validation failed: invalid node kind.
  Node '${node.id}' has kind: '${node.kind}'
  Valid kinds: step, gate, for_each_phase, for_each_task, conditional, parallel
  Fix: change the kind to one of the valid values above.`,
        { node_id: node.id, invalid_kind: node.kind, valid_kinds: [...VALID_KINDS] }
      ));
    }
  }
  for (const node of nodes) {
    for (const ref of node.depends_on ?? []) {
      if (!scopeIds.has(ref)) {
        errors.push(makeError(
          "dangling_ref",
          templateId,
          `Template validation failed: dangling node reference.
  Node '${node.id}' depends on '${ref}', which is not defined in this scope.
  Fix: add a node with id '${ref}', or remove it from ${node.id}.depends_on.`,
          { node_id: node.id, missing_ref: ref }
        ));
      }
    }
  }
  const inDegree = /* @__PURE__ */ new Map();
  const adjacency = /* @__PURE__ */ new Map();
  for (const node of nodes) {
    inDegree.set(node.id, 0);
    adjacency.set(node.id, []);
  }
  for (const node of nodes) {
    const deps = (node.depends_on ?? []).filter((dep) => scopeIds.has(dep));
    inDegree.set(node.id, deps.length);
    for (const dep of deps) {
      adjacency.get(dep).push(node.id);
    }
  }
  const queue = [];
  for (const [id, deg] of inDegree) {
    if (deg === 0) queue.push(id);
  }
  let processed = 0;
  while (queue.length > 0) {
    const nodeId = queue.shift();
    processed++;
    for (const dependent of adjacency.get(nodeId)) {
      const newDeg = inDegree.get(dependent) - 1;
      inDegree.set(dependent, newDeg);
      if (newDeg === 0) queue.push(dependent);
    }
  }
  if (processed < nodes.length) {
    const cycleNodes = nodes.filter((n) => inDegree.get(n.id) > 0).map((n) => n.id);
    const nodeList = cycleNodes.join(", ");
    errors.push(makeError(
      "cycle_detected",
      templateId,
      `Template validation failed: cycle detected in node dependencies.
  Nodes in cycle: ${nodeList}
  Fix: break the cycle by removing a depends_on reference.`,
      { cycle_nodes: cycleNodes }
    ));
  }
  const referencedIds = /* @__PURE__ */ new Set();
  for (const node of nodes) {
    for (const ref of node.depends_on ?? []) {
      referencedIds.add(ref);
    }
  }
  for (const node of nodes) {
    const deps = node.depends_on ?? [];
    if (deps.length > 0 && !referencedIds.has(node.id)) {
      errors.push(makeError(
        "unreachable_node",
        templateId,
        `Template validation failed: unreachable node.
  Node '${node.id}' has no incoming depends_on references and is not a root node.
  Fix: add '${node.id}' to another node's depends_on, or remove it from the template.`,
        { node_id: node.id }
      ));
    }
  }
  for (const node of nodes) {
    if (node.kind === "for_each_phase" || node.kind === "for_each_task") {
      validateScope(node.body, templateId, errors, warnings);
    } else if (node.kind === "conditional") {
      validateScope(node.branches.true, templateId, errors, warnings);
      validateScope(node.branches.false, templateId, errors, warnings);
    } else if (node.kind === "parallel") {
      validateScope(node.children, templateId, errors, warnings);
    }
  }
}
function validateTemplate(template, templateId) {
  if (template.template.status === "deprecated") {
    return { valid: true, errors: [], warnings: [] };
  }
  const errors = [];
  const warnings = [];
  if (template.template.id !== templateId) {
    warnings.push(makeError(
      "id_mismatch",
      templateId,
      `Template validation warning: template id mismatch.
  Expected: '${templateId}', found: '${template.template.id}'
  This is a warning \u2014 the template will still load.`,
      { expected_id: templateId, actual_id: template.template.id }
    ));
  }
  validateScope(template.nodes, templateId, errors, warnings);
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
var VALID_KINDS;
var init_template_validator = __esm({
  "cli/src/lib/pipeline-engine/template-validator.ts"() {
    "use strict";
    init_constants();
    VALID_KINDS = Object.values(NODE_KINDS);
  }
});

// cli/src/lib/pipeline-engine/template-loader.ts
import * as fs10 from "node:fs";
import * as path15 from "node:path";
function buildEventIndex(nodes, parentPath) {
  const index = /* @__PURE__ */ new Map();
  for (const node of nodes) {
    const templatePath = parentPath === "" ? node.id : `${parentPath}.${node.id}`;
    if (node.kind === "step") {
      const startedEvent = node.events.started;
      const completedEvent = node.events.completed;
      if (index.has(startedEvent)) {
        throw new Error(`Duplicate event name in template: ${startedEvent}`);
      }
      if (index.has(completedEvent)) {
        throw new Error(`Duplicate event name in template: ${completedEvent}`);
      }
      index.set(startedEvent, { nodeDef: node, eventPhase: "started", templatePath });
      index.set(completedEvent, { nodeDef: node, eventPhase: "completed", templatePath });
    } else if (node.kind === "gate") {
      const approvedEvent = node.approved_event;
      if (index.has(approvedEvent)) {
        throw new Error(`Duplicate event name in template: ${approvedEvent}`);
      }
      index.set(approvedEvent, { nodeDef: node, eventPhase: "approved", templatePath });
    } else if (node.kind === "for_each_phase") {
      const childIndex = buildEventIndex(node.body, `${templatePath}.body`);
      for (const [eventName, entry] of childIndex) {
        if (index.has(eventName)) {
          throw new Error(`Duplicate event name in template: ${eventName}`);
        }
        index.set(eventName, entry);
      }
    } else if (node.kind === "for_each_task") {
      const childIndex = buildEventIndex(node.body, `${templatePath}.body`);
      for (const [eventName, entry] of childIndex) {
        if (index.has(eventName)) {
          throw new Error(`Duplicate event name in template: ${eventName}`);
        }
        index.set(eventName, entry);
      }
    } else if (node.kind === "conditional") {
      const trueIndex = buildEventIndex(node.branches.true, `${templatePath}.branches.true`);
      for (const [eventName, entry] of trueIndex) {
        if (index.has(eventName)) {
          throw new Error(`Duplicate event name in template: ${eventName}`);
        }
        index.set(eventName, entry);
      }
      const falseIndex = buildEventIndex(node.branches.false, `${templatePath}.branches.false`);
      for (const [eventName, entry] of falseIndex) {
        if (index.has(eventName)) {
          throw new Error(`Duplicate event name in template: ${eventName}`);
        }
        index.set(eventName, entry);
      }
    } else if (node.kind === "parallel") {
      const childIndex = buildEventIndex(node.children, `${templatePath}.children`);
      for (const [eventName, entry] of childIndex) {
        if (index.has(eventName)) {
          throw new Error(`Duplicate event name in template: ${eventName}`);
        }
        index.set(eventName, entry);
      }
    } else {
      const _exhaustive = node;
      throw new Error(`Unexpected node kind in template: ${_exhaustive.kind}`);
    }
  }
  return index;
}
function loadTemplate(templatePath) {
  let raw;
  try {
    raw = fs10.readFileSync(templatePath, "utf-8");
  } catch (err) {
    if (err !== null && typeof err === "object" && err.code === "ENOENT") {
      throw new Error(`Template file not found: ${templatePath}`);
    }
    throw err;
  }
  let parsed;
  try {
    parsed = load2(raw);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Invalid YAML in template: ${templatePath}: ${message}`);
  }
  if (parsed === null || typeof parsed !== "object") {
    throw new Error("Malformed template: missing template");
  }
  const obj = parsed;
  if (!obj["template"] || typeof obj["template"] !== "object") {
    throw new Error("Malformed template: missing template");
  }
  const header = obj["template"];
  if (!header["id"] || typeof header["id"] !== "string") {
    throw new Error("Malformed template: missing template.id");
  }
  if (!header["version"] || typeof header["version"] !== "string") {
    throw new Error("Malformed template: missing template.version");
  }
  if (!header["description"] || typeof header["description"] !== "string") {
    throw new Error("Malformed template: missing template.description");
  }
  if (!obj["nodes"] || !Array.isArray(obj["nodes"]) || obj["nodes"].length === 0) {
    throw new Error("Malformed template: missing nodes");
  }
  const template = parsed;
  const eventIndex = buildEventIndex(template.nodes, "");
  const templateId = path15.basename(templatePath, ".yml");
  const validationResult = validateTemplate(template, templateId);
  const throwableErrors = validationResult.errors.filter(
    (e) => e.subtype !== "unreachable_node"
  );
  if (throwableErrors.length > 0) {
    const messages = throwableErrors.map((e) => e.message).join("\n");
    throw new Error(`Template validation failed for '${templateId}':
${messages}`);
  }
  return { template, eventIndex };
}
var init_template_loader = __esm({
  "cli/src/lib/pipeline-engine/template-loader.ts"() {
    "use strict";
    init_js_yaml();
    init_template_validator();
  }
});

// cli/src/lib/pipeline-engine/template-resolver.ts
import * as fs11 from "node:fs";
import * as path16 from "node:path";
function resolveTemplateName(state, cliTemplateName, config, projectDir, templatesDir) {
  let templateName;
  let source;
  if (state !== null && state.graph.template_id) {
    templateName = state.graph.template_id;
    source = "state";
  } else if (cliTemplateName !== void 0 && cliTemplateName !== "") {
    templateName = cliTemplateName;
    source = "cli";
  } else if (config.default_template !== "" && config.default_template !== "ask") {
    const raw = config.default_template;
    templateName = CONFIG_SENTINEL_REMAP[raw] ?? raw;
    source = "config";
  } else {
    templateName = "extra-high";
    source = "default";
  }
  const { path: templatePath, isProjectLocal } = resolveTemplatePath(templateName, projectDir, templatesDir);
  return { templateName, templatePath, source, isProjectLocal };
}
function resolveTemplatePath(templateName, projectDir, templatesDir) {
  const projectLocalPath = path16.join(projectDir, "template.yml");
  if (fs11.existsSync(projectLocalPath)) {
    return { path: path16.resolve(projectLocalPath), isProjectLocal: true };
  }
  return { path: path16.join(templatesDir, templateName + ".yml"), isProjectLocal: false };
}
function snapshotTemplate(globalTemplatePath, projectDir) {
  fs11.mkdirSync(projectDir, { recursive: true });
  fs11.copyFileSync(globalTemplatePath, path16.join(projectDir, "template.yml"));
}
var CONFIG_SENTINEL_REMAP;
var init_template_resolver = __esm({
  "cli/src/lib/pipeline-engine/template-resolver.ts"() {
    "use strict";
    CONFIG_SENTINEL_REMAP = {
      default: "extra-high",
      quick: "low",
      full: "extra-high"
    };
  }
});

// cli/src/lib/pipeline-engine/frontmatter-validators.ts
function coerceNull(value) {
  if (value === "null" || value === "undefined") return null;
  return value;
}
function getValidationRules(event) {
  return VALIDATION_RULES[event] ?? [];
}
function validateFrontmatter(event, frontmatter, _docPath) {
  const rules = getValidationRules(event);
  for (const rule of rules) {
    if (rule.when !== void 0 && !rule.when(frontmatter)) {
      continue;
    }
    let value = frontmatter[rule.field];
    if (rule.field === "verdict") {
      value = coerceNull(value);
    }
    if (rule.mustBeAbsent) {
      if (value !== void 0 && value !== null) {
        return {
          error: `Invalid value: ${rule.field} must be ${rule.expected}`,
          event,
          field: rule.field
        };
      }
      continue;
    }
    if (value === void 0 || value === null) {
      return { error: "Missing required field", event, field: rule.field };
    }
    if (rule.field === "tasks") {
      if (!Array.isArray(value)) {
        return { error: "Invalid value: tasks must be an array", event, field: rule.field };
      }
      if (value.length === 0) {
        return { error: "Invalid value: tasks must be a non-empty array", event, field: rule.field };
      }
    } else if (!rule.validate(value)) {
      return {
        error: `Invalid value: ${rule.field} must be ${rule.expected}`,
        event,
        field: rule.field
      };
    }
  }
  return null;
}
var VALIDATION_RULES;
var init_frontmatter_validators = __esm({
  "cli/src/lib/pipeline-engine/frontmatter-validators.ts"() {
    "use strict";
    VALIDATION_RULES = {
      requirements_completed: [
        {
          field: "requirement_count",
          validate: (v) => typeof v === "number" && Number.isInteger(v) && v > 0,
          expected: "a positive integer"
        }
      ],
      plan_approved: [
        {
          field: "total_phases",
          validate: (v) => typeof v === "number" && Number.isInteger(v) && v > 0,
          expected: "a positive integer"
        },
        {
          field: "total_tasks",
          validate: (v) => typeof v === "number" && Number.isInteger(v) && v > 0,
          expected: "a positive integer"
        }
      ],
      // Retained post-Iter 7: event no longer fires, but the phase-plan document
      // contract is still live (explosion-script-authored; consumed downstream).
      // Keeps the rule shape as a schema reference for the existing doc format.
      phase_plan_created: [
        {
          field: "tasks",
          validate: (v) => Array.isArray(v) && v.length > 0,
          expected: "a non-empty array"
        }
      ],
      // Iter 10 — conditional orchestrator-mediation contract. `verdict` is the
      // reviewer's raw verdict; when it is `changes_requested`, the orchestrator's
      // mediation addendum MUST supply `orchestrator_mediated`, `effective_outcome`,
      // and (iff effective_outcome is `changes_requested`) `corrective_handoff_path`.
      // When verdict is `approved` or `rejected`, all three mediation fields must
      // be absent. See ok-write-the-plan-vast-thacker.md for the contract rationale.
      code_review_completed: [
        {
          field: "verdict",
          // Validate the raw verdict is exactly one of the three allowed values —
          // no trimming, no case normalization. A typo or stray whitespace
          // (e.g., "approved ") would otherwise slip past the conditional
          // mediation rules (which gate on exact-string match of
          // 'changes_requested') and surface as a later runtime halt from the
          // mutation's unknown-verdict branch instead of a structured frontmatter
          // error. Fail early here with a clear field-specific message so the
          // operator can fix the frontmatter and re-signal the event.
          validate: (v) => typeof v === "string" && (v === "approved" || v === "changes_requested" || v === "rejected"),
          expected: "one of 'approved', 'changes_requested', 'rejected'"
        },
        // verdict === 'changes_requested' branch — mediation fields required
        {
          field: "orchestrator_mediated",
          validate: (v) => v === true,
          expected: "true (orchestrator mediation required for changes_requested verdicts)",
          when: (fm) => fm.verdict === "changes_requested"
        },
        {
          field: "effective_outcome",
          validate: (v) => v === "approved" || v === "changes_requested",
          expected: "'approved' or 'changes_requested'",
          when: (fm) => fm.verdict === "changes_requested"
        },
        // When effective_outcome is changes_requested, corrective_handoff_path is
        // OPTIONAL. Absence is the orchestrator's budget-exhausted halt signal —
        // the mutation reads effective_outcome=changes_requested + no handoff path
        // as "orchestrator declined to author a handoff because budget is blown"
        // and converts it into a clean pipeline halt. When supplied, the path must
        // be a non-empty string (whitespace-only is rejected).
        {
          field: "corrective_handoff_path",
          validate: (v) => typeof v === "string" && v.trim().length > 0,
          expected: "a non-empty string when supplied",
          when: (fm) => fm.verdict === "changes_requested" && fm.effective_outcome === "changes_requested" && fm.corrective_handoff_path !== void 0 && fm.corrective_handoff_path !== null
        },
        {
          field: "corrective_handoff_path",
          validate: () => true,
          expected: "absent (must be omitted when effective_outcome is approved)",
          when: (fm) => fm.verdict === "changes_requested" && fm.effective_outcome === "approved",
          mustBeAbsent: true
        },
        // verdict ∈ {'approved','rejected'} branch — mediation fields must be absent
        {
          field: "orchestrator_mediated",
          validate: () => true,
          expected: "absent (only permitted on changes_requested verdicts)",
          when: (fm) => fm.verdict === "approved" || fm.verdict === "rejected",
          mustBeAbsent: true
        },
        {
          field: "effective_outcome",
          validate: () => true,
          expected: "absent (only permitted on changes_requested verdicts)",
          when: (fm) => fm.verdict === "approved" || fm.verdict === "rejected",
          mustBeAbsent: true
        },
        {
          field: "corrective_handoff_path",
          validate: () => true,
          expected: "absent (only permitted on changes_requested verdicts)",
          when: (fm) => fm.verdict === "approved" || fm.verdict === "rejected",
          mustBeAbsent: true
        }
      ],
      // Iter 11 — conditional orchestrator-mediation contract (parallels iter-10
      // code_review_completed). `verdict` is the reviewer's raw verdict; when it is
      // `changes_requested`, the orchestrator's mediation addendum MUST supply
      // `orchestrator_mediated`, `effective_outcome`, and (iff effective_outcome is
      // `changes_requested`) `corrective_handoff_path`. When verdict is `approved`
      // or `rejected`, all three mediation fields must be absent. The mutation
      // layer is `mutations.ts` PHASE_REVIEW_COMPLETED; the operator-facing write
      // surface + judgment rubric lives in
      // `harness-files/skills/rad-orchestration/references/corrective-playbook.md`
      // (Phase-Scope Mediation section).
      phase_review_completed: [
        {
          field: "verdict",
          // Validate the raw verdict is exactly one of the three allowed values —
          // no trimming, no case normalization. A typo or stray whitespace
          // (e.g., "approved ") would otherwise slip past the conditional
          // mediation rules (which gate on exact-string match of
          // 'changes_requested') and surface as a later runtime halt from the
          // mutation's unknown-verdict branch instead of a structured frontmatter
          // error. Fail early here with a clear field-specific message so the
          // operator can fix the frontmatter and re-signal the event.
          validate: (v) => typeof v === "string" && (v === "approved" || v === "changes_requested" || v === "rejected"),
          expected: "one of 'approved', 'changes_requested', 'rejected'"
        },
        {
          field: "exit_criteria_met",
          validate: (v) => v !== void 0 && v !== null,
          expected: "a defined value"
        },
        // verdict === 'changes_requested' branch — mediation fields required
        {
          field: "orchestrator_mediated",
          validate: (v) => v === true,
          expected: "true (orchestrator mediation required for changes_requested verdicts)",
          when: (fm) => fm.verdict === "changes_requested"
        },
        {
          field: "effective_outcome",
          validate: (v) => v === "approved" || v === "changes_requested",
          expected: "'approved' or 'changes_requested'",
          when: (fm) => fm.verdict === "changes_requested"
        },
        // When effective_outcome is changes_requested, corrective_handoff_path is
        // OPTIONAL. Absence is the orchestrator's budget-exhausted halt signal —
        // the mutation reads effective_outcome=changes_requested + no handoff path
        // as "orchestrator declined to author a handoff because budget is blown"
        // and converts it into a clean pipeline halt. When supplied, the path must
        // be a non-empty string (whitespace-only is rejected).
        {
          field: "corrective_handoff_path",
          validate: (v) => typeof v === "string" && v.trim().length > 0,
          expected: "a non-empty string when supplied",
          when: (fm) => fm.verdict === "changes_requested" && fm.effective_outcome === "changes_requested" && fm.corrective_handoff_path !== void 0 && fm.corrective_handoff_path !== null
        },
        {
          field: "corrective_handoff_path",
          validate: () => true,
          expected: "absent (must be omitted when effective_outcome is approved)",
          when: (fm) => fm.verdict === "changes_requested" && fm.effective_outcome === "approved",
          mustBeAbsent: true
        },
        // verdict ∈ {'approved','rejected'} branch — mediation fields must be absent
        {
          field: "orchestrator_mediated",
          validate: () => true,
          expected: "absent (only permitted on changes_requested verdicts)",
          when: (fm) => fm.verdict === "approved" || fm.verdict === "rejected",
          mustBeAbsent: true
        },
        {
          field: "effective_outcome",
          validate: () => true,
          expected: "absent (only permitted on changes_requested verdicts)",
          when: (fm) => fm.verdict === "approved" || fm.verdict === "rejected",
          mustBeAbsent: true
        },
        {
          field: "corrective_handoff_path",
          validate: () => true,
          expected: "absent (only permitted on changes_requested verdicts)",
          when: (fm) => fm.verdict === "approved" || fm.verdict === "rejected",
          mustBeAbsent: true
        }
      ],
      // Iter 12 — final_review_completed verdict enum check. Final-review
      // corrective cycles are out of scope (final review is strict-verdict-only;
      // no orchestrator mediation is wired for it). The validator enforces that
      // the reviewer always supplies a valid verdict; mediation fields
      // (`orchestrator_mediated`, `effective_outcome`, `corrective_handoff_path`)
      // are not checked here because they are not part of the final-review
      // contract. A future iteration that wires final-review mediation can extend
      // this rule set with conditional mediation-field rules parallel to the
      // iter-10 code_review_completed + iter-11 phase_review_completed shape.
      final_review_completed: [
        {
          field: "verdict",
          validate: (v) => typeof v === "string" && (v === "approved" || v === "changes_requested" || v === "rejected"),
          expected: "one of 'approved', 'changes_requested', 'rejected'"
        }
      ]
    };
  }
});

// cli/src/lib/pipeline-engine/pre-reads.ts
import { join as join3, isAbsolute } from "node:path";
function extractMasterPlanDocPath(state) {
  if (typeof state !== "object" || state === null) return void 0;
  const s = state;
  if (typeof s.graph !== "object" || s.graph === null) return void 0;
  const g = s.graph;
  if (typeof g.nodes !== "object" || g.nodes === null) return void 0;
  const n = g.nodes;
  if (typeof n.master_plan !== "object" || n.master_plan === null) return void 0;
  const mp = n.master_plan;
  return typeof mp.doc_path === "string" ? mp.doc_path : void 0;
}
function preRead(event, context, readDocument4, projectDir, state, entry) {
  if (event === "plan_approved" && (!context.doc_path || context.doc_path.trim() === "")) {
    const derived = extractMasterPlanDocPath(state);
    if (!derived) {
      return {
        context,
        error: {
          message: "Cannot derive master plan path: graph.nodes.master_plan.doc_path is not set",
          event: "plan_approved",
          field: "doc_path"
        }
      };
    }
    context = { ...context, doc_path: isAbsolute(derived) ? derived : join3(projectDir, derived) };
  }
  if (event === "plan_approved" && context.doc_path) {
    const resolvedPath2 = isAbsolute(context.doc_path) ? context.doc_path : join3(projectDir, context.doc_path);
    const doc2 = readDocument4(resolvedPath2);
    if (doc2 === null) {
      return {
        context,
        error: {
          message: `Pre-read failed: document not found or unreadable: ${resolvedPath2}`,
          event,
          field: "doc_path"
        }
      };
    }
    const enrichedContext2 = { ...doc2.frontmatter, ...context };
    const validationError2 = validateFrontmatter(event, enrichedContext2, resolvedPath2);
    if (validationError2) {
      return {
        context: enrichedContext2,
        error: {
          message: validationError2.error,
          event: validationError2.event,
          field: validationError2.field
        }
      };
    }
    context = enrichedContext2;
  }
  if (entry.eventPhase === "started" || entry.eventPhase === "approved") {
    return { context };
  }
  const { nodeDef } = entry;
  if (nodeDef.kind !== "step" || !nodeDef.doc_output_field) {
    return { context };
  }
  if (!context.doc_path || context.doc_path.trim() === "") {
    return {
      context,
      error: {
        message: "Pre-read failed: missing required field 'doc_path' in event context",
        event,
        field: "doc_path"
      }
    };
  }
  const resolvedPath = isAbsolute(context.doc_path) ? context.doc_path : join3(projectDir, context.doc_path);
  const doc = readDocument4(resolvedPath);
  if (doc === null) {
    return {
      context,
      error: {
        message: `Pre-read failed: document not found or unreadable: ${resolvedPath}`,
        event,
        field: "doc_path"
      }
    };
  }
  const enrichedContext = { ...doc.frontmatter, ...context };
  const validationError = validateFrontmatter(event, enrichedContext, resolvedPath);
  if (validationError) {
    return {
      context: enrichedContext,
      error: {
        message: validationError.error,
        event: validationError.event,
        field: validationError.field
      }
    };
  }
  return { context: enrichedContext };
}
var init_pre_reads = __esm({
  "cli/src/lib/pipeline-engine/pre-reads.ts"() {
    "use strict";
    init_frontmatter_validators();
  }
});

// cli/src/lib/pipeline-engine/scaffold.ts
function scaffoldNodeState(nodeDef) {
  switch (nodeDef.kind) {
    case "step":
      return { kind: "step", status: NODE_STATUSES.NOT_STARTED, doc_path: null, retries: 0 };
    case "gate":
      return { kind: "gate", status: NODE_STATUSES.NOT_STARTED, gate_active: false };
    case "conditional":
      return { kind: "conditional", status: NODE_STATUSES.NOT_STARTED, branch_taken: null };
    case "parallel": {
      const pDef = nodeDef;
      const nodes = {};
      for (const child of pDef.children) {
        nodes[child.id] = scaffoldNodeState(child);
      }
      return { kind: "parallel", status: NODE_STATUSES.NOT_STARTED, nodes };
    }
    case "for_each_phase":
      return { kind: "for_each_phase", status: NODE_STATUSES.NOT_STARTED, iterations: [] };
    case "for_each_task":
      return { kind: "for_each_task", status: NODE_STATUSES.NOT_STARTED, iterations: [] };
    default: {
      const _exhaustive = nodeDef;
      throw new Error(`Unexpected node kind: ${_exhaustive.kind}`);
    }
  }
}
var init_scaffold = __esm({
  "cli/src/lib/pipeline-engine/scaffold.ts"() {
    "use strict";
    init_constants();
  }
});

// cli/src/lib/pipeline-engine/context-enrichment.ts
function buildRepositorySkillsBlock(state) {
  const repoRoot = state.pipeline.source_control?.worktree_path ?? process.cwd();
  let arr;
  try {
    arr = buildSkillManifest({ repoRoot });
  } catch (err) {
    console.warn(
      `context-enrichment: buildSkillManifest failed (${err.message}); emitting empty repository_skills_block`
    );
    return "";
  }
  if (!Array.isArray(arr) || arr.length === 0) return "";
  const json2 = JSON.stringify(arr, null, 2);
  return `

## Repository Skills Available

${json2}

Entries above are a catalog. Read a listed path **only when** its description matches the work you are about to plan \u2014 skip the rest to avoid token waste. Any \`SKILL.md\` you encounter outside this catalog (e.g., via Grep/Glob) was filtered on purpose; do not Read it.
`;
}
function formatPhaseId(phaseNumber) {
  return `P${String(phaseNumber).padStart(2, "0")}`;
}
function formatTaskId(phaseNumber, taskNumber) {
  return `${formatPhaseId(phaseNumber)}-T${String(taskNumber).padStart(2, "0")}`;
}
function resolveActivePhaseIndex(state) {
  const phaseLoop = state.graph.nodes["phase_loop"];
  if (!phaseLoop?.iterations?.length) return 1;
  const matches = phaseLoop.iterations.filter((it) => it.status === "in_progress");
  if (matches.length > 1) {
    throw new Error(
      `Ambiguous phase resolution: ${matches.length} phases are in_progress simultaneously. Pass --phase <N> to specify explicitly.`
    );
  }
  if (matches.length === 1) return matches[0].index + 1;
  const notStarted = phaseLoop.iterations.find((it) => it.status === "not_started");
  if (notStarted) return notStarted.index + 1;
  return 1;
}
function resolveActiveTaskIndex(state, phaseIndex) {
  const phaseLoop = state.graph.nodes["phase_loop"];
  if (!phaseLoop?.iterations?.length) return 1;
  const phaseIteration = phaseLoop.iterations[phaseIndex - 1];
  if (!phaseIteration?.nodes) return 1;
  const taskLoop = phaseIteration.nodes["task_loop"];
  if (!taskLoop?.iterations?.length) return 1;
  const matches = taskLoop.iterations.filter((it) => it.status === "in_progress");
  if (matches.length > 1) {
    throw new Error(
      `Ambiguous task resolution: ${matches.length} tasks are in_progress simultaneously in phase ${phaseIndex}. Pass --task <N> to specify explicitly.`
    );
  }
  if (matches.length === 1) return matches[0].index + 1;
  const notStarted = taskLoop.iterations.find((it) => it.status === "not_started");
  if (notStarted) return notStarted.index + 1;
  return 1;
}
function enrichActionContext(input) {
  const { action, walkerContext, state } = input;
  if (action in PLANNING_SPAWN_STEPS) {
    const repository_skills_block = buildRepositorySkillsBlock(state);
    const base = {
      ...walkerContext,
      step: PLANNING_SPAWN_STEPS[action],
      repository_skills_block
    };
    if (action === "spawn_master_plan") {
      return {
        ...base,
        limits: {
          max_phases: input.config.limits.max_phases,
          max_tasks_per_phase: input.config.limits.max_tasks_per_phase
        }
      };
    }
    return base;
  }
  if (PHASE_LEVEL_ACTIONS.has(action)) {
    const phaseNumber = resolveActivePhaseIndex(state);
    const phase_id = formatPhaseId(phaseNumber);
    const base = { ...walkerContext, phase_number: phaseNumber, phase_id };
    if (action === "spawn_phase_reviewer") {
      const phaseLoop = state.graph.nodes["phase_loop"];
      const phaseIter = phaseLoop?.iterations[phaseNumber - 1];
      const taskLoop = phaseIter?.nodes["task_loop"];
      const taskIters = taskLoop?.iterations ?? [];
      const firstTask = taskIters[0];
      const lastTask = taskIters[taskIters.length - 1];
      const phase_first_sha = firstTask?.commit_hash ?? null;
      const lastTaskFinalCorrective = lastTask?.corrective_tasks.slice().reverse().find((ct) => ct.commit_hash != null);
      const phase_head_sha = lastTaskFinalCorrective?.commit_hash ?? lastTask?.commit_hash ?? null;
      const correctiveFields = phaseIter && phaseIter.corrective_tasks.length > 0 ? { is_correction: true, corrective_index: phaseIter.corrective_tasks.length } : {};
      return { ...base, phase_first_sha, phase_head_sha, ...correctiveFields };
    }
    return base;
  }
  if (TASK_LEVEL_ACTIONS.has(action)) {
    const phaseNumber = resolveActivePhaseIndex(state);
    const taskNumber = resolveActiveTaskIndex(state, phaseNumber);
    const phase_id = formatPhaseId(phaseNumber);
    const task_id = formatTaskId(phaseNumber, taskNumber);
    const base = {
      ...walkerContext,
      phase_number: phaseNumber,
      phase_id,
      task_number: taskNumber,
      task_id
    };
    const phaseLoopForSentinel = state.graph.nodes["phase_loop"];
    const phaseIterForSentinel = phaseLoopForSentinel?.iterations[phaseNumber - 1];
    const phaseCorrectives = phaseIterForSentinel?.corrective_tasks ?? [];
    const phaseCorrectiveActive = phaseCorrectives.length > 0 && (phaseCorrectives[phaseCorrectives.length - 1].status === "not_started" || phaseCorrectives[phaseCorrectives.length - 1].status === "in_progress");
    if (phaseCorrectiveActive) {
      base.task_number = null;
      base.task_id = `${phase_id}-PHASE`;
    }
    if (action === "execute_task") {
      const phaseLoop = state.graph.nodes["phase_loop"];
      const phaseIter = phaseLoop?.iterations[phaseNumber - 1];
      const phaseCTs = phaseIter?.corrective_tasks ?? [];
      const activePhaseCorrective = phaseCTs.length > 0 ? phaseCTs[phaseCTs.length - 1] : void 0;
      if (activePhaseCorrective && (activePhaseCorrective.status === "not_started" || activePhaseCorrective.status === "in_progress")) {
        const phaseCorrectiveDoc = activePhaseCorrective.doc_path;
        if (typeof phaseCorrectiveDoc === "string" && phaseCorrectiveDoc.trim().length > 0) {
          return { ...base, handoff_doc: phaseCorrectiveDoc };
        }
      }
      const taskLoop = phaseIter?.nodes["task_loop"];
      const taskIter = taskLoop?.iterations[taskNumber - 1];
      const correctives = taskIter?.corrective_tasks ?? [];
      const activeCorrective = correctives.length > 0 ? correctives[correctives.length - 1] : void 0;
      if (activeCorrective && (activeCorrective.status === "not_started" || activeCorrective.status === "in_progress")) {
        const correctiveDoc = activeCorrective.doc_path;
        if (typeof correctiveDoc === "string" && correctiveDoc.trim().length > 0) {
          return { ...base, handoff_doc: correctiveDoc };
        }
      }
      const handoff_doc = taskIter?.doc_path ?? "";
      return { ...base, handoff_doc };
    }
    if (action === "spawn_code_reviewer") {
      const phaseLoop = state.graph.nodes["phase_loop"];
      const phaseIter = phaseLoop?.iterations[phaseNumber - 1];
      const phaseCTs = phaseIter?.corrective_tasks ?? [];
      const activePhaseCorrective = phaseCTs.slice().reverse().find(
        (ct) => ct.status === "in_progress" || ct.status === "not_started"
      );
      if (activePhaseCorrective) {
        const head_sha2 = activePhaseCorrective.commit_hash ?? null;
        return {
          ...base,
          head_sha: head_sha2,
          is_correction: true,
          corrective_index: activePhaseCorrective.index
        };
      }
      const taskLoop = phaseIter?.nodes["task_loop"];
      const taskIter = taskLoop?.iterations[taskNumber - 1];
      const correctives = taskIter?.corrective_tasks ?? [];
      const activeCorrective = correctives.slice().reverse().find(
        (ct) => ct.status === "in_progress" || ct.status === "not_started"
      );
      const head_sha = activeCorrective ? activeCorrective.commit_hash ?? null : taskIter?.commit_hash ?? null;
      const correctiveFields = activeCorrective ? { is_correction: true, corrective_index: activeCorrective.index } : {};
      return { ...base, head_sha, ...correctiveFields };
    }
    return base;
  }
  if (action === "invoke_source_control_commit") {
    const phaseNumber = resolveActivePhaseIndex(state);
    const taskNumber = resolveActiveTaskIndex(state, phaseNumber);
    return {
      ...walkerContext,
      phase_number: phaseNumber,
      phase_id: formatPhaseId(phaseNumber),
      task_number: taskNumber,
      task_id: formatTaskId(phaseNumber, taskNumber),
      branch: state.pipeline.source_control?.branch ?? "",
      worktree_path: state.pipeline.source_control?.worktree_path ?? ""
    };
  }
  if (action === "invoke_source_control_pr") {
    return {
      ...walkerContext,
      branch: state.pipeline.source_control?.branch ?? "",
      base_branch: state.pipeline.source_control?.base_branch ?? "",
      worktree_path: state.pipeline.source_control?.worktree_path ?? ""
    };
  }
  if (action === "request_final_approval") {
    return {
      ...walkerContext,
      pr_url: state.pipeline.source_control?.pr_url ?? null
    };
  }
  if (action === "spawn_final_reviewer") {
    const phaseLoop = state.graph.nodes["phase_loop"];
    const commits = [];
    const phaseIterations = phaseLoop?.iterations ?? [];
    for (const phaseIter of phaseIterations) {
      const taskLoop = phaseIter.nodes["task_loop"];
      const taskIterations = taskLoop?.iterations ?? [];
      for (const taskIter of taskIterations) {
        if (taskIter.commit_hash != null) commits.push(taskIter.commit_hash);
        for (const ct of taskIter.corrective_tasks ?? []) {
          if (ct.commit_hash != null) commits.push(ct.commit_hash);
        }
      }
      for (const ct of phaseIter.corrective_tasks ?? []) {
        if (ct.commit_hash != null) commits.push(ct.commit_hash);
      }
    }
    const project_base_sha = commits.length > 0 ? commits[0] : null;
    const project_head_sha = commits.length > 0 ? commits[commits.length - 1] : null;
    return {
      ...walkerContext,
      project_base_sha,
      project_head_sha
    };
  }
  if (EMPTY_CONTEXT_ACTIONS.has(action)) {
    return { ...walkerContext };
  }
  if (action === "display_halted") {
    return {
      ...walkerContext,
      details: walkerContext.details ?? `Pipeline halted at node: ${state.graph.current_node_path ?? "unknown"}`
    };
  }
  return { ...walkerContext };
}
var PLANNING_SPAWN_STEPS, PHASE_LEVEL_ACTIONS, TASK_LEVEL_ACTIONS, EMPTY_CONTEXT_ACTIONS;
var init_context_enrichment = __esm({
  "cli/src/lib/pipeline-engine/context-enrichment.ts"() {
    "use strict";
    init_skill_manifest();
    PLANNING_SPAWN_STEPS = {
      spawn_requirements: "requirements",
      spawn_master_plan: "master_plan"
    };
    PHASE_LEVEL_ACTIONS = /* @__PURE__ */ new Set([
      "spawn_phase_reviewer",
      "gate_phase"
    ]);
    TASK_LEVEL_ACTIONS = /* @__PURE__ */ new Set([
      "execute_task",
      "spawn_code_reviewer",
      "gate_task"
    ]);
    EMPTY_CONTEXT_ACTIONS = /* @__PURE__ */ new Set([
      "request_plan_approval",
      "ask_gate_mode",
      "display_complete"
    ]);
  }
});

// cli/src/lib/pipeline-engine/mutations.ts
function resolveNodeState(state, nodeId, scope, phase, task) {
  if (scope === "top") {
    return state.graph.nodes[nodeId];
  }
  if (phase === void 0) {
    throw new Error(`resolveNodeState: scope is '${scope}' but phase is undefined`);
  }
  const phaseLoopNode = state.graph.nodes["phase_loop"];
  if (phaseLoopNode.kind !== "for_each_phase") {
    throw new Error(`Expected phase_loop to be a for_each_phase node, got ${phaseLoopNode.kind}`);
  }
  const phaseIteration = phaseLoopNode.iterations[phase - 1];
  if (scope === "phase") {
    return phaseIteration.nodes[nodeId];
  }
  if (phaseIteration.corrective_tasks.length > 0) {
    const latest = phaseIteration.corrective_tasks[phaseIteration.corrective_tasks.length - 1];
    if ((latest.status === "in_progress" || latest.status === "not_started") && nodeId in latest.nodes) {
      return latest.nodes[nodeId];
    }
  }
  const taskLoopNode = phaseIteration.nodes["task_loop"];
  if (taskLoopNode.kind !== "for_each_task") {
    throw new Error(`Expected task_loop to be a for_each_task node, got ${taskLoopNode.kind}`);
  }
  const taskIteration = taskLoopNode.iterations[(task ?? 1) - 1];
  if (taskIteration.corrective_tasks.length > 0) {
    const latest = taskIteration.corrective_tasks[taskIteration.corrective_tasks.length - 1];
    if ((latest.status === "in_progress" || latest.status === "not_started") && nodeId in latest.nodes) {
      return latest.nodes[nodeId];
    }
  }
  return taskIteration.nodes[nodeId];
}
function resolvePhaseIteration(state, phase) {
  const phaseLoopNode = state.graph.nodes["phase_loop"];
  if (phaseLoopNode.kind !== "for_each_phase") {
    throw new Error(`Expected phase_loop to be a for_each_phase node, got ${phaseLoopNode.kind}`);
  }
  return phaseLoopNode.iterations[phase - 1];
}
function resolveTaskIteration(state, phase, task) {
  const phaseLoopNode = state.graph.nodes["phase_loop"];
  if (phaseLoopNode.kind !== "for_each_phase") {
    throw new Error(`Expected phase_loop to be a for_each_phase node, got ${phaseLoopNode.kind}`);
  }
  const phaseIteration = phaseLoopNode.iterations[phase - 1];
  const taskLoopNode = phaseIteration.nodes["task_loop"];
  if (taskLoopNode.kind !== "for_each_task") {
    throw new Error(`Expected task_loop to be a for_each_task node, got ${taskLoopNode.kind}`);
  }
  return taskLoopNode.iterations[task - 1];
}
function findTaskLoopBodyDefs(template) {
  for (const nodeDef of template.nodes) {
    if (nodeDef.kind === "for_each_phase") {
      for (const bodyNode of nodeDef.body) {
        if (bodyNode.kind === "for_each_task") {
          return bodyNode.body;
        }
      }
    }
  }
  return [];
}
function resolveHostingIteration(state, phase, task) {
  const phaseIter = resolvePhaseIteration(state, phase);
  const phaseCTs = phaseIter.corrective_tasks;
  if (phaseCTs.length > 0) {
    const last = phaseCTs[phaseCTs.length - 1];
    if ((last.status === "in_progress" || last.status === "not_started") && "code_review" in last.nodes) {
      return { iteration: phaseIter, scope: "phase" };
    }
  }
  return { iteration: resolveTaskIteration(state, phase, task), scope: "task" };
}
function normalizeOptionalUrl(raw) {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return trimmed === "" ? null : trimmed;
}
function normalizeAutoSetting(field, raw) {
  if (typeof raw !== "string") {
    throw new Error(
      `source_control_init: ${field} must be one of "always" | "yes" | "never" | "no", got ${raw === void 0 ? "undefined" : JSON.stringify(raw)}`
    );
  }
  const v = raw.trim().toLowerCase();
  if (v === "always" || v === "yes") return "always";
  if (v === "never" || v === "no") return "never";
  throw new Error(
    `source_control_init: ${field} must be one of "always" | "yes" | "never" | "no", got ${JSON.stringify(raw)}`
  );
}
function getMutation(event) {
  return mutationRegistry.get(event);
}
var mutationRegistry, planningStartedSteps, planningCompletedSteps, MAX_PARSE_RETRIES, phaseExecStartedSteps, taskStartedSteps;
var init_mutations = __esm({
  "cli/src/lib/pipeline-engine/mutations.ts"() {
    "use strict";
    init_constants();
    init_scaffold();
    init_context_enrichment();
    mutationRegistry = /* @__PURE__ */ new Map();
    planningStartedSteps = [
      [EVENTS.REQUIREMENTS_STARTED, "requirements"],
      [EVENTS.MASTER_PLAN_STARTED, "master_plan"]
    ];
    for (const [eventName, nodeId] of planningStartedSteps) {
      mutationRegistry.set(eventName, (state, _context, _config, _template) => {
        const cloned = structuredClone(state);
        const mutations_applied = [];
        const node = resolveNodeState(cloned, nodeId, "top");
        node.status = "in_progress";
        mutations_applied.push(`set ${nodeId}.status = in_progress`);
        if (eventName === EVENTS.REQUIREMENTS_STARTED) {
          cloned.graph.status = "in_progress";
          mutations_applied.push("set graph.status = in_progress");
        }
        return { state: cloned, mutations_applied };
      });
    }
    planningCompletedSteps = [
      [EVENTS.REQUIREMENTS_COMPLETED, "requirements"],
      [EVENTS.MASTER_PLAN_COMPLETED, "master_plan"]
    ];
    for (const [eventName, nodeId] of planningCompletedSteps) {
      mutationRegistry.set(eventName, (state, context, _config, _template) => {
        const cloned = structuredClone(state);
        const mutations_applied = [];
        const node = resolveNodeState(cloned, nodeId, "top");
        node.status = "completed";
        mutations_applied.push(`set ${nodeId}.status = completed`);
        const docPath = context.doc_path ?? null;
        node.doc_path = docPath;
        mutations_applied.push(`set ${nodeId}.doc_path = ${docPath ?? "null"}`);
        return { state: cloned, mutations_applied };
      });
    }
    mutationRegistry.set(EVENTS.EXPLOSION_STARTED, (state, _context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      const node = resolveNodeState(cloned, "explode_master_plan", "top");
      node.status = "in_progress";
      mutations_applied.push("set explode_master_plan.status = in_progress");
      node.doc_path = null;
      mutations_applied.push("set explode_master_plan.doc_path = null");
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.EXPLOSION_COMPLETED, (state, _context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      const node = resolveNodeState(cloned, "explode_master_plan", "top");
      node.status = "completed";
      mutations_applied.push("set explode_master_plan.status = completed");
      node.doc_path = null;
      mutations_applied.push("set explode_master_plan.doc_path = null");
      const masterPlanNode = resolveNodeState(cloned, "master_plan", "top");
      if (masterPlanNode.last_parse_error !== null && masterPlanNode.last_parse_error !== void 0) {
        masterPlanNode.last_parse_error = null;
        mutations_applied.push("cleared master_plan.last_parse_error");
      }
      masterPlanNode.parse_retry_count = 0;
      mutations_applied.push("reset master_plan.parse_retry_count = 0");
      return { state: cloned, mutations_applied };
    });
    MAX_PARSE_RETRIES = 3;
    mutationRegistry.set(EVENTS.EXPLOSION_FAILED, (state, context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      const masterPlanNode = resolveNodeState(cloned, "master_plan", "top");
      const explodeNode = resolveNodeState(cloned, "explode_master_plan", "top");
      const parseError = context.parse_error;
      if (!parseError || !Number.isInteger(parseError.line) || parseError.line < 1 || typeof parseError.expected !== "string" || typeof parseError.found !== "string" || typeof parseError.message !== "string") {
        explodeNode.status = "failed";
        explodeNode.doc_path = null;
        cloned.graph.status = "halted";
        cloned.pipeline.halt_reason = "Explosion dispatch error: explosion_failed received without a valid parse_error payload. This is a programmer error \u2014 the orchestrator or CLI wrapper must pass --parse-error with { line, expected, found, message }.";
        mutations_applied.push("set explode_master_plan.status = failed (invalid dispatch)");
        mutations_applied.push("set explode_master_plan.doc_path = null (invalid dispatch)");
        mutations_applied.push("set graph.status = halted (dispatch error)");
        mutations_applied.push("set pipeline.halt_reason (dispatch error)");
        return { state: cloned, mutations_applied };
      }
      masterPlanNode.last_parse_error = parseError;
      mutations_applied.push(
        `set master_plan.last_parse_error = { line: ${parseError.line}, ... }`
      );
      const previousCount = masterPlanNode.parse_retry_count ?? 0;
      const nextCount = previousCount + 1;
      masterPlanNode.parse_retry_count = nextCount;
      mutations_applied.push(`set master_plan.parse_retry_count = ${nextCount}`);
      if (nextCount > MAX_PARSE_RETRIES) {
        explodeNode.status = "failed";
        mutations_applied.push(`set explode_master_plan.status = failed (parse retry cap ${MAX_PARSE_RETRIES} exceeded)`);
        explodeNode.doc_path = null;
        mutations_applied.push("set explode_master_plan.doc_path = null");
        cloned.graph.status = "halted";
        mutations_applied.push("set graph.status = halted");
        const reasonMsg = parseError.message;
        cloned.pipeline.halt_reason = `Explosion parser rejected planner output ${nextCount} times (cap=${MAX_PARSE_RETRIES}). Manual intervention required. Last error: ${reasonMsg}`;
        mutations_applied.push(`set pipeline.halt_reason (parse retry cap exceeded)`);
        return { state: cloned, mutations_applied };
      }
      explodeNode.status = "not_started";
      explodeNode.doc_path = null;
      mutations_applied.push("set explode_master_plan.status = not_started");
      mutations_applied.push("set explode_master_plan.doc_path = null (recovery reset)");
      masterPlanNode.status = "in_progress";
      mutations_applied.push("set master_plan.status = in_progress (recovery re-spawn)");
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.PLAN_APPROVED, (state, _context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      const node = resolveNodeState(cloned, "plan_approval_gate", "top");
      node.status = "completed";
      node.gate_active = true;
      mutations_applied.push("set plan_approval_gate.status = completed");
      mutations_applied.push("set plan_approval_gate.gate_active = true");
      cloned.pipeline.current_tier = "execution";
      mutations_applied.push("set pipeline.current_tier = execution");
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.TASK_GATE_APPROVED, (state, context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      const node = resolveNodeState(cloned, "task_gate", "task", context.phase, context.task);
      node.status = "completed";
      node.gate_active = true;
      mutations_applied.push("set task_gate.status = completed");
      mutations_applied.push("set task_gate.gate_active = true");
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.PHASE_GATE_APPROVED, (state, context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      const node = resolveNodeState(cloned, "phase_gate", "phase", context.phase);
      node.status = "completed";
      node.gate_active = true;
      mutations_applied.push("set phase_gate.status = completed");
      mutations_applied.push("set phase_gate.gate_active = true");
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.FINAL_APPROVED, (state, _context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      const node = resolveNodeState(cloned, "final_approval_gate", "top");
      node.status = "completed";
      node.gate_active = true;
      mutations_applied.push("set final_approval_gate.status = completed");
      mutations_applied.push("set final_approval_gate.gate_active = true");
      return { state: cloned, mutations_applied };
    });
    phaseExecStartedSteps = [
      [EVENTS.PHASE_REVIEW_STARTED, "phase_review"]
    ];
    for (const [eventName, nodeId] of phaseExecStartedSteps) {
      mutationRegistry.set(eventName, (state, context, _config, _template) => {
        const cloned = structuredClone(state);
        const mutations_applied = [];
        const phase = context.phase ?? resolveActivePhaseIndex(cloned);
        try {
          const node = resolveNodeState(cloned, nodeId, "phase", phase);
          node.status = "in_progress";
          mutations_applied.push(`set ${nodeId}.status = in_progress`);
        } catch (err) {
          throw new Error(
            `Cannot apply mutation for "${eventName}": no active phase could be resolved from state.
Either no phase is currently in_progress, or multiple phases are in_progress simultaneously.
Pass --phase <N> to specify the phase explicitly.`
          );
        }
        return { state: cloned, mutations_applied };
      });
    }
    mutationRegistry.set(EVENTS.PHASE_REVIEW_COMPLETED, (state, context, config, template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      let phase = context.phase;
      if (phase === void 0) {
        try {
          phase = resolveActivePhaseIndex(cloned);
        } catch (err) {
          const detail = err instanceof Error ? err.message : String(err);
          throw new Error(
            `Cannot apply mutation for "phase_review_completed": failed to resolve the active phase from state.
${detail}
Pass --phase <N> to specify the phase explicitly.`
          );
        }
      }
      let node;
      try {
        node = resolveNodeState(cloned, "phase_review", "phase", phase);
      } catch (err) {
        const detail = err instanceof Error ? err.message : String(err);
        throw new Error(
          `Cannot apply mutation for "phase_review_completed": could not resolve phase_review for phase ${phase}.
${detail}
Pass --phase <N> to specify an existing phase explicitly.`
        );
      }
      node.status = "completed";
      mutations_applied.push("set phase_review.status = completed");
      const docPath = context.doc_path ?? null;
      node.doc_path = docPath;
      mutations_applied.push(`set phase_review.doc_path = ${docPath ?? "null"}`);
      const rawVerdict = context.verdict ?? null;
      const effectiveOutcome = context.effective_outcome;
      const correctiveHandoffPath = context.corrective_handoff_path;
      const orchestratorMediated = context.orchestrator_mediated;
      const mediationActive = rawVerdict === REVIEW_VERDICTS.CHANGES_REQUESTED && orchestratorMediated === true && effectiveOutcome !== void 0 && effectiveOutcome !== null;
      const verdictForState = mediationActive ? effectiveOutcome : rawVerdict;
      node.verdict = verdictForState;
      mutations_applied.push(`set phase_review.verdict = ${verdictForState ?? "null"}`);
      if (rawVerdict !== null && !VALID_VERDICTS.has(rawVerdict)) {
        cloned.graph.status = "halted";
        cloned.pipeline.halt_reason = `Unrecognized verdict '${rawVerdict}' in phase_review_completed`;
        return {
          state: cloned,
          mutations_applied: [
            ...mutations_applied,
            `set graph.status = halted (unrecognized verdict '${rawVerdict}')`
          ]
        };
      }
      const routingVerdict = verdictForState;
      if (routingVerdict === REVIEW_VERDICTS.CHANGES_REQUESTED) {
        const iteration = resolvePhaseIteration(cloned, phase);
        const correctiveCount = iteration.corrective_tasks.length;
        const maxRetries = config.limits.max_retries_per_task;
        const trimmedHandoffPath = typeof correctiveHandoffPath === "string" ? correctiveHandoffPath.trim() : "";
        const hasHandoffPath = trimmedHandoffPath.length > 0;
        if (!hasHandoffPath) {
          iteration.status = "halted";
          cloned.graph.status = "halted";
          cloned.pipeline.halt_reason = `phase_review_completed: effective_outcome=changes_requested with no corrective_handoff_path. Possible causes: (1) budget exhausted (phase corrective_tasks.length=${correctiveCount}, max_retries_per_task=${maxRetries}) \u2014 this is the expected halt per the corrective-playbook; (2) orchestrator omitted the handoff path in error \u2014 check the review addendum.`;
          mutations_applied.push("set phase_iteration.status = halted (effective_outcome=changes_requested, no handoff)");
          mutations_applied.push("set graph.status = halted");
          mutations_applied.push("set pipeline.halt_reason (budget-exhausted halt signal)");
          return { state: cloned, mutations_applied };
        }
        if (correctiveCount >= maxRetries) {
          iteration.status = "halted";
          cloned.graph.status = "halted";
          cloned.pipeline.halt_reason = `Retry budget exhausted for phase (max_retries_per_task=${maxRetries}) but a corrective_handoff_path was supplied. The orchestrator must not author a corrective handoff on exhaustion \u2014 this is a contract violation.`;
          mutations_applied.push("set phase_iteration.status = halted (retry budget exhausted; handoff path supplied)");
          mutations_applied.push("set graph.status = halted");
          mutations_applied.push("set pipeline.halt_reason (budget exhausted with supplied handoff path)");
          return { state: cloned, mutations_applied };
        }
        const bodyDefs = findTaskLoopBodyDefs(template);
        if (bodyDefs.length === 0) {
          throw new Error("findTaskLoopBodyDefs: no for_each_task body found in template");
        }
        const nodes = {};
        for (const bodyDef of bodyDefs) {
          nodes[bodyDef.id] = scaffoldNodeState(bodyDef);
        }
        const entry = {
          index: correctiveCount + 1,
          reason: context.reason ?? "Phase review requested changes",
          injected_after: "phase_review",
          status: "not_started",
          nodes,
          doc_path: trimmedHandoffPath,
          commit_hash: null
        };
        iteration.corrective_tasks.push(entry);
        mutations_applied.push(`injected phase corrective task ${entry.index} (changes_requested)`);
        mutations_applied.push(`set phase_corrective_task[${entry.index}].doc_path = ${trimmedHandoffPath}`);
        mutations_applied.push(`phase corrective_tasks.length = ${iteration.corrective_tasks.length}`);
      } else if (routingVerdict === REVIEW_VERDICTS.REJECTED) {
        const iteration = resolvePhaseIteration(cloned, phase);
        iteration.status = "halted";
        cloned.graph.status = "halted";
        cloned.pipeline.halt_reason = `Phase review rejected: reviewer issued a 'rejected' verdict. Rejected verdicts halt the pipeline with no corrective cycle \u2014 no retry is attempted.`;
        mutations_applied.push("set phase_iteration.status = halted (rejected verdict)");
        mutations_applied.push("set graph.status = halted");
        mutations_applied.push("set pipeline.halt_reason (reviewer rejected verdict)");
      } else if (rawVerdict === REVIEW_VERDICTS.CHANGES_REQUESTED && routingVerdict !== REVIEW_VERDICTS.CHANGES_REQUESTED && routingVerdict !== REVIEW_VERDICTS.APPROVED) {
        throw new Error(
          "phase_review_completed: raw verdict=changes_requested without a valid effective_outcome. The orchestrator mediation contract was bypassed \u2014 ensure the review doc carries orchestrator_mediated=true and effective_outcome \u2208 {approved, changes_requested}."
        );
      }
      return { state: cloned, mutations_applied };
    });
    taskStartedSteps = [
      [EVENTS.EXECUTION_STARTED, "task_executor"],
      [EVENTS.CODE_REVIEW_STARTED, "code_review"]
    ];
    for (const [eventName, nodeId] of taskStartedSteps) {
      mutationRegistry.set(eventName, (state, context, _config, _template) => {
        const cloned = structuredClone(state);
        const mutations_applied = [];
        let phase = context.phase;
        if (phase === void 0) {
          try {
            phase = resolveActivePhaseIndex(cloned);
          } catch {
            throw new Error(
              `Cannot apply mutation for "${eventName}": no active phase could be resolved from state.
Either no phase is currently in_progress, or multiple phases are in_progress simultaneously.
Pass --phase <N> to specify the phase explicitly.`
            );
          }
        }
        let task = context.task;
        if (task === void 0) {
          try {
            task = resolveActiveTaskIndex(cloned, phase);
          } catch {
            throw new Error(
              `Cannot apply mutation for "${eventName}": no active task could be resolved from state for phase ${phase}.
Either no task is currently in_progress, or multiple tasks are in_progress simultaneously.
Pass --task <N> to specify the task explicitly.`
            );
          }
        }
        try {
          const node = resolveNodeState(cloned, nodeId, "task", phase, task);
          node.status = "in_progress";
          mutations_applied.push(`set ${nodeId}.status = in_progress`);
        } catch {
          if (context.phase === void 0) {
            const phaseLoopNode = cloned.graph.nodes["phase_loop"];
            const hasInProgressPhase = phaseLoopNode?.iterations?.some((it) => it.status === "in_progress");
            if (hasInProgressPhase) {
              throw new Error(
                `Cannot apply mutation for "${eventName}": no active task could be resolved from state for phase ${phase}.
Either no task is currently in_progress, or multiple tasks are in_progress simultaneously.
Pass --task <N> to specify the task explicitly.`
              );
            }
            throw new Error(
              `Cannot apply mutation for "${eventName}": no active phase could be resolved from state.
Either no phase is currently in_progress, or multiple phases are in_progress simultaneously.
Pass --phase <N> to specify the phase explicitly.`
            );
          }
          throw new Error(
            `Cannot apply mutation for "${eventName}": no active task could be resolved from state for phase ${phase}.
Either no task is currently in_progress, or multiple tasks are in_progress simultaneously.
Pass --task <N> to specify the task explicitly.`
          );
        }
        return { state: cloned, mutations_applied };
      });
    }
    mutationRegistry.set(EVENTS.TASK_COMPLETED, (state, context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      let phase = context.phase;
      if (phase === void 0) {
        try {
          phase = resolveActivePhaseIndex(cloned);
        } catch {
          throw new Error(
            `Cannot apply mutation for "task_completed": no active phase could be resolved from state.
Either no phase is currently in_progress, or multiple phases are in_progress simultaneously.
Pass --phase <N> to specify the phase explicitly.`
          );
        }
      }
      let task = context.task;
      if (task === void 0) {
        try {
          task = resolveActiveTaskIndex(cloned, phase);
        } catch {
          throw new Error(
            `Cannot apply mutation for "task_completed": no active task could be resolved from state for phase ${phase}.
Either no task is currently in_progress, or multiple tasks are in_progress simultaneously.
Pass --task <N> to specify the task explicitly.`
          );
        }
      }
      try {
        const node = resolveNodeState(cloned, "task_executor", "task", phase, task);
        node.status = "completed";
        mutations_applied.push("set task_executor.status = completed");
      } catch {
        if (context.phase === void 0) {
          const phaseLoopNode = cloned.graph.nodes["phase_loop"];
          const hasInProgressPhase = phaseLoopNode?.iterations?.some((it) => it.status === "in_progress");
          if (hasInProgressPhase) {
            throw new Error(
              `Cannot apply mutation for "task_completed": no active task could be resolved from state for phase ${phase}.
Either no task is currently in_progress, or multiple tasks are in_progress simultaneously.
Pass --task <N> to specify the task explicitly.`
            );
          }
          throw new Error(
            `Cannot apply mutation for "task_completed": no active phase could be resolved from state.
Either no phase is currently in_progress, or multiple phases are in_progress simultaneously.
Pass --phase <N> to specify the phase explicitly.`
          );
        }
        throw new Error(
          `Cannot apply mutation for "task_completed": no active task could be resolved from state for phase ${phase}.
Either no task is currently in_progress, or multiple tasks are in_progress simultaneously.
Pass --task <N> to specify the task explicitly.`
        );
      }
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.CODE_REVIEW_COMPLETED, (state, context, config, template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      let phase = context.phase;
      if (phase === void 0) {
        try {
          phase = resolveActivePhaseIndex(cloned);
        } catch {
          throw new Error(
            `Cannot apply mutation for "code_review_completed": no active phase could be resolved from state.
Either no phase is currently in_progress, or multiple phases are in_progress simultaneously.
Pass --phase <N> to specify the phase explicitly.`
          );
        }
      }
      let task = context.task;
      if (task === void 0) {
        try {
          task = resolveActiveTaskIndex(cloned, phase);
        } catch {
          throw new Error(
            `Cannot apply mutation for "code_review_completed": no active task could be resolved from state for phase ${phase}.
Either no task is currently in_progress, or multiple tasks are in_progress simultaneously.
Pass --task <N> to specify the task explicitly.`
          );
        }
      }
      let node;
      try {
        node = resolveNodeState(cloned, "code_review", "task", phase, task);
      } catch {
        throw new Error(
          `Cannot apply mutation for "code_review_completed": failed to resolve code_review node for phase ${phase}, task ${task}.
Either no task is currently in_progress, or multiple tasks are in_progress simultaneously.
Pass --phase <N> and/or --task <N> to specify explicitly.`
        );
      }
      node.status = "completed";
      mutations_applied.push("set code_review.status = completed");
      const docPath = context.doc_path ?? null;
      node.doc_path = docPath;
      mutations_applied.push(`set code_review.doc_path = ${docPath ?? "null"}`);
      const rawVerdict = context.verdict ?? null;
      const effectiveOutcome = context.effective_outcome;
      const correctiveHandoffPath = context.corrective_handoff_path;
      const orchestratorMediated = context.orchestrator_mediated;
      const mediationActive = rawVerdict === REVIEW_VERDICTS.CHANGES_REQUESTED && orchestratorMediated === true && effectiveOutcome !== void 0 && effectiveOutcome !== null;
      const verdictForState = mediationActive ? effectiveOutcome : rawVerdict;
      node.verdict = verdictForState;
      mutations_applied.push(`set code_review.verdict = ${verdictForState ?? "null"}`);
      if (rawVerdict !== null && !VALID_VERDICTS.has(rawVerdict)) {
        cloned.graph.status = "halted";
        cloned.pipeline.halt_reason = `Unrecognized verdict '${rawVerdict}' in code_review_completed`;
        return {
          state: cloned,
          mutations_applied: [
            ...mutations_applied,
            `set graph.status = halted (unrecognized verdict '${rawVerdict}')`
          ]
        };
      }
      const routingVerdict = verdictForState;
      if (routingVerdict === REVIEW_VERDICTS.CHANGES_REQUESTED) {
        const { iteration, scope } = resolveHostingIteration(cloned, phase, task);
        const correctiveCount = iteration.corrective_tasks.length;
        const maxRetries = config.limits.max_retries_per_task;
        const trimmedHandoffPath = typeof correctiveHandoffPath === "string" ? correctiveHandoffPath.trim() : "";
        const hasHandoffPath = trimmedHandoffPath.length > 0;
        if (!hasHandoffPath) {
          iteration.status = "halted";
          cloned.graph.status = "halted";
          cloned.pipeline.halt_reason = `code_review_completed: effective_outcome=changes_requested with no corrective_handoff_path. Possible causes: (1) budget exhausted (corrective_tasks.length=${correctiveCount}, max_retries_per_task=${maxRetries}, scope=${scope}) \u2014 this is the expected halt per the corrective-playbook; (2) orchestrator omitted the handoff path in error \u2014 check the review addendum.`;
          mutations_applied.push(`set ${scope}_iteration.status = halted (effective_outcome=changes_requested, no handoff, scope=${scope})`);
          mutations_applied.push("set graph.status = halted");
          mutations_applied.push("set pipeline.halt_reason (budget-exhausted halt signal)");
          return { state: cloned, mutations_applied };
        }
        if (correctiveCount >= maxRetries) {
          iteration.status = "halted";
          cloned.graph.status = "halted";
          cloned.pipeline.halt_reason = `Retry budget exhausted for ${scope} (max_retries_per_task=${maxRetries}) but a corrective_handoff_path was supplied. The orchestrator must not author a corrective handoff on exhaustion \u2014 this is a contract violation.`;
          mutations_applied.push(`set ${scope}_iteration.status = halted (retry budget exhausted; handoff path supplied, scope=${scope})`);
          mutations_applied.push("set graph.status = halted");
          mutations_applied.push("set pipeline.halt_reason (budget exhausted with supplied handoff path)");
          return { state: cloned, mutations_applied };
        }
        const bodyDefs = findTaskLoopBodyDefs(template);
        if (bodyDefs.length === 0) {
          throw new Error("findTaskLoopBodyDefs: no for_each_task body found in template");
        }
        const nodes = {};
        for (const bodyDef of bodyDefs) {
          nodes[bodyDef.id] = scaffoldNodeState(bodyDef);
        }
        const entry = {
          index: correctiveCount + 1,
          reason: context.reason ?? "Code review requested changes",
          injected_after: "code_review",
          status: "not_started",
          nodes,
          doc_path: trimmedHandoffPath,
          commit_hash: null
        };
        iteration.corrective_tasks.push(entry);
        mutations_applied.push(`injected corrective task ${entry.index} (changes_requested, scope=${scope})`);
        mutations_applied.push(`set corrective_task[${entry.index}].doc_path = ${trimmedHandoffPath}`);
        mutations_applied.push(`corrective_tasks.length = ${iteration.corrective_tasks.length} (scope=${scope})`);
      } else if (routingVerdict === REVIEW_VERDICTS.REJECTED) {
        const { iteration, scope } = resolveHostingIteration(cloned, phase, task);
        iteration.status = "halted";
        cloned.graph.status = "halted";
        cloned.pipeline.halt_reason = `Code review rejected (scope=${scope}): reviewer issued a 'rejected' verdict. Rejected verdicts halt the pipeline with no corrective cycle \u2014 no retry is attempted.`;
        mutations_applied.push(`set ${scope === "phase" ? "phase_iteration" : "task_iteration"}.status = halted (rejected verdict, scope=${scope})`);
        mutations_applied.push("set graph.status = halted");
        mutations_applied.push("set pipeline.halt_reason (reviewer rejected verdict)");
      } else if (rawVerdict === REVIEW_VERDICTS.CHANGES_REQUESTED && routingVerdict !== REVIEW_VERDICTS.CHANGES_REQUESTED && routingVerdict !== REVIEW_VERDICTS.APPROVED) {
        throw new Error(
          "code_review_completed: raw verdict=changes_requested without a valid effective_outcome. The orchestrator mediation contract was bypassed \u2014 ensure the review doc carries orchestrator_mediated=true and effective_outcome \u2208 {approved, changes_requested}."
        );
      }
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.FINAL_REVIEW_STARTED, (state, _context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      const node = resolveNodeState(cloned, "final_review", "top");
      node.status = "in_progress";
      mutations_applied.push("set final_review.status = in_progress");
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.FINAL_REVIEW_COMPLETED, (state, context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      const node = resolveNodeState(cloned, "final_review", "top");
      node.status = "completed";
      mutations_applied.push("set final_review.status = completed");
      const docPath = context.doc_path ?? null;
      node.doc_path = docPath;
      mutations_applied.push(`set final_review.doc_path = ${docPath ?? "null"}`);
      const verdict = context.verdict ?? null;
      node.verdict = verdict;
      mutations_applied.push(`set final_review.verdict = ${verdict ?? "null"}`);
      if (verdict !== null && !VALID_VERDICTS.has(verdict)) {
        cloned.graph.status = "halted";
        cloned.pipeline.halt_reason = `Unrecognized verdict '${verdict}' in final_review_completed`;
        return {
          state: cloned,
          mutations_applied: [
            ...mutations_applied,
            `set graph.status = halted (unrecognized verdict '${verdict}')`
          ]
        };
      }
      if (verdict === REVIEW_VERDICTS.APPROVED) {
        cloned.pipeline.current_tier = "review";
        mutations_applied.push("set pipeline.current_tier = review");
      }
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.COMMIT_STARTED, (state, context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      let phase = context.phase;
      if (phase === void 0) {
        try {
          phase = resolveActivePhaseIndex(cloned);
        } catch {
          throw new Error(
            `Cannot apply mutation for "commit_started": no active phase could be resolved from state.
Either no phase is currently in_progress, or multiple phases are in_progress simultaneously.
Pass --phase <N> to specify the phase explicitly.`
          );
        }
      }
      let task = context.task;
      if (task === void 0) {
        try {
          task = resolveActiveTaskIndex(cloned, phase);
        } catch {
          throw new Error(
            `Cannot apply mutation for "commit_started": no active task could be resolved from state for phase ${phase}.
Either no task is currently in_progress, or multiple tasks are in_progress simultaneously.
Pass --task <N> to specify the task explicitly.`
          );
        }
      }
      try {
        const node = resolveNodeState(cloned, "commit", "task", phase, task);
        node.status = "in_progress";
        mutations_applied.push("set commit.status = in_progress");
      } catch {
        if (context.phase === void 0) {
          const phaseLoopNode = cloned.graph.nodes["phase_loop"];
          const hasInProgressPhase = phaseLoopNode?.iterations?.some((it) => it.status === "in_progress");
          if (hasInProgressPhase) {
            throw new Error(
              `Cannot apply mutation for "commit_started": no active task could be resolved from state for phase ${phase}.
Either no task is currently in_progress, or multiple tasks are in_progress simultaneously.
Pass --task <N> to specify the task explicitly.`
            );
          }
          throw new Error(
            `Cannot apply mutation for "commit_started": no active phase could be resolved from state.
Either no phase is currently in_progress, or multiple phases are in_progress simultaneously.
Pass --phase <N> to specify the phase explicitly.`
          );
        }
        throw new Error(
          `Cannot apply mutation for "commit_started": no active task could be resolved from state for phase ${phase}.
Either no task is currently in_progress, or multiple tasks are in_progress simultaneously.
Pass --task <N> to specify the task explicitly.`
        );
      }
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.COMMIT_COMPLETED, (state, context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      let phase = context.phase;
      if (phase === void 0) {
        try {
          phase = resolveActivePhaseIndex(cloned);
        } catch {
          throw new Error(
            `Cannot apply mutation for "commit_completed": no active phase could be resolved from state.
Either no phase is currently in_progress, or multiple phases are in_progress simultaneously.
Pass --phase <N> to specify the phase explicitly.`
          );
        }
      }
      let task = context.task;
      if (task === void 0) {
        try {
          task = resolveActiveTaskIndex(cloned, phase);
        } catch {
          throw new Error(
            `Cannot apply mutation for "commit_completed": no active task could be resolved from state for phase ${phase}.
Either no task is currently in_progress, or multiple tasks are in_progress simultaneously.
Pass --task <N> to specify the task explicitly.`
          );
        }
      }
      try {
        const node = resolveNodeState(cloned, "commit", "task", phase, task);
        node.status = "completed";
        mutations_applied.push("set commit.status = completed");
        const commitHash = context.commit_hash ?? null;
        const phaseIteration = resolvePhaseIteration(cloned, phase);
        const activePhaseCorrective = phaseIteration.corrective_tasks.slice().reverse().find(
          (ct) => ct.status === "in_progress" || ct.status === "not_started"
        );
        if (activePhaseCorrective) {
          activePhaseCorrective.commit_hash = commitHash;
          mutations_applied.push(`set phase_corrective_task[${activePhaseCorrective.index}].commit_hash = ${commitHash ?? "null"}`);
          return { state: cloned, mutations_applied };
        }
        const taskIteration = resolveTaskIteration(cloned, phase, task);
        const activeCorrective = taskIteration.corrective_tasks.slice().reverse().find(
          (ct) => ct.status === "in_progress" || ct.status === "not_started"
        );
        if (activeCorrective) {
          activeCorrective.commit_hash = commitHash;
          mutations_applied.push(`set corrective_task[${activeCorrective.index}].commit_hash = ${commitHash ?? "null"}`);
        } else {
          taskIteration.commit_hash = commitHash;
          mutations_applied.push(`set task_iteration[${taskIteration.index}].commit_hash = ${commitHash ?? "null"}`);
        }
        return { state: cloned, mutations_applied };
      } catch {
        if (context.phase === void 0) {
          const phaseLoopNode = cloned.graph.nodes["phase_loop"];
          const hasInProgressPhase = phaseLoopNode?.iterations?.some((it) => it.status === "in_progress");
          if (hasInProgressPhase) {
            throw new Error(
              `Cannot apply mutation for "commit_completed": no active task could be resolved from state for phase ${phase}.
Either no task is currently in_progress, or multiple tasks are in_progress simultaneously.
Pass --task <N> to specify the task explicitly.`
            );
          }
          throw new Error(
            `Cannot apply mutation for "commit_completed": no active phase could be resolved from state.
Either no phase is currently in_progress, or multiple phases are in_progress simultaneously.
Pass --phase <N> to specify the phase explicitly.`
          );
        }
        throw new Error(
          `Cannot apply mutation for "commit_completed": no active task could be resolved from state for phase ${phase}.
Either no task is currently in_progress, or multiple tasks are in_progress simultaneously.
Pass --task <N> to specify the task explicitly.`
        );
      }
    });
    mutationRegistry.set(EVENTS.PR_REQUESTED, (state, _context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      if (!cloned.graph.nodes["final_pr"]) {
        cloned.graph.nodes["final_pr"] = scaffoldNodeState({
          id: "final_pr",
          kind: "step",
          action: "invoke_source_control_pr",
          events: { started: "pr_requested", completed: "pr_created" }
        });
        mutations_applied.push("scaffold final_pr (was not yet initialized)");
      }
      const node = resolveNodeState(cloned, "final_pr", "top");
      node.status = "in_progress";
      mutations_applied.push("set final_pr.status = in_progress");
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.PR_CREATED, (state, context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      const node = resolveNodeState(cloned, "final_pr", "top");
      node.status = "completed";
      mutations_applied.push("set final_pr.status = completed");
      if (context.pr_url !== void 0) {
        if (!cloned.pipeline.source_control) {
          throw new Error(
            "pr_created: pipeline.source_control is null \u2014 cannot store pr_url. Source control must be initialized via source_control_init before PR creation."
          );
        }
        cloned.pipeline.source_control.pr_url = context.pr_url ?? null;
        mutations_applied.push(`set pipeline.source_control.pr_url = ${context.pr_url ?? "null"}`);
      }
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.PLAN_REJECTED, (state, _context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      const masterPlanNode = resolveNodeState(cloned, "master_plan", "top");
      masterPlanNode.status = "not_started";
      mutations_applied.push("set master_plan.status = not_started");
      masterPlanNode.doc_path = null;
      mutations_applied.push("set master_plan.doc_path = null");
      const planGateNode = resolveNodeState(cloned, "plan_approval_gate", "top");
      planGateNode.status = "not_started";
      mutations_applied.push("set plan_approval_gate.status = not_started");
      planGateNode.gate_active = false;
      mutations_applied.push("set plan_approval_gate.gate_active = false");
      const phaseLoopNode = cloned.graph.nodes["phase_loop"];
      if (phaseLoopNode !== void 0) {
        if (phaseLoopNode.kind !== "for_each_phase") {
          throw new Error(`Expected phase_loop to be a for_each_phase node, got ${phaseLoopNode.kind}`);
        }
        phaseLoopNode.iterations = [];
        mutations_applied.push("set phase_loop.iterations = []");
      }
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.GATE_REJECTED, (state, context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      cloned.pipeline.current_tier = "halted";
      mutations_applied.push("set pipeline.current_tier = halted");
      cloned.graph.status = "halted";
      mutations_applied.push("set graph.status = halted");
      const gateType = context.gate_type ?? "unknown";
      const reason = context.reason || "No reason provided";
      cloned.pipeline.halt_reason = `Gate rejected (${gateType}): ${reason}`;
      mutations_applied.push(`set pipeline.halt_reason = Gate rejected (${gateType}): ${reason}`);
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.FINAL_REJECTED, (state, _context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      const finalReviewNode = resolveNodeState(cloned, "final_review", "top");
      finalReviewNode.status = "not_started";
      mutations_applied.push("set final_review.status = not_started");
      finalReviewNode.doc_path = null;
      mutations_applied.push("set final_review.doc_path = null");
      const finalGateNode = resolveNodeState(cloned, "final_approval_gate", "top");
      finalGateNode.status = "not_started";
      mutations_applied.push("set final_approval_gate.status = not_started");
      finalGateNode.gate_active = false;
      mutations_applied.push("set final_approval_gate.gate_active = false");
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.HALT, (state, context, _config, _template) => {
      const cloned = structuredClone(state);
      const mutations_applied = [];
      cloned.pipeline.current_tier = "halted";
      mutations_applied.push("set pipeline.current_tier = halted");
      cloned.graph.status = "halted";
      mutations_applied.push("set graph.status = halted");
      const haltReason = context.reason ?? "Pipeline halted by operator";
      cloned.pipeline.halt_reason = haltReason;
      mutations_applied.push(`set pipeline.halt_reason = ${haltReason}`);
      return { state: cloned, mutations_applied };
    });
    mutationRegistry.set(EVENTS.GATE_MODE_SET, (state, context, _config, _template) => {
      const cloned = structuredClone(state);
      const mode = context.gate_mode;
      if (!mode || !["task", "phase", "autonomous"].includes(mode)) {
        throw new Error(`Invalid gate mode '${mode}': expected task, phase, or autonomous`);
      }
      cloned.pipeline.gate_mode = mode;
      return {
        state: cloned,
        mutations_applied: [`set pipeline.gate_mode = ${mode}`]
      };
    });
    mutationRegistry.set(EVENTS.SOURCE_CONTROL_INIT, (state, context, _config, _template) => {
      const branch = context.branch;
      const baseBranch = context.base_branch;
      if (!branch || !baseBranch) {
        throw new Error("source_control_init requires --branch and --base-branch");
      }
      const autoCommit = normalizeAutoSetting("auto_commit", context.auto_commit);
      const autoPr = normalizeAutoSetting("auto_pr", context.auto_pr);
      const cloned = structuredClone(state);
      cloned.pipeline.source_control = {
        branch,
        base_branch: baseBranch,
        worktree_path: context.worktree_path?.trim() || ".",
        auto_commit: autoCommit,
        auto_pr: autoPr,
        remote_url: normalizeOptionalUrl(context.remote_url),
        compare_url: normalizeOptionalUrl(context.compare_url),
        pr_url: null
      };
      return {
        state: cloned,
        mutations_applied: ["created pipeline.source_control"]
      };
    });
  }
});

// cli/src/lib/pipeline-engine/condition-evaluator.ts
function resolveDotPath(obj, path20) {
  const segments = path20.split(".");
  let current = obj;
  for (let i = 0; i < segments.length; i++) {
    if (current === void 0 || current === null) {
      const blame = i === 0 ? "<root>" : segments[i - 1];
      throw new Error(
        `Cannot resolve path '${path20}': segment '${blame}' resolved to ${typeof current}`
      );
    }
    current = current[segments[i]];
  }
  return current;
}
function evaluateCondition(condition, config, state) {
  const hasConfigRef = condition.config_ref !== void 0;
  const hasStateRef = condition.state_ref !== void 0;
  if (hasConfigRef && hasStateRef) {
    throw new Error(
      "ConditionExpression must have exactly one of config_ref or state_ref, but both were present"
    );
  }
  if (!hasConfigRef && !hasStateRef) {
    throw new Error(
      "ConditionExpression must have exactly one of config_ref or state_ref, but neither was present"
    );
  }
  const resolved = hasConfigRef ? resolveDotPath(config, condition.config_ref) : resolveDotPath(state, condition.state_ref);
  switch (condition.operator) {
    case "eq":
      return resolved === condition.value;
    case "neq":
      return resolved !== condition.value;
    case "in": {
      if (!Array.isArray(condition.value)) {
        throw new Error("Operator 'in' requires value to be an array");
      }
      return condition.value.includes(resolved);
    }
    case "not_in": {
      if (!Array.isArray(condition.value)) {
        throw new Error("Operator 'not_in' requires value to be an array");
      }
      return !condition.value.includes(resolved);
    }
    case "truthy":
      return Boolean(resolved);
    case "falsy":
      return !resolved;
    default: {
      const _exhaustive = condition.operator;
      throw new Error(`Unknown operator: '${String(_exhaustive)}'`);
    }
  }
}
var init_condition_evaluator = __esm({
  "cli/src/lib/pipeline-engine/condition-evaluator.ts"() {
    "use strict";
  }
});

// cli/src/lib/pipeline-engine/dag-walker.ts
function resolveNodeStatePath(templatePath, _context) {
  let result = templatePath;
  if (_context.phase !== void 0) {
    result = result.replaceAll("phase_loop.body.", `phase_loop[${_context.phase - 1}].`);
  }
  if (_context.task !== void 0) {
    result = result.replaceAll("task_loop.body.", `task_loop[${_context.task - 1}].`);
  }
  return result;
}
function resolveConfigValue(dotPath, config) {
  const segments = dotPath.split(".");
  let current = config;
  for (const segment of segments) {
    if (current === null || current === void 0 || typeof current !== "object") {
      return void 0;
    }
    current = current[segment];
  }
  return current;
}
function checkDependencies(dependsOn, nodes) {
  if (!dependsOn || dependsOn.length === 0) {
    return true;
  }
  return dependsOn.every((depId) => {
    const depState = nodes[depId];
    return depState !== void 0 && (depState.status === NODE_STATUSES.COMPLETED || depState.status === NODE_STATUSES.SKIPPED);
  });
}
function resolveStateRef(ref, graphState) {
  const path20 = ref.startsWith("$.") ? ref.slice(2) : ref;
  const segments = path20.split(".");
  let current = graphState;
  for (const segment of segments) {
    if (current === null || current === void 0 || typeof current !== "object") {
      return void 0;
    }
    current = current[segment];
  }
  return current;
}
function resolveDocRefInScope(ref, graphState, currentIteration) {
  if (ref === "$.current_phase.doc_path") {
    return currentIteration?.doc_path ?? void 0;
  }
  return resolveStateRef(ref, graphState);
}
function walkForEachIterations(fepDef, fepState, config, state, readDocument4) {
  for (const iteration of fepState.iterations) {
    if (iteration.status === NODE_STATUSES.COMPLETED || iteration.status === NODE_STATUSES.SKIPPED) {
      continue;
    }
    if (iteration.status === NODE_STATUSES.HALTED) {
      return { action: NEXT_ACTIONS.DISPLAY_HALTED, context: { details: state.pipeline.halt_reason ?? "Pipeline is halted" } };
    }
    if (iteration.status === NODE_STATUSES.NOT_STARTED) {
      iteration.status = NODE_STATUSES.IN_PROGRESS;
    }
    const orderedNodes = {};
    for (const bodyDef of fepDef.body) {
      orderedNodes[bodyDef.id] = iteration.nodes[bodyDef.id] ?? scaffoldNodeState(bodyDef);
    }
    for (const key of Object.keys(iteration.nodes)) {
      if (!(key in orderedNodes)) {
        orderedNodes[key] = iteration.nodes[key];
      }
    }
    iteration.nodes = orderedNodes;
    if (iteration.corrective_tasks.length > 0) {
      const latestCorrective = iteration.corrective_tasks[iteration.corrective_tasks.length - 1];
      if (latestCorrective.status === NODE_STATUSES.HALTED) {
        return { action: NEXT_ACTIONS.DISPLAY_HALTED, context: { details: state.pipeline.halt_reason ?? "Pipeline is halted" } };
      }
      if (latestCorrective.status === NODE_STATUSES.COMPLETED) {
        iteration.status = NODE_STATUSES.COMPLETED;
        continue;
      }
      if (latestCorrective.status === NODE_STATUSES.NOT_STARTED) {
        latestCorrective.status = NODE_STATUSES.IN_PROGRESS;
      }
      let correctiveBodyDefs;
      if (fepDef.kind === "for_each_phase") {
        const fetDef = fepDef.body.find((n) => n.kind === "for_each_task");
        correctiveBodyDefs = fetDef ? fetDef.body : fepDef.body;
      } else {
        correctiveBodyDefs = fepDef.body;
      }
      const correctiveResult = walkNodes(correctiveBodyDefs, latestCorrective.nodes, config, state, readDocument4, iteration);
      if (correctiveResult !== null) {
        return correctiveResult;
      }
      const allCorrectiveDone = correctiveBodyDefs.every((bn) => {
        const bnState = latestCorrective.nodes[bn.id];
        return bnState !== void 0 && (bnState.status === NODE_STATUSES.COMPLETED || bnState.status === NODE_STATUSES.SKIPPED);
      });
      if (allCorrectiveDone) {
        latestCorrective.status = NODE_STATUSES.COMPLETED;
        iteration.status = NODE_STATUSES.COMPLETED;
        continue;
      }
      return null;
    }
    const bodyResult = walkNodes(fepDef.body, iteration.nodes, config, state, readDocument4, iteration);
    if (bodyResult !== null) {
      return bodyResult;
    }
    const allBodyDone = fepDef.body.every((bn) => {
      const bnState = iteration.nodes[bn.id];
      return bnState !== void 0 && (bnState.status === NODE_STATUSES.COMPLETED || bnState.status === NODE_STATUSES.SKIPPED);
    });
    if (allBodyDone) {
      iteration.status = NODE_STATUSES.COMPLETED;
      continue;
    }
    return null;
  }
  return "all_completed";
}
function walkNodes(nodeDefs, nodes, config, state, readDocument4, currentIteration) {
  for (const nodeDef of nodeDefs) {
    const nodeState = nodes[nodeDef.id];
    if (!nodeState) {
      continue;
    }
    if (!checkDependencies(nodeDef.depends_on, nodes)) {
      continue;
    }
    if (nodeState.status === NODE_STATUSES.HALTED) {
      return { action: NEXT_ACTIONS.DISPLAY_HALTED, context: { details: state.pipeline.halt_reason ?? "Pipeline is halted" } };
    }
    if (nodeState.status === NODE_STATUSES.COMPLETED || nodeState.status === NODE_STATUSES.SKIPPED) {
      continue;
    }
    if (nodeState.status === NODE_STATUSES.IN_PROGRESS) {
      if (nodeDef.kind === "conditional") {
        const condDef = nodeDef;
        const condState = nodeState;
        const branchKey = condState.branch_taken;
        if (branchKey === null) {
          return null;
        }
        const branchNodes = condDef.branches[branchKey];
        const allBranchDone = branchNodes.every((bn) => {
          const bnState = nodes[bn.id];
          return bnState !== void 0 && (bnState.status === NODE_STATUSES.COMPLETED || bnState.status === NODE_STATUSES.SKIPPED);
        });
        if (allBranchDone) {
          condState.status = NODE_STATUSES.COMPLETED;
          continue;
        }
        return walkNodes(branchNodes, nodes, config, state, readDocument4, currentIteration);
      }
      if (nodeDef.kind === "parallel") {
        const parallelDef = nodeDef;
        const parallelState = nodeState;
        const allChildrenDone = parallelDef.children.every((child) => {
          const childState = parallelState.nodes[child.id];
          return childState !== void 0 && (childState.status === NODE_STATUSES.COMPLETED || childState.status === NODE_STATUSES.SKIPPED);
        });
        if (allChildrenDone) {
          parallelState.status = NODE_STATUSES.COMPLETED;
          continue;
        }
        return walkNodes(parallelDef.children, parallelState.nodes, config, state, readDocument4, currentIteration);
      }
      if (nodeDef.kind === "for_each_phase") {
        const fepDef = nodeDef;
        const fepState = nodeState;
        const iterResult = walkForEachIterations(fepDef, fepState, config, state, readDocument4);
        if (iterResult === "all_completed") {
          fepState.status = NODE_STATUSES.COMPLETED;
          continue;
        }
        return iterResult;
      }
      if (nodeDef.kind === "for_each_task") {
        const fetDef = nodeDef;
        const fetState = nodeState;
        const iterResult = walkForEachIterations(fetDef, fetState, config, state, readDocument4);
        if (iterResult === "all_completed") {
          fetState.status = NODE_STATUSES.COMPLETED;
          continue;
        }
        return iterResult;
      }
      if (nodeDef.kind === "step") {
        const stepDef = nodeDef;
        return {
          action: stepDef.action,
          context: stepDef.context ?? {}
        };
      }
      if (nodeDef.kind === "gate") {
        const gateDef = nodeDef;
        return {
          action: gateDef.action_if_needed,
          context: {}
        };
      }
      return null;
    }
    if (nodeState.status === NODE_STATUSES.NOT_STARTED) {
      if (nodeDef.kind === "step") {
        const stepDef = nodeDef;
        return {
          action: stepDef.action,
          context: stepDef.context ?? {}
        };
      }
      if (nodeDef.kind === "gate") {
        const gateDef = nodeDef;
        const gateState = nodeState;
        const configValue = resolveConfigValue(gateDef.mode_ref, config);
        if (typeof configValue === "boolean") {
          if (!configValue) {
            gateState.status = NODE_STATUSES.COMPLETED;
            gateState.gate_active = false;
            continue;
          }
          gateState.gate_active = true;
          return {
            action: gateDef.action_if_needed,
            context: {}
          };
        }
        const effectiveMode = state.pipeline.gate_mode ?? (typeof configValue === "string" ? configValue : "ask");
        if (effectiveMode === "ask" && state.pipeline.gate_mode === null) {
          return {
            action: NEXT_ACTIONS.ASK_GATE_MODE,
            context: {}
          };
        }
        if (gateDef.auto_approve_modes && gateDef.auto_approve_modes.includes(effectiveMode)) {
          gateState.status = NODE_STATUSES.COMPLETED;
          gateState.gate_active = false;
          continue;
        }
        if (effectiveMode === "autonomous") {
          const depId = gateDef.depends_on?.[0];
          if (depId && nodes[depId]) {
            const reviewState = nodes[depId];
            if (reviewState.verdict === "approved") {
              gateState.status = NODE_STATUSES.COMPLETED;
              gateState.gate_active = false;
              continue;
            }
          }
          gateState.gate_active = true;
          return {
            action: gateDef.action_if_needed,
            context: {}
          };
        }
        gateState.gate_active = true;
        return {
          action: gateDef.action_if_needed,
          context: {}
        };
      }
      if (nodeDef.kind === "conditional") {
        const condDef = nodeDef;
        const condState = nodeState;
        const condResult = evaluateCondition(condDef.condition, config, state);
        condState.branch_taken = condResult ? "true" : "false";
        const branchNodes = condDef.branches[condState.branch_taken];
        if (branchNodes.length === 0) {
          condState.status = NODE_STATUSES.COMPLETED;
          continue;
        }
        condState.status = NODE_STATUSES.IN_PROGRESS;
        for (const branchNode of branchNodes) {
          if (!(branchNode.id in nodes)) {
            nodes[branchNode.id] = scaffoldNodeState(branchNode);
          }
        }
        return walkNodes(branchNodes, nodes, config, state, readDocument4, currentIteration);
      }
      if (nodeDef.kind === "parallel") {
        const parallelDef = nodeDef;
        const parallelState = nodeState;
        parallelState.status = NODE_STATUSES.IN_PROGRESS;
        for (const child of parallelDef.children) {
          if (!(child.id in parallelState.nodes)) {
            parallelState.nodes[child.id] = scaffoldNodeState(child);
          }
        }
        return walkNodes(parallelDef.children, parallelState.nodes, config, state, readDocument4, currentIteration);
      }
      if (nodeDef.kind === "for_each_phase") {
        const fepDef = nodeDef;
        const fepState = nodeState;
        if (fepState.iterations.length === 0) {
          if (!readDocument4) {
            return null;
          }
          const docPath = resolveStateRef(fepDef.source_doc_ref, state.graph);
          if (typeof docPath !== "string") {
            return null;
          }
          const doc = readDocument4(docPath);
          if (!doc) {
            return null;
          }
          const totalValue = doc.frontmatter[fepDef.total_field];
          if (typeof totalValue !== "number" || !Number.isInteger(totalValue) || totalValue <= 0) {
            return null;
          }
          const cappedTotal = Math.min(totalValue, config.limits.max_phases);
          for (let i = 0; i < cappedTotal; i++) {
            const iterationNodes = {};
            for (const bodyDef of fepDef.body) {
              iterationNodes[bodyDef.id] = scaffoldNodeState(bodyDef);
            }
            fepState.iterations.push({
              index: i,
              status: NODE_STATUSES.NOT_STARTED,
              nodes: iterationNodes,
              corrective_tasks: [],
              commit_hash: null
            });
          }
        }
        fepState.status = NODE_STATUSES.IN_PROGRESS;
        const iterResult = walkForEachIterations(fepDef, fepState, config, state, readDocument4);
        if (iterResult === "all_completed") {
          fepState.status = NODE_STATUSES.COMPLETED;
          continue;
        }
        return iterResult;
      }
      if (nodeDef.kind === "for_each_task") {
        const fetDef = nodeDef;
        const fetState = nodeState;
        if (fetState.iterations.length === 0) {
          if (!readDocument4) {
            return null;
          }
          const docPath = resolveDocRefInScope(fetDef.source_doc_ref, state.graph, currentIteration);
          if (typeof docPath !== "string") {
            return null;
          }
          const doc = readDocument4(docPath);
          if (!doc) {
            return null;
          }
          const tasksValue = doc.frontmatter[fetDef.tasks_field];
          if (!Array.isArray(tasksValue)) {
            return null;
          }
          if (tasksValue.length === 0) {
            fetState.status = NODE_STATUSES.COMPLETED;
            continue;
          }
          const cappedLength = Math.min(tasksValue.length, config.limits.max_tasks_per_phase);
          for (let i = 0; i < cappedLength; i++) {
            const iterationNodes = {};
            for (const bodyDef of fetDef.body) {
              iterationNodes[bodyDef.id] = scaffoldNodeState(bodyDef);
            }
            fetState.iterations.push({
              index: i,
              status: NODE_STATUSES.NOT_STARTED,
              nodes: iterationNodes,
              corrective_tasks: [],
              commit_hash: null
            });
          }
        }
        fetState.status = NODE_STATUSES.IN_PROGRESS;
        const iterResult = walkForEachIterations(fetDef, fetState, config, state, readDocument4);
        if (iterResult === "all_completed") {
          fetState.status = NODE_STATUSES.COMPLETED;
          continue;
        }
        return iterResult;
      }
      return null;
    }
  }
  return null;
}
function walkDAG(state, template, config, readDocument4) {
  if (state.graph.status === GRAPH_STATUSES.HALTED) {
    return {
      action: NEXT_ACTIONS.DISPLAY_HALTED,
      context: { details: state.pipeline.halt_reason ?? "Pipeline is halted" }
    };
  }
  const result = walkNodes(template.nodes, state.graph.nodes, config, state, readDocument4);
  if (result !== null) {
    return result;
  }
  const allDone = template.nodes.every((nodeDef) => {
    const ns = state.graph.nodes[nodeDef.id];
    return ns !== void 0 && (ns.status === NODE_STATUSES.COMPLETED || ns.status === NODE_STATUSES.SKIPPED);
  });
  if (allDone) {
    state.graph.status = GRAPH_STATUSES.COMPLETED;
    return { action: NEXT_ACTIONS.DISPLAY_COMPLETE, context: {} };
  }
  return null;
}
var init_dag_walker = __esm({
  "cli/src/lib/pipeline-engine/dag-walker.ts"() {
    "use strict";
    init_constants();
    init_condition_evaluator();
    init_scaffold();
  }
});

// cli/node_modules/ajv/dist/compile/codegen/code.js
var require_code = __commonJS({
  "cli/node_modules/ajv/dist/compile/codegen/code.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
    var _CodeOrName = class {
    };
    exports._CodeOrName = _CodeOrName;
    exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    var Name = class extends _CodeOrName {
      constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return false;
      }
      get names() {
        return { [this.str]: 1 };
      }
    };
    exports.Name = Name;
    var _Code = class extends _CodeOrName {
      constructor(code) {
        super();
        this._items = typeof code === "string" ? [code] : code;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return false;
        const item = this._items[0];
        return item === "" || item === '""';
      }
      get str() {
        var _a;
        return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
      }
      get names() {
        var _a;
        return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names, c) => {
          if (c instanceof Name)
            names[c.str] = (names[c.str] || 0) + 1;
          return names;
        }, {});
      }
    };
    exports._Code = _Code;
    exports.nil = new _Code("");
    function _(strs, ...args) {
      const code = [strs[0]];
      let i = 0;
      while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
      }
      return new _Code(code);
    }
    exports._ = _;
    var plus = new _Code("+");
    function str2(strs, ...args) {
      const expr = [safeStringify(strs[0])];
      let i = 0;
      while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
      }
      optimize(expr);
      return new _Code(expr);
    }
    exports.str = str2;
    function addCodeArg(code, arg) {
      if (arg instanceof _Code)
        code.push(...arg._items);
      else if (arg instanceof Name)
        code.push(arg);
      else
        code.push(interpolate(arg));
    }
    exports.addCodeArg = addCodeArg;
    function optimize(expr) {
      let i = 1;
      while (i < expr.length - 1) {
        if (expr[i] === plus) {
          const res = mergeExprItems(expr[i - 1], expr[i + 1]);
          if (res !== void 0) {
            expr.splice(i - 1, 3, res);
            continue;
          }
          expr[i++] = "+";
        }
        i++;
      }
    }
    function mergeExprItems(a, b) {
      if (b === '""')
        return a;
      if (a === '""')
        return b;
      if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
          return;
        if (typeof b != "string")
          return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
          return a.slice(0, -1) + b.slice(1);
        return;
      }
      if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
      return;
    }
    function strConcat(c1, c2) {
      return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str2`${c1}${c2}`;
    }
    exports.strConcat = strConcat;
    function interpolate(x) {
      return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
    }
    function stringify(x) {
      return new _Code(safeStringify(x));
    }
    exports.stringify = stringify;
    function safeStringify(x) {
      return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    exports.safeStringify = safeStringify;
    function getProperty(key) {
      return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
    }
    exports.getProperty = getProperty;
    function getEsmExportName(key) {
      if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
      }
      throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
    }
    exports.getEsmExportName = getEsmExportName;
    function regexpCode(rx) {
      return new _Code(rx.toString());
    }
    exports.regexpCode = regexpCode;
  }
});

// cli/node_modules/ajv/dist/compile/codegen/scope.js
var require_scope = __commonJS({
  "cli/node_modules/ajv/dist/compile/codegen/scope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
    var code_1 = require_code();
    var ValueError = class extends Error {
      constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
      }
    };
    var UsedValueState;
    (function(UsedValueState2) {
      UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
      UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
    })(UsedValueState || (exports.UsedValueState = UsedValueState = {}));
    exports.varKinds = {
      const: new code_1.Name("const"),
      let: new code_1.Name("let"),
      var: new code_1.Name("var")
    };
    var Scope = class {
      constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
      }
      toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
      }
      name(prefix) {
        return new code_1.Name(this._newName(prefix));
      }
      _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
      }
      _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
          throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return this._names[prefix] = { prefix, index: 0 };
      }
    };
    exports.Scope = Scope;
    var ValueScopeName = class extends code_1.Name {
      constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
      }
      setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_1._)`.${new code_1.Name(property)}[${itemIndex}]`;
      }
    };
    exports.ValueScopeName = ValueScopeName;
    var line = (0, code_1._)`\n`;
    var ValueScope = class extends Scope {
      constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
      }
      get() {
        return this._scope;
      }
      name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
      }
      value(nameOrPrefix, value) {
        var _a;
        if (value.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
          const _name = vs.get(valueKey);
          if (_name)
            return _name;
        } else {
          vs = this._values[prefix] = /* @__PURE__ */ new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
      }
      getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
          return;
        return vs.get(keyOrRef);
      }
      scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
          if (name.scopePath === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return (0, code_1._)`${scopeName}${name.scopePath}`;
        });
      }
      scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
          if (name.value === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return name.value.code;
        }, usedValues, getCode);
      }
      _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values) {
          const vs = values[prefix];
          if (!vs)
            continue;
          const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
          vs.forEach((name) => {
            if (nameSet.has(name))
              return;
            nameSet.set(name, UsedValueState.Started);
            let c = valueCode(name);
            if (c) {
              const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
              code = (0, code_1._)`${code}${def} ${name} = ${c};${this.opts._n}`;
            } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
              code = (0, code_1._)`${code}${c}${this.opts._n}`;
            } else {
              throw new ValueError(name);
            }
            nameSet.set(name, UsedValueState.Completed);
          });
        }
        return code;
      }
    };
    exports.ValueScope = ValueScope;
  }
});

// cli/node_modules/ajv/dist/compile/codegen/index.js
var require_codegen = __commonJS({
  "cli/node_modules/ajv/dist/compile/codegen/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
    var code_1 = require_code();
    var scope_1 = require_scope();
    var code_2 = require_code();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return code_2._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return code_2.str;
    } });
    Object.defineProperty(exports, "strConcat", { enumerable: true, get: function() {
      return code_2.strConcat;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return code_2.nil;
    } });
    Object.defineProperty(exports, "getProperty", { enumerable: true, get: function() {
      return code_2.getProperty;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return code_2.stringify;
    } });
    Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function() {
      return code_2.regexpCode;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return code_2.Name;
    } });
    var scope_2 = require_scope();
    Object.defineProperty(exports, "Scope", { enumerable: true, get: function() {
      return scope_2.Scope;
    } });
    Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function() {
      return scope_2.ValueScope;
    } });
    Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function() {
      return scope_2.ValueScopeName;
    } });
    Object.defineProperty(exports, "varKinds", { enumerable: true, get: function() {
      return scope_2.varKinds;
    } });
    exports.operators = {
      GT: new code_1._Code(">"),
      GTE: new code_1._Code(">="),
      LT: new code_1._Code("<"),
      LTE: new code_1._Code("<="),
      EQ: new code_1._Code("==="),
      NEQ: new code_1._Code("!=="),
      NOT: new code_1._Code("!"),
      OR: new code_1._Code("||"),
      AND: new code_1._Code("&&"),
      ADD: new code_1._Code("+")
    };
    var Node = class {
      optimizeNodes() {
        return this;
      }
      optimizeNames(_names, _constants) {
        return this;
      }
    };
    var Def = class extends Node {
      constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
      }
      render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (!names[this.name.str])
          return;
        if (this.rhs)
          this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
      }
    };
    var Assign = class extends Node {
      constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
      }
      render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
          return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names, this.rhs);
      }
    };
    var AssignOp = class extends Assign {
      constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
      }
      render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
      }
    };
    var Label = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        return `${this.label}:` + _n;
      }
    };
    var Break = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
      }
    };
    var Throw = class extends Node {
      constructor(error) {
        super();
        this.error = error;
      }
      render({ _n }) {
        return `throw ${this.error};` + _n;
      }
      get names() {
        return this.error.names;
      }
    };
    var AnyCode = class extends Node {
      constructor(code) {
        super();
        this.code = code;
      }
      render({ _n }) {
        return `${this.code};` + _n;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
      }
      get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
      }
    };
    var ParentNode = class extends Node {
      constructor(nodes = []) {
        super();
        this.nodes = nodes;
      }
      render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
      }
      optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i].optimizeNodes();
          if (Array.isArray(n))
            nodes.splice(i, 1, ...n);
          else if (n)
            nodes[i] = n;
          else
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      optimizeNames(names, constants) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i];
          if (n.optimizeNames(names, constants))
            continue;
          subtractNames(names, n.names);
          nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
      }
    };
    var BlockNode = class extends ParentNode {
      render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
      }
    };
    var Root = class extends ParentNode {
    };
    var Else = class extends BlockNode {
    };
    Else.kind = "else";
    var If = class _If extends BlockNode {
      constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
      }
      render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else)
          code += "else " + this.else.render(opts);
        return code;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
          return this.nodes;
        let e = this.else;
        if (e) {
          const ns = e.optimizeNodes();
          e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
          if (cond === false)
            return e instanceof _If ? e : e.nodes;
          if (this.nodes.length)
            return this;
          return new _If(not(cond), e instanceof _If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
          return void 0;
        return this;
      }
      optimizeNames(names, constants) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else))
          return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else)
          addNames(names, this.else.names);
        return names;
      }
    };
    If.kind = "if";
    var For = class extends BlockNode {
    };
    For.kind = "for";
    var ForLoop = class extends For {
      constructor(iteration) {
        super();
        this.iteration = iteration;
      }
      render(opts) {
        return `for(${this.iteration})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
          return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iteration.names);
      }
    };
    var ForRange = class extends For {
      constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
      }
      render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
      }
      get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
      }
    };
    var ForIter = class extends For {
      constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
      }
      render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
          return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iterable.names);
      }
    };
    var Func = class extends BlockNode {
      constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
      }
      render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
      }
    };
    Func.kind = "func";
    var Return = class extends ParentNode {
      render(opts) {
        return "return " + super.render(opts);
      }
    };
    Return.kind = "return";
    var Try = class extends BlockNode {
      render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch)
          code += this.catch.render(opts);
        if (this.finally)
          code += this.finally.render(opts);
        return code;
      }
      optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
      }
      optimizeNames(names, constants) {
        var _a, _b;
        super.optimizeNames(names, constants);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        if (this.catch)
          addNames(names, this.catch.names);
        if (this.finally)
          addNames(names, this.finally.names);
        return names;
      }
    };
    var Catch = class extends BlockNode {
      constructor(error) {
        super();
        this.error = error;
      }
      render(opts) {
        return `catch(${this.error})` + super.render(opts);
      }
    };
    Catch.kind = "catch";
    var Finally = class extends BlockNode {
      render(opts) {
        return "finally" + super.render(opts);
      }
    };
    Finally.kind = "finally";
    var CodeGen = class {
      constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(prefix) {
        return this._scope.name(prefix);
      }
      // reserves unique name in the external scope
      scopeName(prefix) {
        return this._extScope.name(prefix);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
        vs.add(name);
        return name;
      }
      getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== void 0 && constant)
          this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
      }
      // `const` declaration (`var` in es5 mode)
      const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
      }
      // `var` declaration with optional assignment
      var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
      }
      // assignment code
      assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
      }
      // `+=` code
      add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
      }
      // appends passed SafeExpr to code or executes Block
      code(c) {
        if (typeof c == "function")
          c();
        else if (c !== code_1.nil)
          this._leafNode(new AnyCode(c));
        return this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
          if (code.length > 1)
            code.push(",");
          code.push(key);
          if (key !== value || this.opts.es5) {
            code.push(":");
            (0, code_1.addCodeArg)(code, value);
          }
        }
        code.push("}");
        return new code_1._Code(code);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
          this.code(thenBody).else().code(elseBody).endIf();
        } else if (thenBody) {
          this.code(thenBody).endIf();
        } else if (elseBody) {
          throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(condition) {
        return this._elseNode(new If(condition));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new Else());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(If, Else);
      }
      _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
          this.code(forBody).endFor();
        return this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
      }
      // `for` statement for a range of values
      forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
          const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
          return this.forRange("_i", 0, (0, code_1._)`${arr}.length`, (i) => {
            this.var(name, (0, code_1._)`${arr}[${i}]`);
            forBody(name);
          });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
          return this.forOf(nameOrPrefix, (0, code_1._)`Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(For);
      }
      // `label` statement
      label(label) {
        return this._leafNode(new Label(label));
      }
      // `break` statement
      break(label) {
        return this._leafNode(new Break(label));
      }
      // `return` statement
      return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
      }
      // `try` statement
      try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
          const error = this.name("e");
          this._currNode = node.catch = new Catch(error);
          catchCode(error);
        }
        if (finallyCode) {
          this._currNode = node.finally = new Finally();
          this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
      }
      // `throw` statement
      throw(error) {
        return this._leafNode(new Throw(error));
      }
      // start self-balancing block
      block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
          this.code(body).endBlock(nodeCount);
        return this;
      }
      // end the current self-balancing block
      endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
          throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
          this.code(funcBody).endFunc();
        return this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(Func);
      }
      optimize(n = 1) {
        while (n-- > 0) {
          this._root.optimizeNodes();
          this._root.optimizeNames(this._root.names, this._constants);
        }
      }
      _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
      }
      _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
      }
      _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || N2 && n instanceof N2) {
          this._nodes.pop();
          return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
      }
      _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
          throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
      }
      set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
      }
    };
    exports.CodeGen = CodeGen;
    function addNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
      return names;
    }
    function addExprNames(names, from) {
      return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
    }
    function optimizeExpr(expr, names, constants) {
      if (expr instanceof code_1.Name)
        return replaceName(expr);
      if (!canOptimize(expr))
        return expr;
      return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name)
          c = replaceName(c);
        if (c instanceof code_1._Code)
          items.push(...c._items);
        else
          items.push(c);
        return items;
      }, []));
      function replaceName(n) {
        const c = constants[n.str];
        if (c === void 0 || names[n.str] !== 1)
          return n;
        delete names[n.str];
        return c;
      }
      function canOptimize(e) {
        return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== void 0);
      }
    }
    function subtractNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
    }
    function not(x) {
      return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._)`!${par(x)}`;
    }
    exports.not = not;
    var andCode = mappend(exports.operators.AND);
    function and(...args) {
      return args.reduce(andCode);
    }
    exports.and = and;
    var orCode = mappend(exports.operators.OR);
    function or(...args) {
      return args.reduce(orCode);
    }
    exports.or = or;
    function mappend(op) {
      return (x, y) => x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._)`${par(x)} ${op} ${par(y)}`;
    }
    function par(x) {
      return x instanceof code_1.Name ? x : (0, code_1._)`(${x})`;
    }
  }
});

// cli/node_modules/ajv/dist/compile/util.js
var require_util = __commonJS({
  "cli/node_modules/ajv/dist/compile/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
    var codegen_1 = require_codegen();
    var code_1 = require_code();
    function toHash(arr) {
      const hash = {};
      for (const item of arr)
        hash[item] = true;
      return hash;
    }
    exports.toHash = toHash;
    function alwaysValidSchema(it, schema2) {
      if (typeof schema2 == "boolean")
        return schema2;
      if (Object.keys(schema2).length === 0)
        return true;
      checkUnknownRules(it, schema2);
      return !schemaHasRules(schema2, it.self.RULES.all);
    }
    exports.alwaysValidSchema = alwaysValidSchema;
    function checkUnknownRules(it, schema2 = it.schema) {
      const { opts, self } = it;
      if (!opts.strictSchema)
        return;
      if (typeof schema2 === "boolean")
        return;
      const rules = self.RULES.keywords;
      for (const key in schema2) {
        if (!rules[key])
          checkStrictMode(it, `unknown keyword: "${key}"`);
      }
    }
    exports.checkUnknownRules = checkUnknownRules;
    function schemaHasRules(schema2, rules) {
      if (typeof schema2 == "boolean")
        return !schema2;
      for (const key in schema2)
        if (rules[key])
          return true;
      return false;
    }
    exports.schemaHasRules = schemaHasRules;
    function schemaHasRulesButRef(schema2, RULES) {
      if (typeof schema2 == "boolean")
        return !schema2;
      for (const key in schema2)
        if (key !== "$ref" && RULES.all[key])
          return true;
      return false;
    }
    exports.schemaHasRulesButRef = schemaHasRulesButRef;
    function schemaRefOrVal({ topSchemaRef, schemaPath }, schema2, keyword, $data) {
      if (!$data) {
        if (typeof schema2 == "number" || typeof schema2 == "boolean")
          return schema2;
        if (typeof schema2 == "string")
          return (0, codegen_1._)`${schema2}`;
      }
      return (0, codegen_1._)`${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
    }
    exports.schemaRefOrVal = schemaRefOrVal;
    function unescapeFragment(str2) {
      return unescapeJsonPointer(decodeURIComponent(str2));
    }
    exports.unescapeFragment = unescapeFragment;
    function escapeFragment(str2) {
      return encodeURIComponent(escapeJsonPointer(str2));
    }
    exports.escapeFragment = escapeFragment;
    function escapeJsonPointer(str2) {
      if (typeof str2 == "number")
        return `${str2}`;
      return str2.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    exports.escapeJsonPointer = escapeJsonPointer;
    function unescapeJsonPointer(str2) {
      return str2.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    exports.unescapeJsonPointer = unescapeJsonPointer;
    function eachItem(xs, f) {
      if (Array.isArray(xs)) {
        for (const x of xs)
          f(x);
      } else {
        f(xs);
      }
    }
    exports.eachItem = eachItem;
    function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
      return (gen, from, to, toName) => {
        const res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
      };
    }
    exports.mergeEvaluated = {
      props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => {
          gen.if((0, codegen_1._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._)`${to} || {}`).code((0, codegen_1._)`Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => {
          if (from === true) {
            gen.assign(to, true);
          } else {
            gen.assign(to, (0, codegen_1._)`${to} || {}`);
            setEvaluated(gen, to, from);
          }
        }),
        mergeValues: (from, to) => from === true ? true : { ...from, ...to },
        resultToName: evaluatedPropsToName
      }),
      items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._)`${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => from === true ? true : Math.max(from, to),
        resultToName: (gen, items) => gen.var("items", items)
      })
    };
    function evaluatedPropsToName(gen, ps) {
      if (ps === true)
        return gen.var("props", true);
      const props = gen.var("props", (0, codegen_1._)`{}`);
      if (ps !== void 0)
        setEvaluated(gen, props, ps);
      return props;
    }
    exports.evaluatedPropsToName = evaluatedPropsToName;
    function setEvaluated(gen, props, ps) {
      Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._)`${props}${(0, codegen_1.getProperty)(p)}`, true));
    }
    exports.setEvaluated = setEvaluated;
    var snippets = {};
    function useFunc(gen, f) {
      return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
      });
    }
    exports.useFunc = useFunc;
    var Type2;
    (function(Type3) {
      Type3[Type3["Num"] = 0] = "Num";
      Type3[Type3["Str"] = 1] = "Str";
    })(Type2 || (exports.Type = Type2 = {}));
    function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
      if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type2.Num;
        return jsPropertySyntax ? isNumber ? (0, codegen_1._)`"[" + ${dataProp} + "]"` : (0, codegen_1._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1._)`"/" + ${dataProp}` : (0, codegen_1._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
      }
      return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
    }
    exports.getErrorPath = getErrorPath;
    function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
      if (!mode)
        return;
      msg = `strict mode: ${msg}`;
      if (mode === true)
        throw new Error(msg);
      it.self.logger.warn(msg);
    }
    exports.checkStrictMode = checkStrictMode;
  }
});

// cli/node_modules/ajv/dist/compile/names.js
var require_names = __commonJS({
  "cli/node_modules/ajv/dist/compile/names.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var names = {
      // validation function arguments
      data: new codegen_1.Name("data"),
      // data passed to validation function
      // args passed from referencing schema
      valCxt: new codegen_1.Name("valCxt"),
      // validation/data context - should not be used directly, it is destructured to the names below
      instancePath: new codegen_1.Name("instancePath"),
      parentData: new codegen_1.Name("parentData"),
      parentDataProperty: new codegen_1.Name("parentDataProperty"),
      rootData: new codegen_1.Name("rootData"),
      // root data - same as the data passed to the first/top validation function
      dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
      // used to support recursiveRef and dynamicRef
      // function scoped variables
      vErrors: new codegen_1.Name("vErrors"),
      // null or array of validation errors
      errors: new codegen_1.Name("errors"),
      // counter of validation errors
      this: new codegen_1.Name("this"),
      // "globals"
      self: new codegen_1.Name("self"),
      scope: new codegen_1.Name("scope"),
      // JTD serialize/parse name for JSON string and position
      json: new codegen_1.Name("json"),
      jsonPos: new codegen_1.Name("jsonPos"),
      jsonLen: new codegen_1.Name("jsonLen"),
      jsonPart: new codegen_1.Name("jsonPart")
    };
    exports.default = names;
  }
});

// cli/node_modules/ajv/dist/compile/errors.js
var require_errors = __commonJS({
  "cli/node_modules/ajv/dist/compile/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    exports.keywordError = {
      message: ({ keyword }) => (0, codegen_1.str)`must pass "${keyword}" keyword validation`
    };
    exports.keyword$DataError = {
      message: ({ keyword, schemaType }) => schemaType ? (0, codegen_1.str)`"${keyword}" keyword must be ${schemaType} ($data)` : (0, codegen_1.str)`"${keyword}" keyword is invalid ($data)`
    };
    function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
        addError(gen, errObj);
      } else {
        returnErrors(it, (0, codegen_1._)`[${errObj}]`);
      }
    }
    exports.reportError = reportError;
    function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      addError(gen, errObj);
      if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
      }
    }
    exports.reportExtraError = reportExtraError;
    function resetErrorsCount(gen, errsCount) {
      gen.assign(names_1.default.errors, errsCount);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._)`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
    }
    exports.resetErrorsCount = resetErrorsCount;
    function extendErrors({ gen, keyword, schemaValue, data, errsCount, it }) {
      if (errsCount === void 0)
        throw new Error("ajv implementation error");
      const err = gen.name("err");
      gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._)`${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._)`${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._)`${err}.schemaPath`, (0, codegen_1.str)`${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
          gen.assign((0, codegen_1._)`${err}.schema`, schemaValue);
          gen.assign((0, codegen_1._)`${err}.data`, data);
        }
      });
    }
    exports.extendErrors = extendErrors;
    function addError(gen, errObj) {
      const err = gen.const("err", errObj);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._)`[${err}]`), (0, codegen_1._)`${names_1.default.vErrors}.push(${err})`);
      gen.code((0, codegen_1._)`${names_1.default.errors}++`);
    }
    function returnErrors(it, errs) {
      const { gen, validateName, schemaEnv } = it;
      if (schemaEnv.$async) {
        gen.throw((0, codegen_1._)`new ${it.ValidationError}(${errs})`);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, errs);
        gen.return(false);
      }
    }
    var E = {
      keyword: new codegen_1.Name("keyword"),
      schemaPath: new codegen_1.Name("schemaPath"),
      // also used in JTD errors
      params: new codegen_1.Name("params"),
      propertyName: new codegen_1.Name("propertyName"),
      message: new codegen_1.Name("message"),
      schema: new codegen_1.Name("schema"),
      parentSchema: new codegen_1.Name("parentSchema")
    };
    function errorObjectCode(cxt, error, errorPaths) {
      const { createErrors } = cxt.it;
      if (createErrors === false)
        return (0, codegen_1._)`{}`;
      return errorObject(cxt, error, errorPaths);
    }
    function errorObject(cxt, error, errorPaths = {}) {
      const { gen, it } = cxt;
      const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths)
      ];
      extraErrorProps(cxt, error, keyValues);
      return gen.object(...keyValues);
    }
    function errorInstancePath({ errorPath }, { instancePath }) {
      const instPath = instancePath ? (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}` : errorPath;
      return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
    }
    function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
      let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str)`${errSchemaPath}/${keyword}`;
      if (schemaPath) {
        schPath = (0, codegen_1.str)`${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
      }
      return [E.schemaPath, schPath];
    }
    function extraErrorProps(cxt, { params, message }, keyValues) {
      const { keyword, data, schemaValue, it } = cxt;
      const { opts, propertyName, topSchemaRef, schemaPath } = it;
      keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._)`{}`]);
      if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
      }
      if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._)`${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
      }
      if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
    }
  }
});

// cli/node_modules/ajv/dist/compile/validate/boolSchema.js
var require_boolSchema = __commonJS({
  "cli/node_modules/ajv/dist/compile/validate/boolSchema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
    var errors_1 = require_errors();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var boolError = {
      message: "boolean schema is false"
    };
    function topBoolOrEmptySchema(it) {
      const { gen, schema: schema2, validateName } = it;
      if (schema2 === false) {
        falseSchemaError(it, false);
      } else if (typeof schema2 == "object" && schema2.$async === true) {
        gen.return(names_1.default.data);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, null);
        gen.return(true);
      }
    }
    exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
    function boolOrEmptySchema(it, valid) {
      const { gen, schema: schema2 } = it;
      if (schema2 === false) {
        gen.var(valid, false);
        falseSchemaError(it);
      } else {
        gen.var(valid, true);
      }
    }
    exports.boolOrEmptySchema = boolOrEmptySchema;
    function falseSchemaError(it, overrideAllErrors) {
      const { gen, data } = it;
      const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it
      };
      (0, errors_1.reportError)(cxt, boolError, void 0, overrideAllErrors);
    }
  }
});

// cli/node_modules/ajv/dist/compile/rules.js
var require_rules = __commonJS({
  "cli/node_modules/ajv/dist/compile/rules.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRules = exports.isJSONType = void 0;
    var _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
    var jsonTypes = new Set(_jsonTypes);
    function isJSONType(x) {
      return typeof x == "string" && jsonTypes.has(x);
    }
    exports.isJSONType = isJSONType;
    function getRules() {
      const groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] }
      };
      return {
        types: { ...groups, integer: true, boolean: true, null: true },
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {}
      };
    }
    exports.getRules = getRules;
  }
});

// cli/node_modules/ajv/dist/compile/validate/applicability.js
var require_applicability = __commonJS({
  "cli/node_modules/ajv/dist/compile/validate/applicability.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
    function schemaHasRulesForType({ schema: schema2, self }, type2) {
      const group = self.RULES.types[type2];
      return group && group !== true && shouldUseGroup(schema2, group);
    }
    exports.schemaHasRulesForType = schemaHasRulesForType;
    function shouldUseGroup(schema2, group) {
      return group.rules.some((rule) => shouldUseRule(schema2, rule));
    }
    exports.shouldUseGroup = shouldUseGroup;
    function shouldUseRule(schema2, rule) {
      var _a;
      return schema2[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema2[kwd] !== void 0));
    }
    exports.shouldUseRule = shouldUseRule;
  }
});

// cli/node_modules/ajv/dist/compile/validate/dataType.js
var require_dataType = __commonJS({
  "cli/node_modules/ajv/dist/compile/validate/dataType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
    var rules_1 = require_rules();
    var applicability_1 = require_applicability();
    var errors_1 = require_errors();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var DataType;
    (function(DataType2) {
      DataType2[DataType2["Correct"] = 0] = "Correct";
      DataType2[DataType2["Wrong"] = 1] = "Wrong";
    })(DataType || (exports.DataType = DataType = {}));
    function getSchemaTypes(schema2) {
      const types2 = getJSONTypes(schema2.type);
      const hasNull = types2.includes("null");
      if (hasNull) {
        if (schema2.nullable === false)
          throw new Error("type: null contradicts nullable: false");
      } else {
        if (!types2.length && schema2.nullable !== void 0) {
          throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema2.nullable === true)
          types2.push("null");
      }
      return types2;
    }
    exports.getSchemaTypes = getSchemaTypes;
    function getJSONTypes(ts) {
      const types2 = Array.isArray(ts) ? ts : ts ? [ts] : [];
      if (types2.every(rules_1.isJSONType))
        return types2;
      throw new Error("type must be JSONType or JSONType[]: " + types2.join(","));
    }
    exports.getJSONTypes = getJSONTypes;
    function coerceAndCheckDataType(it, types2) {
      const { gen, data, opts } = it;
      const coerceTo = coerceToTypes(types2, opts.coerceTypes);
      const checkTypes = types2.length > 0 && !(coerceTo.length === 0 && types2.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types2[0]));
      if (checkTypes) {
        const wrongType = checkDataTypes(types2, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
          if (coerceTo.length)
            coerceData(it, types2, coerceTo);
          else
            reportTypeError(it);
        });
      }
      return checkTypes;
    }
    exports.coerceAndCheckDataType = coerceAndCheckDataType;
    var COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
    function coerceToTypes(types2, coerceTypes) {
      return coerceTypes ? types2.filter((t) => COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
    }
    function coerceData(it, types2, coerceTo) {
      const { gen, data, opts } = it;
      const dataType = gen.let("dataType", (0, codegen_1._)`typeof ${data}`);
      const coerced = gen.let("coerced", (0, codegen_1._)`undefined`);
      if (opts.coerceTypes === "array") {
        gen.if((0, codegen_1._)`${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_1._)`${data}[0]`).assign(dataType, (0, codegen_1._)`typeof ${data}`).if(checkDataTypes(types2, data, opts.strictNumbers), () => gen.assign(coerced, data)));
      }
      gen.if((0, codegen_1._)`${coerced} !== undefined`);
      for (const t of coerceTo) {
        if (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") {
          coerceSpecificType(t);
        }
      }
      gen.else();
      reportTypeError(it);
      gen.endIf();
      gen.if((0, codegen_1._)`${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
      });
      function coerceSpecificType(t) {
        switch (t) {
          case "string":
            gen.elseIf((0, codegen_1._)`${dataType} == "number" || ${dataType} == "boolean"`).assign(coerced, (0, codegen_1._)`"" + ${data}`).elseIf((0, codegen_1._)`${data} === null`).assign(coerced, (0, codegen_1._)`""`);
            return;
          case "number":
            gen.elseIf((0, codegen_1._)`${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "integer":
            gen.elseIf((0, codegen_1._)`${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "boolean":
            gen.elseIf((0, codegen_1._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_1._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
            return;
          case "null":
            gen.elseIf((0, codegen_1._)`${data} === "" || ${data} === 0 || ${data} === false`);
            gen.assign(coerced, null);
            return;
          case "array":
            gen.elseIf((0, codegen_1._)`${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_1._)`[${data}]`);
        }
      }
    }
    function assignParentData({ gen, parentData, parentDataProperty }, expr) {
      gen.if((0, codegen_1._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1._)`${parentData}[${parentDataProperty}]`, expr));
    }
    function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
      const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
      let cond;
      switch (dataType) {
        case "null":
          return (0, codegen_1._)`${data} ${EQ} null`;
        case "array":
          cond = (0, codegen_1._)`Array.isArray(${data})`;
          break;
        case "object":
          cond = (0, codegen_1._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
          break;
        case "integer":
          cond = numCond((0, codegen_1._)`!(${data} % 1) && !isNaN(${data})`);
          break;
        case "number":
          cond = numCond();
          break;
        default:
          return (0, codegen_1._)`typeof ${data} ${EQ} ${dataType}`;
      }
      return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
      function numCond(_cond = codegen_1.nil) {
        return (0, codegen_1.and)((0, codegen_1._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._)`isFinite(${data})` : codegen_1.nil);
      }
    }
    exports.checkDataType = checkDataType;
    function checkDataTypes(dataTypes, data, strictNums, correct) {
      if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
      }
      let cond;
      const types2 = (0, util_1.toHash)(dataTypes);
      if (types2.array && types2.object) {
        const notObj = (0, codegen_1._)`typeof ${data} != "object"`;
        cond = types2.null ? notObj : (0, codegen_1._)`!${data} || ${notObj}`;
        delete types2.null;
        delete types2.array;
        delete types2.object;
      } else {
        cond = codegen_1.nil;
      }
      if (types2.number)
        delete types2.integer;
      for (const t in types2)
        cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
      return cond;
    }
    exports.checkDataTypes = checkDataTypes;
    var typeError = {
      message: ({ schema: schema2 }) => `must be ${schema2}`,
      params: ({ schema: schema2, schemaValue }) => typeof schema2 == "string" ? (0, codegen_1._)`{type: ${schema2}}` : (0, codegen_1._)`{type: ${schemaValue}}`
    };
    function reportTypeError(it) {
      const cxt = getTypeErrorContext(it);
      (0, errors_1.reportError)(cxt, typeError);
    }
    exports.reportTypeError = reportTypeError;
    function getTypeErrorContext(it) {
      const { gen, data, schema: schema2 } = it;
      const schemaCode = (0, util_1.schemaRefOrVal)(it, schema2, "type");
      return {
        gen,
        keyword: "type",
        data,
        schema: schema2.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema2,
        params: {},
        it
      };
    }
  }
});

// cli/node_modules/ajv/dist/compile/validate/defaults.js
var require_defaults = __commonJS({
  "cli/node_modules/ajv/dist/compile/validate/defaults.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assignDefaults = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function assignDefaults(it, ty) {
      const { properties, items } = it.schema;
      if (ty === "object" && properties) {
        for (const key in properties) {
          assignDefault(it, key, properties[key].default);
        }
      } else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
      }
    }
    exports.assignDefaults = assignDefaults;
    function assignDefault(it, prop, defaultValue) {
      const { gen, compositeRule, data, opts } = it;
      if (defaultValue === void 0)
        return;
      const childData = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(prop)}`;
      if (compositeRule) {
        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
        return;
      }
      let condition = (0, codegen_1._)`${childData} === undefined`;
      if (opts.useDefaults === "empty") {
        condition = (0, codegen_1._)`${condition} || ${childData} === null || ${childData} === ""`;
      }
      gen.if(condition, (0, codegen_1._)`${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
    }
  }
});

// cli/node_modules/ajv/dist/vocabularies/code.js
var require_code2 = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/code.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    var util_2 = require_util();
    function checkReportMissingProp(cxt, prop) {
      const { gen, data, it } = cxt;
      gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: (0, codegen_1._)`${prop}` }, true);
        cxt.error();
      });
    }
    exports.checkReportMissingProp = checkReportMissingProp;
    function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
      return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._)`${missing} = ${prop}`)));
    }
    exports.checkMissingProp = checkMissingProp;
    function reportMissingProp(cxt, missing) {
      cxt.setParams({ missingProperty: missing }, true);
      cxt.error();
    }
    exports.reportMissingProp = reportMissingProp;
    function hasPropFunc(gen) {
      return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._)`Object.prototype.hasOwnProperty`
      });
    }
    exports.hasPropFunc = hasPropFunc;
    function isOwnProperty(gen, data, property) {
      return (0, codegen_1._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
    }
    exports.isOwnProperty = isOwnProperty;
    function propertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
      return ownProperties ? (0, codegen_1._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
    }
    exports.propertyInData = propertyInData;
    function noPropertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} === undefined`;
      return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
    }
    exports.noPropertyInData = noPropertyInData;
    function allSchemaProperties(schemaMap) {
      return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
    }
    exports.allSchemaProperties = allSchemaProperties;
    function schemaProperties(it, schemaMap) {
      return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
    }
    exports.schemaProperties = schemaProperties;
    function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
      const dataAndSchema = passSchema ? (0, codegen_1._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
      const valCxt = [
        [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData]
      ];
      if (it.opts.dynamicRef)
        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
      const args = (0, codegen_1._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
      return context !== codegen_1.nil ? (0, codegen_1._)`${func}.call(${context}, ${args})` : (0, codegen_1._)`${func}(${args})`;
    }
    exports.callValidateCode = callValidateCode;
    var newRegExp = (0, codegen_1._)`new RegExp`;
    function usePattern({ gen, it: { opts } }, pattern) {
      const u = opts.unicodeRegExp ? "u" : "";
      const { regExp } = opts.code;
      const rx = regExp(pattern, u);
      return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`
      });
    }
    exports.usePattern = usePattern;
    function validateArray(cxt) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
      }
      gen.var(valid, true);
      validateItems(() => gen.break());
      return valid;
      function validateItems(notValid) {
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        gen.forRange("i", 0, len, (i) => {
          cxt.subschema({
            keyword,
            dataProp: i,
            dataPropType: util_1.Type.Num
          }, valid);
          gen.if((0, codegen_1.not)(valid), notValid);
        });
      }
    }
    exports.validateArray = validateArray;
    function validateUnion(cxt) {
      const { gen, schema: schema2, keyword, it } = cxt;
      if (!Array.isArray(schema2))
        throw new Error("ajv implementation error");
      const alwaysValid = schema2.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
      if (alwaysValid && !it.opts.unevaluated)
        return;
      const valid = gen.let("valid", false);
      const schValid = gen.name("_valid");
      gen.block(() => schema2.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
          keyword,
          schemaProp: i,
          compositeRule: true
        }, schValid);
        gen.assign(valid, (0, codegen_1._)`${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        if (!merged)
          gen.if((0, codegen_1.not)(valid));
      }));
      cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
    }
    exports.validateUnion = validateUnion;
  }
});

// cli/node_modules/ajv/dist/compile/validate/keyword.js
var require_keyword = __commonJS({
  "cli/node_modules/ajv/dist/compile/validate/keyword.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var code_1 = require_code2();
    var errors_1 = require_errors();
    function macroKeywordCode(cxt, def) {
      const { gen, keyword, schema: schema2, parentSchema, it } = cxt;
      const macroSchema = def.macro.call(it.self, schema2, parentSchema, it);
      const schemaRef = useKeyword(gen, keyword, macroSchema);
      if (it.opts.validateSchema !== false)
        it.self.validateSchema(macroSchema, true);
      const valid = gen.name("valid");
      cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true
      }, valid);
      cxt.pass(valid, () => cxt.error(true));
    }
    exports.macroKeywordCode = macroKeywordCode;
    function funcKeywordCode(cxt, def) {
      var _a;
      const { gen, keyword, schema: schema2, parentSchema, $data, it } = cxt;
      checkAsyncKeyword(it, def);
      const validate = !$data && def.compile ? def.compile.call(it.self, schema2, parentSchema, it) : def.validate;
      const validateRef = useKeyword(gen, keyword, validate);
      const valid = gen.let("valid");
      cxt.block$data(valid, validateKeyword);
      cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
      function validateKeyword() {
        if (def.errors === false) {
          assignValid();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => cxt.error());
        } else {
          const ruleErrs = def.async ? validateAsync() : validateSync();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => addErrs(cxt, ruleErrs));
        }
      }
      function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid((0, codegen_1._)`await `), (e) => gen.assign(valid, false).if((0, codegen_1._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._)`${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
      }
      function validateSync() {
        const validateErrs = (0, codegen_1._)`${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
      }
      function assignValid(_await = def.async ? (0, codegen_1._)`await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !("compile" in def && !$data || def.schema === false);
        gen.assign(valid, (0, codegen_1._)`${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
      }
      function reportErrs(errors) {
        var _a2;
        gen.if((0, codegen_1.not)((_a2 = def.valid) !== null && _a2 !== void 0 ? _a2 : valid), errors);
      }
    }
    exports.funcKeywordCode = funcKeywordCode;
    function modifyData(cxt) {
      const { gen, data, it } = cxt;
      gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._)`${it.parentData}[${it.parentDataProperty}]`));
    }
    function addErrs(cxt, errs) {
      const { gen } = cxt;
      gen.if((0, codegen_1._)`Array.isArray(${errs})`, () => {
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`).assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
        (0, errors_1.extendErrors)(cxt);
      }, () => cxt.error());
    }
    function checkAsyncKeyword({ schemaEnv }, def) {
      if (def.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
    }
    function useKeyword(gen, keyword, result) {
      if (result === void 0)
        throw new Error(`keyword "${keyword}" failed to compile`);
      return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
    }
    function validSchemaType(schema2, schemaType, allowUndefined = false) {
      return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema2) : st === "object" ? schema2 && typeof schema2 == "object" && !Array.isArray(schema2) : typeof schema2 == st || allowUndefined && typeof schema2 == "undefined");
    }
    exports.validSchemaType = validSchemaType;
    function validateKeywordUsage({ schema: schema2, opts, self, errSchemaPath }, def, keyword) {
      if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
      }
      const deps = def.dependencies;
      if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema2, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
      }
      if (def.validateSchema) {
        const valid = def.validateSchema(schema2[keyword]);
        if (!valid) {
          const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` + self.errorsText(def.validateSchema.errors);
          if (opts.validateSchema === "log")
            self.logger.error(msg);
          else
            throw new Error(msg);
        }
      }
    }
    exports.validateKeywordUsage = validateKeywordUsage;
  }
});

// cli/node_modules/ajv/dist/compile/validate/subschema.js
var require_subschema = __commonJS({
  "cli/node_modules/ajv/dist/compile/validate/subschema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function getSubschema(it, { keyword, schemaProp, schema: schema2, schemaPath, errSchemaPath, topSchemaRef }) {
      if (keyword !== void 0 && schema2 !== void 0) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
      }
      if (keyword !== void 0) {
        const sch = it.schema[keyword];
        return schemaProp === void 0 ? {
          schema: sch,
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}`
        } : {
          schema: sch[schemaProp],
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`
        };
      }
      if (schema2 !== void 0) {
        if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
          throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
          schema: schema2,
          schemaPath,
          topSchemaRef,
          errSchemaPath
        };
      }
      throw new Error('either "keyword" or "schema" must be passed');
    }
    exports.getSubschema = getSubschema;
    function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
      if (data !== void 0 && dataProp !== void 0) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
      }
      const { gen } = it;
      if (dataProp !== void 0) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", (0, codegen_1._)`${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = (0, codegen_1._)`${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
      }
      if (data !== void 0) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true);
        dataContextProps(nextData);
        if (propertyName !== void 0)
          subschema.propertyName = propertyName;
      }
      if (dataTypes)
        subschema.dataTypes = dataTypes;
      function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = /* @__PURE__ */ new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
      }
    }
    exports.extendSubschemaData = extendSubschemaData;
    function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
      if (compositeRule !== void 0)
        subschema.compositeRule = compositeRule;
      if (createErrors !== void 0)
        subschema.createErrors = createErrors;
      if (allErrors !== void 0)
        subschema.allErrors = allErrors;
      subschema.jtdDiscriminator = jtdDiscriminator;
      subschema.jtdMetadata = jtdMetadata;
    }
    exports.extendSubschemaMode = extendSubschemaMode;
  }
});

// cli/node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "cli/node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i])) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// cli/node_modules/json-schema-traverse/index.js
var require_json_schema_traverse = __commonJS({
  "cli/node_modules/json-schema-traverse/index.js"(exports, module) {
    "use strict";
    var traverse = module.exports = function(schema2, opts, cb) {
      if (typeof opts == "function") {
        cb = opts;
        opts = {};
      }
      cb = opts.cb || cb;
      var pre = typeof cb == "function" ? cb : cb.pre || function() {
      };
      var post = cb.post || function() {
      };
      _traverse(opts, pre, post, schema2, "", schema2);
    };
    traverse.keywords = {
      additionalItems: true,
      items: true,
      contains: true,
      additionalProperties: true,
      propertyNames: true,
      not: true,
      if: true,
      then: true,
      else: true
    };
    traverse.arrayKeywords = {
      items: true,
      allOf: true,
      anyOf: true,
      oneOf: true
    };
    traverse.propsKeywords = {
      $defs: true,
      definitions: true,
      properties: true,
      patternProperties: true,
      dependencies: true
    };
    traverse.skipKeywords = {
      default: true,
      enum: true,
      const: true,
      required: true,
      maximum: true,
      minimum: true,
      exclusiveMaximum: true,
      exclusiveMinimum: true,
      multipleOf: true,
      maxLength: true,
      minLength: true,
      pattern: true,
      format: true,
      maxItems: true,
      minItems: true,
      uniqueItems: true,
      maxProperties: true,
      minProperties: true
    };
    function _traverse(opts, pre, post, schema2, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
      if (schema2 && typeof schema2 == "object" && !Array.isArray(schema2)) {
        pre(schema2, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        for (var key in schema2) {
          var sch = schema2[key];
          if (Array.isArray(sch)) {
            if (key in traverse.arrayKeywords) {
              for (var i = 0; i < sch.length; i++)
                _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema2, i);
            }
          } else if (key in traverse.propsKeywords) {
            if (sch && typeof sch == "object") {
              for (var prop in sch)
                _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema2, prop);
            }
          } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
            _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema2);
          }
        }
        post(schema2, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      }
    }
    function escapeJsonPtr(str2) {
      return str2.replace(/~/g, "~0").replace(/\//g, "~1");
    }
  }
});

// cli/node_modules/ajv/dist/compile/resolve.js
var require_resolve = __commonJS({
  "cli/node_modules/ajv/dist/compile/resolve.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
    var util_1 = require_util();
    var equal = require_fast_deep_equal();
    var traverse = require_json_schema_traverse();
    var SIMPLE_INLINED = /* @__PURE__ */ new Set([
      "type",
      "format",
      "pattern",
      "maxLength",
      "minLength",
      "maxProperties",
      "minProperties",
      "maxItems",
      "minItems",
      "maximum",
      "minimum",
      "uniqueItems",
      "multipleOf",
      "required",
      "enum",
      "const"
    ]);
    function inlineRef(schema2, limit = true) {
      if (typeof schema2 == "boolean")
        return true;
      if (limit === true)
        return !hasRef(schema2);
      if (!limit)
        return false;
      return countKeys(schema2) <= limit;
    }
    exports.inlineRef = inlineRef;
    var REF_KEYWORDS = /* @__PURE__ */ new Set([
      "$ref",
      "$recursiveRef",
      "$recursiveAnchor",
      "$dynamicRef",
      "$dynamicAnchor"
    ]);
    function hasRef(schema2) {
      for (const key in schema2) {
        if (REF_KEYWORDS.has(key))
          return true;
        const sch = schema2[key];
        if (Array.isArray(sch) && sch.some(hasRef))
          return true;
        if (typeof sch == "object" && hasRef(sch))
          return true;
      }
      return false;
    }
    function countKeys(schema2) {
      let count = 0;
      for (const key in schema2) {
        if (key === "$ref")
          return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key))
          continue;
        if (typeof schema2[key] == "object") {
          (0, util_1.eachItem)(schema2[key], (sch) => count += countKeys(sch));
        }
        if (count === Infinity)
          return Infinity;
      }
      return count;
    }
    function getFullPath(resolver, id = "", normalize) {
      if (normalize !== false)
        id = normalizeId(id);
      const p = resolver.parse(id);
      return _getFullPath(resolver, p);
    }
    exports.getFullPath = getFullPath;
    function _getFullPath(resolver, p) {
      const serialized = resolver.serialize(p);
      return serialized.split("#")[0] + "#";
    }
    exports._getFullPath = _getFullPath;
    var TRAILING_SLASH_HASH = /#\/?$/;
    function normalizeId(id) {
      return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
    }
    exports.normalizeId = normalizeId;
    function resolveUrl(resolver, baseId, id) {
      id = normalizeId(id);
      return resolver.resolve(baseId, id);
    }
    exports.resolveUrl = resolveUrl;
    var ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
    function getSchemaRefs(schema2, baseId) {
      if (typeof schema2 == "boolean")
        return {};
      const { schemaId, uriResolver } = this.opts;
      const schId = normalizeId(schema2[schemaId] || baseId);
      const baseIds = { "": schId };
      const pathPrefix = getFullPath(uriResolver, schId, false);
      const localRefs = {};
      const schemaRefs = /* @__PURE__ */ new Set();
      traverse(schema2, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === void 0)
          return;
        const fullPath = pathPrefix + jsonPtr;
        let innerBaseId = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string")
          innerBaseId = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = innerBaseId;
        function addRef(ref) {
          const _resolve = this.opts.uriResolver.resolve;
          ref = normalizeId(innerBaseId ? _resolve(innerBaseId, ref) : ref);
          if (schemaRefs.has(ref))
            throw ambiguos(ref);
          schemaRefs.add(ref);
          let schOrRef = this.refs[ref];
          if (typeof schOrRef == "string")
            schOrRef = this.refs[schOrRef];
          if (typeof schOrRef == "object") {
            checkAmbiguosRef(sch, schOrRef.schema, ref);
          } else if (ref !== normalizeId(fullPath)) {
            if (ref[0] === "#") {
              checkAmbiguosRef(sch, localRefs[ref], ref);
              localRefs[ref] = sch;
            } else {
              this.refs[ref] = fullPath;
            }
          }
          return ref;
        }
        function addAnchor(anchor) {
          if (typeof anchor == "string") {
            if (!ANCHOR.test(anchor))
              throw new Error(`invalid anchor "${anchor}"`);
            addRef.call(this, `#${anchor}`);
          }
        }
      });
      return localRefs;
      function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== void 0 && !equal(sch1, sch2))
          throw ambiguos(ref);
      }
      function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
      }
    }
    exports.getSchemaRefs = getSchemaRefs;
  }
});

// cli/node_modules/ajv/dist/compile/validate/index.js
var require_validate = __commonJS({
  "cli/node_modules/ajv/dist/compile/validate/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
    var boolSchema_1 = require_boolSchema();
    var dataType_1 = require_dataType();
    var applicability_1 = require_applicability();
    var dataType_2 = require_dataType();
    var defaults_1 = require_defaults();
    var keyword_1 = require_keyword();
    var subschema_1 = require_subschema();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var errors_1 = require_errors();
    function validateFunctionCode(it) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          topSchemaObjCode(it);
          return;
        }
      }
      validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
    }
    exports.validateFunctionCode = validateFunctionCode;
    function validateFunction({ gen, validateName, schema: schema2, schemaEnv, opts }, body) {
      if (opts.code.es5) {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
          gen.code((0, codegen_1._)`"use strict"; ${funcSourceUrl(schema2, opts)}`);
          destructureValCxtES5(gen, opts);
          gen.code(body);
        });
      } else {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema2, opts)).code(body));
      }
    }
    function destructureValCxt(opts) {
      return (0, codegen_1._)`{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._)`, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
    }
    function destructureValCxtES5(gen, opts) {
      gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.instancePath}`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
      }, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`""`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`{}`);
      });
    }
    function topSchemaObjCode(it) {
      const { schema: schema2, opts, gen } = it;
      validateFunction(it, () => {
        if (opts.$comment && schema2.$comment)
          commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated)
          resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
      });
      return;
    }
    function resetEvaluated(it) {
      const { gen, validateName } = it;
      it.evaluated = gen.const("evaluated", (0, codegen_1._)`${validateName}.evaluated`);
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._)`${it.evaluated}.props`, (0, codegen_1._)`undefined`));
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._)`${it.evaluated}.items`, (0, codegen_1._)`undefined`));
    }
    function funcSourceUrl(schema2, opts) {
      const schId = typeof schema2 == "object" && schema2[opts.schemaId];
      return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._)`/*# sourceURL=${schId} */` : codegen_1.nil;
    }
    function subschemaCode(it, valid) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          subSchemaObjCode(it, valid);
          return;
        }
      }
      (0, boolSchema_1.boolOrEmptySchema)(it, valid);
    }
    function schemaCxtHasRules({ schema: schema2, self }) {
      if (typeof schema2 == "boolean")
        return !schema2;
      for (const key in schema2)
        if (self.RULES.all[key])
          return true;
      return false;
    }
    function isSchemaObj(it) {
      return typeof it.schema != "boolean";
    }
    function subSchemaObjCode(it, valid) {
      const { schema: schema2, gen, opts } = it;
      if (opts.$comment && schema2.$comment)
        commentKeyword(it);
      updateContext(it);
      checkAsyncSchema(it);
      const errsCount = gen.const("_errs", names_1.default.errors);
      typeAndKeywords(it, errsCount);
      gen.var(valid, (0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
    }
    function checkKeywords(it) {
      (0, util_1.checkUnknownRules)(it);
      checkRefsAndKeywords(it);
    }
    function typeAndKeywords(it, errsCount) {
      if (it.opts.jtd)
        return schemaKeywords(it, [], false, errsCount);
      const types2 = (0, dataType_1.getSchemaTypes)(it.schema);
      const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types2);
      schemaKeywords(it, types2, !checkedTypes, errsCount);
    }
    function checkRefsAndKeywords(it) {
      const { schema: schema2, errSchemaPath, opts, self } = it;
      if (schema2.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema2, self.RULES)) {
        self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
      }
    }
    function checkNoDefault(it) {
      const { schema: schema2, opts } = it;
      if (schema2.default !== void 0 && opts.useDefaults && opts.strictSchema) {
        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
      }
    }
    function updateContext(it) {
      const schId = it.schema[it.opts.schemaId];
      if (schId)
        it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
    }
    function checkAsyncSchema(it) {
      if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
    }
    function commentKeyword({ gen, schemaEnv, schema: schema2, errSchemaPath, opts }) {
      const msg = schema2.$comment;
      if (opts.$comment === true) {
        gen.code((0, codegen_1._)`${names_1.default.self}.logger.log(${msg})`);
      } else if (typeof opts.$comment == "function") {
        const schemaPath = (0, codegen_1.str)`${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code((0, codegen_1._)`${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
      }
    }
    function returnResults(it) {
      const { gen, schemaEnv, validateName, ValidationError: ValidationError2, opts } = it;
      if (schemaEnv.$async) {
        gen.if((0, codegen_1._)`${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._)`new ${ValidationError2}(${names_1.default.vErrors})`));
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated)
          assignEvaluated(it);
        gen.return((0, codegen_1._)`${names_1.default.errors} === 0`);
      }
    }
    function assignEvaluated({ gen, evaluated, props, items }) {
      if (props instanceof codegen_1.Name)
        gen.assign((0, codegen_1._)`${evaluated}.props`, props);
      if (items instanceof codegen_1.Name)
        gen.assign((0, codegen_1._)`${evaluated}.items`, items);
    }
    function schemaKeywords(it, types2, typeErrors, errsCount) {
      const { gen, schema: schema2, data, allErrors, opts, self } = it;
      const { RULES } = self;
      if (schema2.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema2, RULES))) {
        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
        return;
      }
      if (!opts.jtd)
        checkStrictTypes(it, types2);
      gen.block(() => {
        for (const group of RULES.rules)
          groupKeywords(group);
        groupKeywords(RULES.post);
      });
      function groupKeywords(group) {
        if (!(0, applicability_1.shouldUseGroup)(schema2, group))
          return;
        if (group.type) {
          gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
          iterateKeywords(it, group);
          if (types2.length === 1 && types2[0] === group.type && typeErrors) {
            gen.else();
            (0, dataType_2.reportTypeError)(it);
          }
          gen.endIf();
        } else {
          iterateKeywords(it, group);
        }
        if (!allErrors)
          gen.if((0, codegen_1._)`${names_1.default.errors} === ${errsCount || 0}`);
      }
    }
    function iterateKeywords(it, group) {
      const { gen, schema: schema2, opts: { useDefaults } } = it;
      if (useDefaults)
        (0, defaults_1.assignDefaults)(it, group.type);
      gen.block(() => {
        for (const rule of group.rules) {
          if ((0, applicability_1.shouldUseRule)(schema2, rule)) {
            keywordCode(it, rule.keyword, rule.definition, group.type);
          }
        }
      });
    }
    function checkStrictTypes(it, types2) {
      if (it.schemaEnv.meta || !it.opts.strictTypes)
        return;
      checkContextTypes(it, types2);
      if (!it.opts.allowUnionTypes)
        checkMultipleTypes(it, types2);
      checkKeywordTypes(it, it.dataTypes);
    }
    function checkContextTypes(it, types2) {
      if (!types2.length)
        return;
      if (!it.dataTypes.length) {
        it.dataTypes = types2;
        return;
      }
      types2.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
          strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
      });
      narrowSchemaTypes(it, types2);
    }
    function checkMultipleTypes(it, ts) {
      if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
      }
    }
    function checkKeywordTypes(it, ts) {
      const rules = it.self.RULES.all;
      for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
          const { type: type2 } = rule.definition;
          if (type2.length && !type2.some((t) => hasApplicableType(ts, t))) {
            strictTypesError(it, `missing type "${type2.join(",")}" for keyword "${keyword}"`);
          }
        }
      }
    }
    function hasApplicableType(schTs, kwdT) {
      return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
    }
    function includesType(ts, t) {
      return ts.includes(t) || t === "integer" && ts.includes("number");
    }
    function narrowSchemaTypes(it, withTypes) {
      const ts = [];
      for (const t of it.dataTypes) {
        if (includesType(withTypes, t))
          ts.push(t);
        else if (withTypes.includes("integer") && t === "number")
          ts.push("integer");
      }
      it.dataTypes = ts;
    }
    function strictTypesError(it, msg) {
      const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
      msg += ` at "${schemaPath}" (strictTypes)`;
      (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
    }
    var KeywordCxt = class {
      constructor(it, def, keyword) {
        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
          this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        } else {
          this.schemaCode = this.schemaValue;
          if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
            throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
          }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
          this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
      }
      result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
      }
      failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction)
          failAction();
        else
          this.error();
        if (successAction) {
          this.gen.else();
          successAction();
          if (this.allErrors)
            this.gen.endIf();
        } else {
          if (this.allErrors)
            this.gen.endIf();
          else
            this.gen.else();
        }
      }
      pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), void 0, failAction);
      }
      fail(condition) {
        if (condition === void 0) {
          this.error();
          if (!this.allErrors)
            this.gen.if(false);
          return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors)
          this.gen.endIf();
        else
          this.gen.else();
      }
      fail$data(condition) {
        if (!this.$data)
          return this.fail(condition);
        const { schemaCode } = this;
        this.fail((0, codegen_1._)`${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
      }
      error(append, errorParams, errorPaths) {
        if (errorParams) {
          this.setParams(errorParams);
          this._error(append, errorPaths);
          this.setParams({});
          return;
        }
        this._error(append, errorPaths);
      }
      _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
      }
      $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
      }
      reset() {
        if (this.errsCount === void 0)
          throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
      }
      ok(cond) {
        if (!this.allErrors)
          this.gen.if(cond);
      }
      setParams(obj, assign) {
        if (assign)
          Object.assign(this.params, obj);
        else
          this.params = obj;
      }
      block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
          this.check$data(valid, $dataValid);
          codeBlock();
        });
      }
      check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
          return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._)`${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil)
          gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
          gen.elseIf(this.invalid$data());
          this.$dataError();
          if (valid !== codegen_1.nil)
            gen.assign(valid, false);
        }
        gen.else();
      }
      invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
          if (schemaType.length) {
            if (!(schemaCode instanceof codegen_1.Name))
              throw new Error("ajv implementation error");
            const st = Array.isArray(schemaType) ? schemaType : [schemaType];
            return (0, codegen_1._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
          }
          return codegen_1.nil;
        }
        function invalid$DataSchema() {
          if (def.validateSchema) {
            const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema });
            return (0, codegen_1._)`!${validateSchemaRef}(${schemaCode})`;
          }
          return codegen_1.nil;
        }
      }
      subschema(appl, valid) {
        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
        (0, subschema_1.extendSubschemaMode)(subschema, appl);
        const nextContext = { ...this.it, ...subschema, items: void 0, props: void 0 };
        subschemaCode(nextContext, valid);
        return nextContext;
      }
      mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated)
          return;
        if (it.props !== true && schemaCxt.props !== void 0) {
          it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== void 0) {
          it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
      }
      mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
          gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
          return true;
        }
      }
    };
    exports.KeywordCxt = KeywordCxt;
    function keywordCode(it, keyword, def, ruleType) {
      const cxt = new KeywordCxt(it, def, keyword);
      if ("code" in def) {
        def.code(cxt, ruleType);
      } else if (cxt.$data && def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      } else if ("macro" in def) {
        (0, keyword_1.macroKeywordCode)(cxt, def);
      } else if (def.compile || def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      }
    }
    var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
    var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
    function getData($data, { dataLevel, dataNames, dataPathArr }) {
      let jsonPointer;
      let data;
      if ($data === "")
        return names_1.default.rootData;
      if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
      } else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
          if (up >= dataLevel)
            throw new Error(errorMsg("property/index", up));
          return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
          throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer)
          return data;
      }
      let expr = data;
      const segments = jsonPointer.split("/");
      for (const segment of segments) {
        if (segment) {
          data = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
          expr = (0, codegen_1._)`${expr} && ${data}`;
        }
      }
      return expr;
      function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
      }
    }
    exports.getData = getData;
  }
});

// cli/node_modules/ajv/dist/runtime/validation_error.js
var require_validation_error = __commonJS({
  "cli/node_modules/ajv/dist/runtime/validation_error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ValidationError2 = class extends Error {
      constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
      }
    };
    exports.default = ValidationError2;
  }
});

// cli/node_modules/ajv/dist/compile/ref_error.js
var require_ref_error = __commonJS({
  "cli/node_modules/ajv/dist/compile/ref_error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var resolve_1 = require_resolve();
    var MissingRefError = class extends Error {
      constructor(resolver, baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
      }
    };
    exports.default = MissingRefError;
  }
});

// cli/node_modules/ajv/dist/compile/index.js
var require_compile = __commonJS({
  "cli/node_modules/ajv/dist/compile/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
    var codegen_1 = require_codegen();
    var validation_error_1 = require_validation_error();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var validate_1 = require_validate();
    var SchemaEnv = class {
      constructor(env2) {
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema2;
        if (typeof env2.schema == "object")
          schema2 = env2.schema;
        this.schema = env2.schema;
        this.schemaId = env2.schemaId;
        this.root = env2.root || this;
        this.baseId = (_a = env2.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema2 === null || schema2 === void 0 ? void 0 : schema2[env2.schemaId || "$id"]);
        this.schemaPath = env2.schemaPath;
        this.localRefs = env2.localRefs;
        this.meta = env2.meta;
        this.$async = schema2 === null || schema2 === void 0 ? void 0 : schema2.$async;
        this.refs = {};
      }
    };
    exports.SchemaEnv = SchemaEnv;
    function compileSchema(sch) {
      const _sch = getCompilingSchema.call(this, sch);
      if (_sch)
        return _sch;
      const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId);
      const { es5, lines } = this.opts.code;
      const { ownProperties } = this.opts;
      const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
      let _ValidationError;
      if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
          ref: validation_error_1.default,
          code: (0, codegen_1._)`require("ajv/dist/runtime/validation_error").default`
        });
      }
      const validateName = gen.scopeName("validate");
      sch.validateName = validateName;
      const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        // TODO can its length be used as dataLevel if nil is removed?
        dataLevel: 0,
        dataTypes: [],
        definedProperties: /* @__PURE__ */ new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) } : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._)`""`,
        opts: this.opts,
        self: this
      };
      let sourceCode;
      try {
        this._compilations.add(sch);
        (0, validate_1.validateFunctionCode)(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        if (this.opts.code.process)
          sourceCode = this.opts.code.process(sourceCode, sch);
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, { ref: validate });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async)
          validate.$async = true;
        if (this.opts.code.source === true) {
          validate.source = { validateName, validateCode, scopeValues: gen._values };
        }
        if (this.opts.unevaluated) {
          const { props, items } = schemaCxt;
          validate.evaluated = {
            props: props instanceof codegen_1.Name ? void 0 : props,
            items: items instanceof codegen_1.Name ? void 0 : items,
            dynamicProps: props instanceof codegen_1.Name,
            dynamicItems: items instanceof codegen_1.Name
          };
          if (validate.source)
            validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
      } catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode)
          this.logger.error("Error compiling schema, function code:", sourceCode);
        throw e;
      } finally {
        this._compilations.delete(sch);
      }
    }
    exports.compileSchema = compileSchema;
    function resolveRef(root, baseId, ref) {
      var _a;
      ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
      const schOrFunc = root.refs[ref];
      if (schOrFunc)
        return schOrFunc;
      let _sch = resolve3.call(this, root, ref);
      if (_sch === void 0) {
        const schema2 = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref];
        const { schemaId } = this.opts;
        if (schema2)
          _sch = new SchemaEnv({ schema: schema2, schemaId, root, baseId });
      }
      if (_sch === void 0)
        return;
      return root.refs[ref] = inlineOrCompile.call(this, _sch);
    }
    exports.resolveRef = resolveRef;
    function inlineOrCompile(sch) {
      if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
        return sch.schema;
      return sch.validate ? sch : compileSchema.call(this, sch);
    }
    function getCompilingSchema(schEnv) {
      for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv))
          return sch;
      }
    }
    exports.getCompilingSchema = getCompilingSchema;
    function sameSchemaEnv(s1, s2) {
      return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
    }
    function resolve3(root, ref) {
      let sch;
      while (typeof (sch = this.refs[ref]) == "string")
        ref = sch;
      return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
    }
    function resolveSchema(root, ref) {
      const p = this.opts.uriResolver.parse(ref);
      const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
      let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
      if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
      }
      const id = (0, resolve_1.normalizeId)(refPath);
      const schOrRef = this.refs[id] || this.schemas[id];
      if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
          return;
        return getJsonPointer.call(this, p, sch);
      }
      if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
        return;
      if (!schOrRef.validate)
        compileSchema.call(this, schOrRef);
      if (id === (0, resolve_1.normalizeId)(ref)) {
        const { schema: schema2 } = schOrRef;
        const { schemaId } = this.opts;
        const schId = schema2[schemaId];
        if (schId)
          baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        return new SchemaEnv({ schema: schema2, schemaId, root, baseId });
      }
      return getJsonPointer.call(this, p, schOrRef);
    }
    exports.resolveSchema = resolveSchema;
    var PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
      "properties",
      "patternProperties",
      "enum",
      "dependencies",
      "definitions"
    ]);
    function getJsonPointer(parsedRef, { baseId, schema: schema2, root }) {
      var _a;
      if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
        return;
      for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema2 === "boolean")
          return;
        const partSchema = schema2[(0, util_1.unescapeFragment)(part)];
        if (partSchema === void 0)
          return;
        schema2 = partSchema;
        const schId = typeof schema2 === "object" && schema2[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
          baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        }
      }
      let env2;
      if (typeof schema2 != "boolean" && schema2.$ref && !(0, util_1.schemaHasRulesButRef)(schema2, this.RULES)) {
        const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema2.$ref);
        env2 = resolveSchema.call(this, root, $ref);
      }
      const { schemaId } = this.opts;
      env2 = env2 || new SchemaEnv({ schema: schema2, schemaId, root, baseId });
      if (env2.schema !== env2.root.schema)
        return env2;
      return void 0;
    }
  }
});

// cli/node_modules/ajv/dist/refs/data.json
var require_data = __commonJS({
  "cli/node_modules/ajv/dist/refs/data.json"(exports, module) {
    module.exports = {
      $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
      description: "Meta-schema for $data reference (JSON AnySchema extension proposal)",
      type: "object",
      required: ["$data"],
      properties: {
        $data: {
          type: "string",
          anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
        }
      },
      additionalProperties: false
    };
  }
});

// cli/node_modules/fast-uri/lib/utils.js
var require_utils = __commonJS({
  "cli/node_modules/fast-uri/lib/utils.js"(exports, module) {
    "use strict";
    var isUUID = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu);
    var isIPv4 = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
    var isHexPair = RegExp.prototype.test.bind(/^[\da-f]{2}$/iu);
    var isUnreserved = RegExp.prototype.test.bind(/^[\da-z\-._~]$/iu);
    var isPathCharacter = RegExp.prototype.test.bind(/^[\da-z\-._~!$&'()*+,;=:@/]$/iu);
    function stringArrayToHexStripped(input) {
      let acc = "";
      let code = 0;
      let i = 0;
      for (i = 0; i < input.length; i++) {
        code = input[i].charCodeAt(0);
        if (code === 48) {
          continue;
        }
        if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
          return "";
        }
        acc += input[i];
        break;
      }
      for (i += 1; i < input.length; i++) {
        code = input[i].charCodeAt(0);
        if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
          return "";
        }
        acc += input[i];
      }
      return acc;
    }
    var nonSimpleDomain = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
    function consumeIsZone(buffer) {
      buffer.length = 0;
      return true;
    }
    function consumeHextets(buffer, address, output) {
      if (buffer.length) {
        const hex = stringArrayToHexStripped(buffer);
        if (hex !== "") {
          address.push(hex);
        } else {
          output.error = true;
          return false;
        }
        buffer.length = 0;
      }
      return true;
    }
    function getIPV6(input) {
      let tokenCount = 0;
      const output = { error: false, address: "", zone: "" };
      const address = [];
      const buffer = [];
      let endipv6Encountered = false;
      let endIpv6 = false;
      let consume = consumeHextets;
      for (let i = 0; i < input.length; i++) {
        const cursor = input[i];
        if (cursor === "[" || cursor === "]") {
          continue;
        }
        if (cursor === ":") {
          if (endipv6Encountered === true) {
            endIpv6 = true;
          }
          if (!consume(buffer, address, output)) {
            break;
          }
          if (++tokenCount > 7) {
            output.error = true;
            break;
          }
          if (i > 0 && input[i - 1] === ":") {
            endipv6Encountered = true;
          }
          address.push(":");
          continue;
        } else if (cursor === "%") {
          if (!consume(buffer, address, output)) {
            break;
          }
          consume = consumeIsZone;
        } else {
          buffer.push(cursor);
          continue;
        }
      }
      if (buffer.length) {
        if (consume === consumeIsZone) {
          output.zone = buffer.join("");
        } else if (endIpv6) {
          address.push(buffer.join(""));
        } else {
          address.push(stringArrayToHexStripped(buffer));
        }
      }
      output.address = address.join("");
      return output;
    }
    function normalizeIPv6(host) {
      if (findToken(host, ":") < 2) {
        return { host, isIPV6: false };
      }
      const ipv6 = getIPV6(host);
      if (!ipv6.error) {
        let newHost = ipv6.address;
        let escapedHost = ipv6.address;
        if (ipv6.zone) {
          newHost += "%" + ipv6.zone;
          escapedHost += "%25" + ipv6.zone;
        }
        return { host: newHost, isIPV6: true, escapedHost };
      } else {
        return { host, isIPV6: false };
      }
    }
    function findToken(str2, token) {
      let ind = 0;
      for (let i = 0; i < str2.length; i++) {
        if (str2[i] === token) ind++;
      }
      return ind;
    }
    function removeDotSegments(path20) {
      let input = path20;
      const output = [];
      let nextSlash = -1;
      let len = 0;
      while (len = input.length) {
        if (len === 1) {
          if (input === ".") {
            break;
          } else if (input === "/") {
            output.push("/");
            break;
          } else {
            output.push(input);
            break;
          }
        } else if (len === 2) {
          if (input[0] === ".") {
            if (input[1] === ".") {
              break;
            } else if (input[1] === "/") {
              input = input.slice(2);
              continue;
            }
          } else if (input[0] === "/") {
            if (input[1] === "." || input[1] === "/") {
              output.push("/");
              break;
            }
          }
        } else if (len === 3) {
          if (input === "/..") {
            if (output.length !== 0) {
              output.pop();
            }
            output.push("/");
            break;
          }
        }
        if (input[0] === ".") {
          if (input[1] === ".") {
            if (input[2] === "/") {
              input = input.slice(3);
              continue;
            }
          } else if (input[1] === "/") {
            input = input.slice(2);
            continue;
          }
        } else if (input[0] === "/") {
          if (input[1] === ".") {
            if (input[2] === "/") {
              input = input.slice(2);
              continue;
            } else if (input[2] === ".") {
              if (input[3] === "/") {
                input = input.slice(3);
                if (output.length !== 0) {
                  output.pop();
                }
                continue;
              }
            }
          }
        }
        if ((nextSlash = input.indexOf("/", 1)) === -1) {
          output.push(input);
          break;
        } else {
          output.push(input.slice(0, nextSlash));
          input = input.slice(nextSlash);
        }
      }
      return output.join("");
    }
    var HOST_DELIMS = { "@": "%40", "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" };
    var HOST_DELIM_RE = /[@/?#:]/g;
    var HOST_DELIM_NO_COLON_RE = /[@/?#]/g;
    function reescapeHostDelimiters(host, isIP) {
      const re = isIP ? HOST_DELIM_NO_COLON_RE : HOST_DELIM_RE;
      re.lastIndex = 0;
      return host.replace(re, (ch) => HOST_DELIMS[ch]);
    }
    function normalizePercentEncoding(input, decodeUnreserved = false) {
      if (input.indexOf("%") === -1) {
        return input;
      }
      let output = "";
      for (let i = 0; i < input.length; i++) {
        if (input[i] === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            const normalizedHex = hex.toUpperCase();
            const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            if (decodeUnreserved && isUnreserved(decoded)) {
              output += decoded;
            } else {
              output += "%" + normalizedHex;
            }
            i += 2;
            continue;
          }
        }
        output += input[i];
      }
      return output;
    }
    function normalizePathEncoding(input) {
      let output = "";
      for (let i = 0; i < input.length; i++) {
        if (input[i] === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            const normalizedHex = hex.toUpperCase();
            const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            if (decoded !== "." && isUnreserved(decoded)) {
              output += decoded;
            } else {
              output += "%" + normalizedHex;
            }
            i += 2;
            continue;
          }
        }
        if (isPathCharacter(input[i])) {
          output += input[i];
        } else {
          output += escape(input[i]);
        }
      }
      return output;
    }
    function escapePreservingEscapes(input) {
      let output = "";
      for (let i = 0; i < input.length; i++) {
        if (input[i] === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            output += "%" + hex.toUpperCase();
            i += 2;
            continue;
          }
        }
        output += escape(input[i]);
      }
      return output;
    }
    function recomposeAuthority(component) {
      const uriTokens = [];
      if (component.userinfo !== void 0) {
        uriTokens.push(component.userinfo);
        uriTokens.push("@");
      }
      if (component.host !== void 0) {
        let host = unescape(component.host);
        if (!isIPv4(host)) {
          const ipV6res = normalizeIPv6(host);
          if (ipV6res.isIPV6 === true) {
            host = `[${ipV6res.escapedHost}]`;
          } else {
            host = reescapeHostDelimiters(host, false);
          }
        }
        uriTokens.push(host);
      }
      if (typeof component.port === "number" || typeof component.port === "string") {
        uriTokens.push(":");
        uriTokens.push(String(component.port));
      }
      return uriTokens.length ? uriTokens.join("") : void 0;
    }
    module.exports = {
      nonSimpleDomain,
      recomposeAuthority,
      reescapeHostDelimiters,
      normalizePercentEncoding,
      normalizePathEncoding,
      escapePreservingEscapes,
      removeDotSegments,
      isIPv4,
      isUUID,
      normalizeIPv6,
      stringArrayToHexStripped
    };
  }
});

// cli/node_modules/fast-uri/lib/schemes.js
var require_schemes = __commonJS({
  "cli/node_modules/fast-uri/lib/schemes.js"(exports, module) {
    "use strict";
    var { isUUID } = require_utils();
    var URN_REG = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
    var supportedSchemeNames = (
      /** @type {const} */
      [
        "http",
        "https",
        "ws",
        "wss",
        "urn",
        "urn:uuid"
      ]
    );
    function isValidSchemeName(name) {
      return supportedSchemeNames.indexOf(
        /** @type {*} */
        name
      ) !== -1;
    }
    function wsIsSecure(wsComponent) {
      if (wsComponent.secure === true) {
        return true;
      } else if (wsComponent.secure === false) {
        return false;
      } else if (wsComponent.scheme) {
        return wsComponent.scheme.length === 3 && (wsComponent.scheme[0] === "w" || wsComponent.scheme[0] === "W") && (wsComponent.scheme[1] === "s" || wsComponent.scheme[1] === "S") && (wsComponent.scheme[2] === "s" || wsComponent.scheme[2] === "S");
      } else {
        return false;
      }
    }
    function httpParse(component) {
      if (!component.host) {
        component.error = component.error || "HTTP URIs must have a host.";
      }
      return component;
    }
    function httpSerialize(component) {
      const secure = String(component.scheme).toLowerCase() === "https";
      if (component.port === (secure ? 443 : 80) || component.port === "") {
        component.port = void 0;
      }
      if (!component.path) {
        component.path = "/";
      }
      return component;
    }
    function wsParse(wsComponent) {
      wsComponent.secure = wsIsSecure(wsComponent);
      wsComponent.resourceName = (wsComponent.path || "/") + (wsComponent.query ? "?" + wsComponent.query : "");
      wsComponent.path = void 0;
      wsComponent.query = void 0;
      return wsComponent;
    }
    function wsSerialize(wsComponent) {
      if (wsComponent.port === (wsIsSecure(wsComponent) ? 443 : 80) || wsComponent.port === "") {
        wsComponent.port = void 0;
      }
      if (typeof wsComponent.secure === "boolean") {
        wsComponent.scheme = wsComponent.secure ? "wss" : "ws";
        wsComponent.secure = void 0;
      }
      if (wsComponent.resourceName) {
        const [path20, query] = wsComponent.resourceName.split("?");
        wsComponent.path = path20 && path20 !== "/" ? path20 : void 0;
        wsComponent.query = query;
        wsComponent.resourceName = void 0;
      }
      wsComponent.fragment = void 0;
      return wsComponent;
    }
    function urnParse(urnComponent, options) {
      if (!urnComponent.path) {
        urnComponent.error = "URN can not be parsed";
        return urnComponent;
      }
      const matches = urnComponent.path.match(URN_REG);
      if (matches) {
        const scheme = options.scheme || urnComponent.scheme || "urn";
        urnComponent.nid = matches[1].toLowerCase();
        urnComponent.nss = matches[2];
        const urnScheme = `${scheme}:${options.nid || urnComponent.nid}`;
        const schemeHandler = getSchemeHandler(urnScheme);
        urnComponent.path = void 0;
        if (schemeHandler) {
          urnComponent = schemeHandler.parse(urnComponent, options);
        }
      } else {
        urnComponent.error = urnComponent.error || "URN can not be parsed.";
      }
      return urnComponent;
    }
    function urnSerialize(urnComponent, options) {
      if (urnComponent.nid === void 0) {
        throw new Error("URN without nid cannot be serialized");
      }
      const scheme = options.scheme || urnComponent.scheme || "urn";
      const nid = urnComponent.nid.toLowerCase();
      const urnScheme = `${scheme}:${options.nid || nid}`;
      const schemeHandler = getSchemeHandler(urnScheme);
      if (schemeHandler) {
        urnComponent = schemeHandler.serialize(urnComponent, options);
      }
      const uriComponent = urnComponent;
      const nss = urnComponent.nss;
      uriComponent.path = `${nid || options.nid}:${nss}`;
      options.skipEscape = true;
      return uriComponent;
    }
    function urnuuidParse(urnComponent, options) {
      const uuidComponent = urnComponent;
      uuidComponent.uuid = uuidComponent.nss;
      uuidComponent.nss = void 0;
      if (!options.tolerant && (!uuidComponent.uuid || !isUUID(uuidComponent.uuid))) {
        uuidComponent.error = uuidComponent.error || "UUID is not valid.";
      }
      return uuidComponent;
    }
    function urnuuidSerialize(uuidComponent) {
      const urnComponent = uuidComponent;
      urnComponent.nss = (uuidComponent.uuid || "").toLowerCase();
      return urnComponent;
    }
    var http = (
      /** @type {SchemeHandler} */
      {
        scheme: "http",
        domainHost: true,
        parse: httpParse,
        serialize: httpSerialize
      }
    );
    var https = (
      /** @type {SchemeHandler} */
      {
        scheme: "https",
        domainHost: http.domainHost,
        parse: httpParse,
        serialize: httpSerialize
      }
    );
    var ws = (
      /** @type {SchemeHandler} */
      {
        scheme: "ws",
        domainHost: true,
        parse: wsParse,
        serialize: wsSerialize
      }
    );
    var wss = (
      /** @type {SchemeHandler} */
      {
        scheme: "wss",
        domainHost: ws.domainHost,
        parse: ws.parse,
        serialize: ws.serialize
      }
    );
    var urn = (
      /** @type {SchemeHandler} */
      {
        scheme: "urn",
        parse: urnParse,
        serialize: urnSerialize,
        skipNormalize: true
      }
    );
    var urnuuid = (
      /** @type {SchemeHandler} */
      {
        scheme: "urn:uuid",
        parse: urnuuidParse,
        serialize: urnuuidSerialize,
        skipNormalize: true
      }
    );
    var SCHEMES = (
      /** @type {Record<SchemeName, SchemeHandler>} */
      {
        http,
        https,
        ws,
        wss,
        urn,
        "urn:uuid": urnuuid
      }
    );
    Object.setPrototypeOf(SCHEMES, null);
    function getSchemeHandler(scheme) {
      return scheme && (SCHEMES[
        /** @type {SchemeName} */
        scheme
      ] || SCHEMES[
        /** @type {SchemeName} */
        scheme.toLowerCase()
      ]) || void 0;
    }
    module.exports = {
      wsIsSecure,
      SCHEMES,
      isValidSchemeName,
      getSchemeHandler
    };
  }
});

// cli/node_modules/fast-uri/index.js
var require_fast_uri = __commonJS({
  "cli/node_modules/fast-uri/index.js"(exports, module) {
    "use strict";
    var { normalizeIPv6, removeDotSegments, recomposeAuthority, normalizePercentEncoding, normalizePathEncoding, escapePreservingEscapes, reescapeHostDelimiters, isIPv4, nonSimpleDomain } = require_utils();
    var { SCHEMES, getSchemeHandler } = require_schemes();
    function normalize(uri, options) {
      if (typeof uri === "string") {
        uri = /** @type {T} */
        normalizeString(uri, options);
      } else if (typeof uri === "object") {
        uri = /** @type {T} */
        parse(serialize(uri, options), options);
      }
      return uri;
    }
    function resolve3(baseURI, relativeURI, options) {
      const schemelessOptions = options ? Object.assign({ scheme: "null" }, options) : { scheme: "null" };
      const resolved = resolveComponent(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true);
      schemelessOptions.skipEscape = true;
      return serialize(resolved, schemelessOptions);
    }
    function resolveComponent(base, relative3, options, skipNormalization) {
      const target = {};
      if (!skipNormalization) {
        base = parse(serialize(base, options), options);
        relative3 = parse(serialize(relative3, options), options);
      }
      options = options || {};
      if (!options.tolerant && relative3.scheme) {
        target.scheme = relative3.scheme;
        target.userinfo = relative3.userinfo;
        target.host = relative3.host;
        target.port = relative3.port;
        target.path = removeDotSegments(relative3.path || "");
        target.query = relative3.query;
      } else {
        if (relative3.userinfo !== void 0 || relative3.host !== void 0 || relative3.port !== void 0) {
          target.userinfo = relative3.userinfo;
          target.host = relative3.host;
          target.port = relative3.port;
          target.path = removeDotSegments(relative3.path || "");
          target.query = relative3.query;
        } else {
          if (!relative3.path) {
            target.path = base.path;
            if (relative3.query !== void 0) {
              target.query = relative3.query;
            } else {
              target.query = base.query;
            }
          } else {
            if (relative3.path[0] === "/") {
              target.path = removeDotSegments(relative3.path);
            } else {
              if ((base.userinfo !== void 0 || base.host !== void 0 || base.port !== void 0) && !base.path) {
                target.path = "/" + relative3.path;
              } else if (!base.path) {
                target.path = relative3.path;
              } else {
                target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative3.path;
              }
              target.path = removeDotSegments(target.path);
            }
            target.query = relative3.query;
          }
          target.userinfo = base.userinfo;
          target.host = base.host;
          target.port = base.port;
        }
        target.scheme = base.scheme;
      }
      target.fragment = relative3.fragment;
      return target;
    }
    function equal(uriA, uriB, options) {
      const normalizedA = normalizeComparableURI(uriA, options);
      const normalizedB = normalizeComparableURI(uriB, options);
      return normalizedA !== void 0 && normalizedB !== void 0 && normalizedA.toLowerCase() === normalizedB.toLowerCase();
    }
    function serialize(cmpts, opts) {
      const component = {
        host: cmpts.host,
        scheme: cmpts.scheme,
        userinfo: cmpts.userinfo,
        port: cmpts.port,
        path: cmpts.path,
        query: cmpts.query,
        nid: cmpts.nid,
        nss: cmpts.nss,
        uuid: cmpts.uuid,
        fragment: cmpts.fragment,
        reference: cmpts.reference,
        resourceName: cmpts.resourceName,
        secure: cmpts.secure,
        error: ""
      };
      const options = Object.assign({}, opts);
      const uriTokens = [];
      const schemeHandler = getSchemeHandler(options.scheme || component.scheme);
      if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(component, options);
      if (component.path !== void 0) {
        if (!options.skipEscape) {
          component.path = escapePreservingEscapes(component.path);
          if (component.scheme !== void 0) {
            component.path = component.path.split("%3A").join(":");
          }
        } else {
          component.path = normalizePercentEncoding(component.path);
        }
      }
      if (options.reference !== "suffix" && component.scheme) {
        uriTokens.push(component.scheme, ":");
      }
      const authority = recomposeAuthority(component);
      if (authority !== void 0) {
        if (options.reference !== "suffix") {
          uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (component.path && component.path[0] !== "/") {
          uriTokens.push("/");
        }
      }
      if (component.path !== void 0) {
        let s = component.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
          s = removeDotSegments(s);
        }
        if (authority === void 0 && s[0] === "/" && s[1] === "/") {
          s = "/%2F" + s.slice(2);
        }
        uriTokens.push(s);
      }
      if (component.query !== void 0) {
        uriTokens.push("?", component.query);
      }
      if (component.fragment !== void 0) {
        uriTokens.push("#", component.fragment);
      }
      return uriTokens.join("");
    }
    var URI_PARSE = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
    function getParseError(parsed, matches) {
      if (matches[2] !== void 0 && parsed.path && parsed.path[0] !== "/") {
        return 'URI path must start with "/" when authority is present.';
      }
      if (typeof parsed.port === "number" && (parsed.port < 0 || parsed.port > 65535)) {
        return "URI port is malformed.";
      }
      return void 0;
    }
    function parseWithStatus(uri, opts) {
      const options = Object.assign({}, opts);
      const parsed = {
        scheme: void 0,
        userinfo: void 0,
        host: "",
        port: void 0,
        path: "",
        query: void 0,
        fragment: void 0
      };
      let malformedAuthorityOrPort = false;
      let isIP = false;
      if (options.reference === "suffix") {
        if (options.scheme) {
          uri = options.scheme + ":" + uri;
        } else {
          uri = "//" + uri;
        }
      }
      const matches = uri.match(URI_PARSE);
      if (matches) {
        parsed.scheme = matches[1];
        parsed.userinfo = matches[3];
        parsed.host = matches[4];
        parsed.port = parseInt(matches[5], 10);
        parsed.path = matches[6] || "";
        parsed.query = matches[7];
        parsed.fragment = matches[8];
        if (isNaN(parsed.port)) {
          parsed.port = matches[5];
        }
        const parseError = getParseError(parsed, matches);
        if (parseError !== void 0) {
          parsed.error = parsed.error || parseError;
          malformedAuthorityOrPort = true;
        }
        if (parsed.host) {
          const ipv4result = isIPv4(parsed.host);
          if (ipv4result === false) {
            const ipv6result = normalizeIPv6(parsed.host);
            parsed.host = ipv6result.host.toLowerCase();
            isIP = ipv6result.isIPV6;
          } else {
            isIP = true;
          }
        }
        if (parsed.scheme === void 0 && parsed.userinfo === void 0 && parsed.host === void 0 && parsed.port === void 0 && parsed.query === void 0 && !parsed.path) {
          parsed.reference = "same-document";
        } else if (parsed.scheme === void 0) {
          parsed.reference = "relative";
        } else if (parsed.fragment === void 0) {
          parsed.reference = "absolute";
        } else {
          parsed.reference = "uri";
        }
        if (options.reference && options.reference !== "suffix" && options.reference !== parsed.reference) {
          parsed.error = parsed.error || "URI is not a " + options.reference + " reference.";
        }
        const schemeHandler = getSchemeHandler(options.scheme || parsed.scheme);
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
          if (parsed.host && (options.domainHost || schemeHandler && schemeHandler.domainHost) && isIP === false && nonSimpleDomain(parsed.host)) {
            try {
              parsed.host = URL.domainToASCII(parsed.host.toLowerCase());
            } catch (e) {
              parsed.error = parsed.error || "Host's domain name can not be converted to ASCII: " + e;
            }
          }
        }
        if (!schemeHandler || schemeHandler && !schemeHandler.skipNormalize) {
          if (uri.indexOf("%") !== -1) {
            if (parsed.scheme !== void 0) {
              parsed.scheme = unescape(parsed.scheme);
            }
            if (parsed.host !== void 0) {
              parsed.host = reescapeHostDelimiters(unescape(parsed.host), isIP);
            }
          }
          if (parsed.path) {
            parsed.path = normalizePathEncoding(parsed.path);
          }
          if (parsed.fragment) {
            try {
              parsed.fragment = encodeURI(decodeURIComponent(parsed.fragment));
            } catch {
              parsed.error = parsed.error || "URI malformed";
            }
          }
        }
        if (schemeHandler && schemeHandler.parse) {
          schemeHandler.parse(parsed, options);
        }
      } else {
        parsed.error = parsed.error || "URI can not be parsed.";
      }
      return { parsed, malformedAuthorityOrPort };
    }
    function parse(uri, opts) {
      return parseWithStatus(uri, opts).parsed;
    }
    function normalizeString(uri, opts) {
      return normalizeStringWithStatus(uri, opts).normalized;
    }
    function normalizeStringWithStatus(uri, opts) {
      const { parsed, malformedAuthorityOrPort } = parseWithStatus(uri, opts);
      return {
        normalized: malformedAuthorityOrPort ? uri : serialize(parsed, opts),
        malformedAuthorityOrPort
      };
    }
    function normalizeComparableURI(uri, opts) {
      if (typeof uri === "string") {
        const { normalized, malformedAuthorityOrPort } = normalizeStringWithStatus(uri, opts);
        return malformedAuthorityOrPort ? void 0 : normalized;
      }
      if (typeof uri === "object") {
        return serialize(uri, opts);
      }
    }
    var fastUri = {
      SCHEMES,
      normalize,
      resolve: resolve3,
      resolveComponent,
      equal,
      serialize,
      parse
    };
    module.exports = fastUri;
    module.exports.default = fastUri;
    module.exports.fastUri = fastUri;
  }
});

// cli/node_modules/ajv/dist/runtime/uri.js
var require_uri = __commonJS({
  "cli/node_modules/ajv/dist/runtime/uri.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var uri = require_fast_uri();
    uri.code = 'require("ajv/dist/runtime/uri").default';
    exports.default = uri;
  }
});

// cli/node_modules/ajv/dist/core.js
var require_core = __commonJS({
  "cli/node_modules/ajv/dist/core.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
    var validate_1 = require_validate();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    var ref_error_1 = require_ref_error();
    var rules_1 = require_rules();
    var compile_1 = require_compile();
    var codegen_2 = require_codegen();
    var resolve_1 = require_resolve();
    var dataType_1 = require_dataType();
    var util_1 = require_util();
    var $dataRefSchema = require_data();
    var uri_1 = require_uri();
    var defaultRegExp = (str2, flags) => new RegExp(str2, flags);
    defaultRegExp.code = "new RegExp";
    var META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
    var EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]);
    var removedOptions = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    };
    var deprecatedOptions = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    };
    var MAX_EXPRESSION = 200;
    function requiredOptions(o) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
      const s = o.strict;
      const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
      const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
      const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
      const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
      return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver
      };
    }
    var Ajv2 = class {
      constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = /* @__PURE__ */ Object.create(null);
        this._compilations = /* @__PURE__ */ new Set();
        this._loading = {};
        this._cache = /* @__PURE__ */ new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
          addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
          addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
          this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
          _dataRefSchema = { ...$dataRefSchema };
          _dataRefSchema.id = _dataRefSchema.$id;
          delete _dataRefSchema.$id;
        }
        if (meta && $data)
          this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
      }
      defaultMeta() {
        const { meta, schemaId } = this.opts;
        return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
      }
      validate(schemaKeyRef, data) {
        let v;
        if (typeof schemaKeyRef == "string") {
          v = this.getSchema(schemaKeyRef);
          if (!v)
            throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        } else {
          v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
          this.errors = v.errors;
        return valid;
      }
      compile(schema2, _meta) {
        const sch = this._addSchema(schema2, _meta);
        return sch.validate || this._compileSchemaEnv(sch);
      }
      compileAsync(schema2, meta) {
        if (typeof this.opts.loadSchema != "function") {
          throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema2, meta);
        async function runCompileAsync(_schema, _meta) {
          await loadMetaSchema.call(this, _schema.$schema);
          const sch = this._addSchema(_schema, _meta);
          return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
          if ($ref && !this.getSchema($ref)) {
            await runCompileAsync.call(this, { $ref }, true);
          }
        }
        async function _compileAsync(sch) {
          try {
            return this._compileSchemaEnv(sch);
          } catch (e) {
            if (!(e instanceof ref_error_1.default))
              throw e;
            checkLoaded.call(this, e);
            await loadMissingSchema.call(this, e.missingSchema);
            return _compileAsync.call(this, sch);
          }
        }
        function checkLoaded({ missingSchema: ref, missingRef }) {
          if (this.refs[ref]) {
            throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
          }
        }
        async function loadMissingSchema(ref) {
          const _schema = await _loadSchema.call(this, ref);
          if (!this.refs[ref])
            await loadMetaSchema.call(this, _schema.$schema);
          if (!this.refs[ref])
            this.addSchema(_schema, ref, meta);
        }
        async function _loadSchema(ref) {
          const p = this._loading[ref];
          if (p)
            return p;
          try {
            return await (this._loading[ref] = loadSchema(ref));
          } finally {
            delete this._loading[ref];
          }
        }
      }
      // Adds schema to the instance
      addSchema(schema2, key, _meta, _validateSchema = this.opts.validateSchema) {
        if (Array.isArray(schema2)) {
          for (const sch of schema2)
            this.addSchema(sch, void 0, _meta, _validateSchema);
          return this;
        }
        let id;
        if (typeof schema2 === "object") {
          const { schemaId } = this.opts;
          id = schema2[schemaId];
          if (id !== void 0 && typeof id != "string") {
            throw new Error(`schema ${schemaId} must be string`);
          }
        }
        key = (0, resolve_1.normalizeId)(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema2, _meta, key, _validateSchema, true);
        return this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(schema2, key, _validateSchema = this.opts.validateSchema) {
        this.addSchema(schema2, key, true, _validateSchema);
        return this;
      }
      //  Validate schema against its meta-schema
      validateSchema(schema2, throwOrLogError) {
        if (typeof schema2 == "boolean")
          return true;
        let $schema;
        $schema = schema2.$schema;
        if ($schema !== void 0 && typeof $schema != "string") {
          throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
          this.logger.warn("meta-schema not available");
          this.errors = null;
          return true;
        }
        const valid = this.validate($schema, schema2);
        if (!valid && throwOrLogError) {
          const message = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(message);
          else
            throw new Error(message);
        }
        return valid;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
          keyRef = sch;
        if (sch === void 0) {
          const { schemaId } = this.opts;
          const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
          sch = compile_1.resolveSchema.call(this, root, keyRef);
          if (!sch)
            return;
          this.refs[keyRef] = sch;
        }
        return sch.validate || this._compileSchemaEnv(sch);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
          this._removeAllSchemas(this.schemas, schemaKeyRef);
          this._removeAllSchemas(this.refs, schemaKeyRef);
          return this;
        }
        switch (typeof schemaKeyRef) {
          case "undefined":
            this._removeAllSchemas(this.schemas);
            this._removeAllSchemas(this.refs);
            this._cache.clear();
            return this;
          case "string": {
            const sch = getSchEnv.call(this, schemaKeyRef);
            if (typeof sch == "object")
              this._cache.delete(sch.schema);
            delete this.schemas[schemaKeyRef];
            delete this.refs[schemaKeyRef];
            return this;
          }
          case "object": {
            const cacheKey = schemaKeyRef;
            this._cache.delete(cacheKey);
            let id = schemaKeyRef[this.opts.schemaId];
            if (id) {
              id = (0, resolve_1.normalizeId)(id);
              delete this.schemas[id];
              delete this.refs[id];
            }
            return this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(definitions) {
        for (const def of definitions)
          this.addKeyword(def);
        return this;
      }
      addKeyword(kwdOrDef, def) {
        let keyword;
        if (typeof kwdOrDef == "string") {
          keyword = kwdOrDef;
          if (typeof def == "object") {
            this.logger.warn("these parameters are deprecated, see docs for addKeyword");
            def.keyword = keyword;
          }
        } else if (typeof kwdOrDef == "object" && def === void 0) {
          def = kwdOrDef;
          keyword = def.keyword;
          if (Array.isArray(keyword) && !keyword.length) {
            throw new Error("addKeywords: keyword must be string or non-empty array");
          }
        } else {
          throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
          (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
          return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
          ...def,
          type: (0, dataType_1.getJSONTypes)(def.type),
          schemaType: (0, dataType_1.getJSONTypes)(def.schemaType)
        };
        (0, util_1.eachItem)(keyword, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
      }
      getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
      }
      // Remove keyword
      removeKeyword(keyword) {
        const { RULES } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules) {
          const i = group.rules.findIndex((rule) => rule.keyword === keyword);
          if (i >= 0)
            group.rules.splice(i, 1);
        }
        return this;
      }
      // Add format
      addFormat(name, format) {
        if (typeof format == "string")
          format = new RegExp(format);
        this.formats[name] = format;
        return this;
      }
      errorsText(errors = this.errors, { separator = ", ", dataVar = "data" } = {}) {
        if (!errors || errors.length === 0)
          return "No errors";
        return errors.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
      }
      $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
          const segments = jsonPointer.split("/").slice(1);
          let keywords = metaSchema;
          for (const seg of segments)
            keywords = keywords[seg];
          for (const key in rules) {
            const rule = rules[key];
            if (typeof rule != "object")
              continue;
            const { $data } = rule.definition;
            const schema2 = keywords[key];
            if ($data && schema2)
              keywords[key] = schemaOrData(schema2);
          }
        }
        return metaSchema;
      }
      _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
          const sch = schemas[keyRef];
          if (!regex || regex.test(keyRef)) {
            if (typeof sch == "string") {
              delete schemas[keyRef];
            } else if (sch && !sch.meta) {
              this._cache.delete(sch.schema);
              delete schemas[keyRef];
            }
          }
        }
      }
      _addSchema(schema2, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id;
        const { schemaId } = this.opts;
        if (typeof schema2 == "object") {
          id = schema2[schemaId];
        } else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          else if (typeof schema2 != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema2);
        if (sch !== void 0)
          return sch;
        baseId = (0, resolve_1.normalizeId)(id || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema2, baseId);
        sch = new compile_1.SchemaEnv({ schema: schema2, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
          if (baseId)
            this._checkUnique(baseId);
          this.refs[baseId] = sch;
        }
        if (validateSchema)
          this.validateSchema(schema2, true);
        return sch;
      }
      _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
          throw new Error(`schema with key or id "${id}" already exists`);
        }
      }
      _compileSchemaEnv(sch) {
        if (sch.meta)
          this._compileMetaSchema(sch);
        else
          compile_1.compileSchema.call(this, sch);
        if (!sch.validate)
          throw new Error("ajv implementation error");
        return sch.validate;
      }
      _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
          compile_1.compileSchema.call(this, sch);
        } finally {
          this.opts = currentOpts;
        }
      }
    };
    Ajv2.ValidationError = validation_error_1.default;
    Ajv2.MissingRefError = ref_error_1.default;
    exports.default = Ajv2;
    function checkOptions(checkOpts, options, msg, log = "error") {
      for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
          this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
      }
    }
    function getSchEnv(keyRef) {
      keyRef = (0, resolve_1.normalizeId)(keyRef);
      return this.schemas[keyRef] || this.refs[keyRef];
    }
    function addInitialSchemas() {
      const optsSchemas = this.opts.schemas;
      if (!optsSchemas)
        return;
      if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
      else
        for (const key in optsSchemas)
          this.addSchema(optsSchemas[key], key);
    }
    function addInitialFormats() {
      for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format)
          this.addFormat(name, format);
      }
    }
    function addInitialKeywords(defs) {
      if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword)
          def.keyword = keyword;
        this.addKeyword(def);
      }
    }
    function getMetaSchemaOptions() {
      const metaOpts = { ...this.opts };
      for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
      return metaOpts;
    }
    var noLogs = { log() {
    }, warn() {
    }, error() {
    } };
    function getLogger(logger) {
      if (logger === false)
        return noLogs;
      if (logger === void 0)
        return console;
      if (logger.log && logger.warn && logger.error)
        return logger;
      throw new Error("logger must implement log, warn and error methods");
    }
    var KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
    function checkKeyword(keyword, def) {
      const { RULES } = this;
      (0, util_1.eachItem)(keyword, (kwd) => {
        if (RULES.keywords[kwd])
          throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
          throw new Error(`Keyword ${kwd} has invalid name`);
      });
      if (!def)
        return;
      if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
      }
    }
    function addRule(keyword, definition, dataType) {
      var _a;
      const post = definition === null || definition === void 0 ? void 0 : definition.post;
      if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES } = this;
      let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
      if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES.rules.push(ruleGroup);
      }
      RULES.keywords[keyword] = true;
      if (!definition)
        return;
      const rule = {
        keyword,
        definition: {
          ...definition,
          type: (0, dataType_1.getJSONTypes)(definition.type),
          schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType)
        }
      };
      if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
      else
        ruleGroup.rules.push(rule);
      RULES.all[keyword] = rule;
      (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
    }
    function addBeforeRule(ruleGroup, rule, before) {
      const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
      if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
      } else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
      }
    }
    function keywordMetaschema(def) {
      let { metaSchema } = def;
      if (metaSchema === void 0)
        return;
      if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
      def.validateSchema = this.compile(metaSchema, true);
    }
    var $dataRef = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function schemaOrData(schema2) {
      return { anyOf: [schema2, $dataRef] };
    }
  }
});

// cli/node_modules/ajv/dist/vocabularies/core/id.js
var require_id = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/core/id.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var def = {
      keyword: "id",
      code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/core/ref.js
var require_ref = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/core/ref.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.callRef = exports.getValidate = void 0;
    var ref_error_1 = require_ref_error();
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var compile_1 = require_compile();
    var util_1 = require_util();
    var def = {
      keyword: "$ref",
      schemaType: "string",
      code(cxt) {
        const { gen, schema: $ref, it } = cxt;
        const { baseId, schemaEnv: env2, validateName, opts, self } = it;
        const { root } = env2;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
          return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
        if (schOrEnv === void 0)
          throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv)
          return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
          if (env2 === root)
            return callRef(cxt, validateName, env2, env2.$async);
          const rootName = gen.scopeValue("root", { ref: root });
          return callRef(cxt, (0, codegen_1._)`${rootName}.validate`, root, root.$async);
        }
        function callValidate(sch) {
          const v = getValidate(cxt, sch);
          callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
          const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
          const valid = gen.name("valid");
          const schCxt = cxt.subschema({
            schema: sch,
            dataTypes: [],
            schemaPath: codegen_1.nil,
            topSchemaRef: schName,
            errSchemaPath: $ref
          }, valid);
          cxt.mergeEvaluated(schCxt);
          cxt.ok(valid);
        }
      }
    };
    function getValidate(cxt, sch) {
      const { gen } = cxt;
      return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
    }
    exports.getValidate = getValidate;
    function callRef(cxt, v, sch, $async) {
      const { gen, it } = cxt;
      const { allErrors, schemaEnv: env2, opts } = it;
      const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
      if ($async)
        callAsyncRef();
      else
        callSyncRef();
      function callAsyncRef() {
        if (!env2.$async)
          throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
          gen.code((0, codegen_1._)`await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
          addEvaluatedFrom(v);
          if (!allErrors)
            gen.assign(valid, true);
        }, (e) => {
          gen.if((0, codegen_1._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
          addErrorsFrom(e);
          if (!allErrors)
            gen.assign(valid, false);
        });
        cxt.ok(valid);
      }
      function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
      }
      function addErrorsFrom(source) {
        const errs = (0, codegen_1._)`${source}.errors`;
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`);
        gen.assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
      }
      function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated)
          return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        if (it.props !== true) {
          if (schEvaluated && !schEvaluated.dynamicProps) {
            if (schEvaluated.props !== void 0) {
              it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
            }
          } else {
            const props = gen.var("props", (0, codegen_1._)`${source}.evaluated.props`);
            it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
          }
        }
        if (it.items !== true) {
          if (schEvaluated && !schEvaluated.dynamicItems) {
            if (schEvaluated.items !== void 0) {
              it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
            }
          } else {
            const items = gen.var("items", (0, codegen_1._)`${source}.evaluated.items`);
            it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
          }
        }
      }
    }
    exports.callRef = callRef;
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/core/index.js
var require_core2 = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/core/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var id_1 = require_id();
    var ref_1 = require_ref();
    var core2 = [
      "$schema",
      "$id",
      "$defs",
      "$vocabulary",
      { keyword: "$comment" },
      "definitions",
      id_1.default,
      ref_1.default
    ];
    exports.default = core2;
  }
});

// cli/node_modules/ajv/dist/vocabularies/validation/limitNumber.js
var require_limitNumber = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/validation/limitNumber.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var ops = codegen_1.operators;
    var KWDs = {
      maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
      minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
      exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
      exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
    };
    var error = {
      message: ({ keyword, schemaCode }) => (0, codegen_1.str)`must be ${KWDs[keyword].okStr} ${schemaCode}`,
      params: ({ keyword, schemaCode }) => (0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
    };
    var def = {
      keyword: Object.keys(KWDs),
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data((0, codegen_1._)`${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/validation/multipleOf.js
var require_multipleOf = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/validation/multipleOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must be multiple of ${schemaCode}`,
      params: ({ schemaCode }) => (0, codegen_1._)`{multipleOf: ${schemaCode}}`
    };
    var def = {
      keyword: "multipleOf",
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, schemaCode, it } = cxt;
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec ? (0, codegen_1._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1._)`${res} !== parseInt(${res})`;
        cxt.fail$data((0, codegen_1._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/runtime/ucs2length.js
var require_ucs2length = __commonJS({
  "cli/node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ucs2length(str2) {
      const len = str2.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str2.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str2.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    exports.default = ucs2length;
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});

// cli/node_modules/ajv/dist/vocabularies/validation/limitLength.js
var require_limitLength = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/validation/limitLength.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var ucs2length_1 = require_ucs2length();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} characters`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxLength", "minLength"],
      type: "string",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? (0, codegen_1._)`${data}.length` : (0, codegen_1._)`${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
        cxt.fail$data((0, codegen_1._)`${len} ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/validation/pattern.js
var require_pattern = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/validation/pattern.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var util_1 = require_util();
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match pattern "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{pattern: ${schemaCode}}`
    };
    var def = {
      keyword: "pattern",
      type: "string",
      schemaType: "string",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema: schema2, schemaCode, it } = cxt;
        const u = it.opts.unicodeRegExp ? "u" : "";
        if ($data) {
          const { regExp } = it.opts.code;
          const regExpCode = regExp.code === "new RegExp" ? (0, codegen_1._)`new RegExp` : (0, util_1.useFunc)(gen, regExp);
          const valid = gen.let("valid");
          gen.try(() => gen.assign(valid, (0, codegen_1._)`${regExpCode}(${schemaCode}, ${u}).test(${data})`), () => gen.assign(valid, false));
          cxt.fail$data((0, codegen_1._)`!${valid}`);
        } else {
          const regExp = (0, code_1.usePattern)(cxt, schema2);
          cxt.fail$data((0, codegen_1._)`!${regExp}.test(${data})`);
        }
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/validation/limitProperties.js
var require_limitProperties = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/validation/limitProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} properties`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxProperties", "minProperties"],
      type: "object",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`Object.keys(${data}).length ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/validation/required.js
var require_required = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/validation/required.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { missingProperty } }) => (0, codegen_1.str)`must have required property '${missingProperty}'`,
      params: ({ params: { missingProperty } }) => (0, codegen_1._)`{missingProperty: ${missingProperty}}`
    };
    var def = {
      keyword: "required",
      type: "object",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, schema: schema2, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema2.length === 0)
          return;
        const useLoop = schema2.length >= opts.loopRequired;
        if (it.allErrors)
          allErrorsMode();
        else
          exitOnErrorMode();
        if (opts.strictRequired) {
          const props = cxt.parentSchema.properties;
          const { definedProperties } = cxt.it;
          for (const requiredKey of schema2) {
            if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
              const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
              const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
              (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
            }
          }
        }
        function allErrorsMode() {
          if (useLoop || $data) {
            cxt.block$data(codegen_1.nil, loopAllRequired);
          } else {
            for (const prop of schema2) {
              (0, code_1.checkReportMissingProp)(cxt, prop);
            }
          }
        }
        function exitOnErrorMode() {
          const missing = gen.let("missing");
          if (useLoop || $data) {
            const valid = gen.let("valid", true);
            cxt.block$data(valid, () => loopUntilMissing(missing, valid));
            cxt.ok(valid);
          } else {
            gen.if((0, code_1.checkMissingProp)(cxt, schema2, missing));
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
          }
        }
        function loopAllRequired() {
          gen.forOf("prop", schemaCode, (prop) => {
            cxt.setParams({ missingProperty: prop });
            gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
          });
        }
        function loopUntilMissing(missing, valid) {
          cxt.setParams({ missingProperty: missing });
          gen.forOf(missing, schemaCode, () => {
            gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
            gen.if((0, codegen_1.not)(valid), () => {
              cxt.error();
              gen.break();
            });
          }, codegen_1.nil);
        }
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/validation/limitItems.js
var require_limitItems = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/validation/limitItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} items`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxItems", "minItems"],
      type: "array",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`${data}.length ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/runtime/equal.js
var require_equal = __commonJS({
  "cli/node_modules/ajv/dist/runtime/equal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var equal = require_fast_deep_equal();
    equal.code = 'require("ajv/dist/runtime/equal").default';
    exports.default = equal;
  }
});

// cli/node_modules/ajv/dist/vocabularies/validation/uniqueItems.js
var require_uniqueItems = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/validation/uniqueItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dataType_1 = require_dataType();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: ({ params: { i, j } }) => (0, codegen_1.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
      params: ({ params: { i, j } }) => (0, codegen_1._)`{i: ${i}, j: ${j}}`
    };
    var def = {
      keyword: "uniqueItems",
      type: "array",
      schemaType: "boolean",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema: schema2, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema2)
          return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._)`${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
          const i = gen.let("i", (0, codegen_1._)`${data}.length`);
          const j = gen.let("j");
          cxt.setParams({ i, j });
          gen.assign(valid, true);
          gen.if((0, codegen_1._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
          return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j) {
          const item = gen.name("item");
          const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
          const indices = gen.const("indices", (0, codegen_1._)`{}`);
          gen.for((0, codegen_1._)`;${i}--;`, () => {
            gen.let(item, (0, codegen_1._)`${data}[${i}]`);
            gen.if(wrongType, (0, codegen_1._)`continue`);
            if (itemTypes.length > 1)
              gen.if((0, codegen_1._)`typeof ${item} == "string"`, (0, codegen_1._)`${item} += "_"`);
            gen.if((0, codegen_1._)`typeof ${indices}[${item}] == "number"`, () => {
              gen.assign(j, (0, codegen_1._)`${indices}[${item}]`);
              cxt.error();
              gen.assign(valid, false).break();
            }).code((0, codegen_1._)`${indices}[${item}] = ${i}`);
          });
        }
        function loopN2(i, j) {
          const eql = (0, util_1.useFunc)(gen, equal_1.default);
          const outer = gen.name("outer");
          gen.label(outer).for((0, codegen_1._)`;${i}--;`, () => gen.for((0, codegen_1._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
            cxt.error();
            gen.assign(valid, false).break(outer);
          })));
        }
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/validation/const.js
var require_const = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/validation/const.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to constant",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValue: ${schemaCode}}`
    };
    var def = {
      keyword: "const",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schemaCode, schema: schema2 } = cxt;
        if ($data || schema2 && typeof schema2 == "object") {
          cxt.fail$data((0, codegen_1._)`!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
        } else {
          cxt.fail((0, codegen_1._)`${schema2} !== ${data}`);
        }
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/validation/enum.js
var require_enum = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/validation/enum.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValues: ${schemaCode}}`
    };
    var def = {
      keyword: "enum",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema: schema2, schemaCode, it } = cxt;
        if (!$data && schema2.length === 0)
          throw new Error("enum must have non-empty array");
        const useLoop = schema2.length >= it.opts.loopEnum;
        let eql;
        const getEql = () => eql !== null && eql !== void 0 ? eql : eql = (0, util_1.useFunc)(gen, equal_1.default);
        let valid;
        if (useLoop || $data) {
          valid = gen.let("valid");
          cxt.block$data(valid, loopEnum);
        } else {
          if (!Array.isArray(schema2))
            throw new Error("ajv implementation error");
          const vSchema = gen.const("vSchema", schemaCode);
          valid = (0, codegen_1.or)(...schema2.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
          gen.assign(valid, false);
          gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
          const sch = schema2[i];
          return typeof sch === "object" && sch !== null ? (0, codegen_1._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1._)`${data} === ${sch}`;
        }
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/validation/index.js
var require_validation = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/validation/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var limitNumber_1 = require_limitNumber();
    var multipleOf_1 = require_multipleOf();
    var limitLength_1 = require_limitLength();
    var pattern_1 = require_pattern();
    var limitProperties_1 = require_limitProperties();
    var required_1 = require_required();
    var limitItems_1 = require_limitItems();
    var uniqueItems_1 = require_uniqueItems();
    var const_1 = require_const();
    var enum_1 = require_enum();
    var validation = [
      // number
      limitNumber_1.default,
      multipleOf_1.default,
      // string
      limitLength_1.default,
      pattern_1.default,
      // object
      limitProperties_1.default,
      required_1.default,
      // array
      limitItems_1.default,
      uniqueItems_1.default,
      // any
      { keyword: "type", schemaType: ["string", "array"] },
      { keyword: "nullable", schemaType: "boolean" },
      const_1.default,
      enum_1.default
    ];
    exports.default = validation;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/additionalItems.js
var require_additionalItems = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/additionalItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateAdditionalItems = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "additionalItems",
      type: "array",
      schemaType: ["boolean", "object"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const { parentSchema, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
          (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
          return;
        }
        validateAdditionalItems(cxt, items);
      }
    };
    function validateAdditionalItems(cxt, items) {
      const { gen, schema: schema2, data, keyword, it } = cxt;
      it.items = true;
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      if (schema2 === false) {
        cxt.setParams({ len: items.length });
        cxt.pass((0, codegen_1._)`${len} <= ${items.length}`);
      } else if (typeof schema2 == "object" && !(0, util_1.alwaysValidSchema)(it, schema2)) {
        const valid = gen.var("valid", (0, codegen_1._)`${len} <= ${items.length}`);
        gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
        cxt.ok(valid);
      }
      function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
          cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
          if (!it.allErrors)
            gen.if((0, codegen_1.not)(valid), () => gen.break());
        });
      }
    }
    exports.validateAdditionalItems = validateAdditionalItems;
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/items.js
var require_items = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/items.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateTuple = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "array", "boolean"],
      before: "uniqueItems",
      code(cxt) {
        const { schema: schema2, it } = cxt;
        if (Array.isArray(schema2))
          return validateTuple(cxt, "additionalItems", schema2);
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema2))
          return;
        cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    function validateTuple(cxt, extraItems, schArr = cxt.schema) {
      const { gen, parentSchema, data, keyword, it } = cxt;
      checkStrictTuple(parentSchema);
      if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
      }
      const valid = gen.name("valid");
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      schArr.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch))
          return;
        gen.if((0, codegen_1._)`${len} > ${i}`, () => cxt.subschema({
          keyword,
          schemaProp: i,
          dataProp: i
        }, valid));
        cxt.ok(valid);
      });
      function checkStrictTuple(sch) {
        const { opts, errSchemaPath } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
          const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
          (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
      }
    }
    exports.validateTuple = validateTuple;
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/prefixItems.js
var require_prefixItems = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/prefixItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var items_1 = require_items();
    var def = {
      keyword: "prefixItems",
      type: "array",
      schemaType: ["array"],
      before: "uniqueItems",
      code: (cxt) => (0, items_1.validateTuple)(cxt, "items")
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/items2020.js
var require_items2020 = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/items2020.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var additionalItems_1 = require_additionalItems();
    var error = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const { schema: schema2, parentSchema, it } = cxt;
        const { prefixItems } = parentSchema;
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema2))
          return;
        if (prefixItems)
          (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
        else
          cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/contains.js
var require_contains = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/contains.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1.str)`must contain at least ${min} valid item(s)` : (0, codegen_1.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
      params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1._)`{minContains: ${min}}` : (0, codegen_1._)`{minContains: ${min}, maxContains: ${max}}`
    };
    var def = {
      keyword: "contains",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema: schema2, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
          min = minContains === void 0 ? 1 : minContains;
          max = maxContains;
        } else {
          min = 1;
        }
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        cxt.setParams({ min, max });
        if (max === void 0 && min === 0) {
          (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
          return;
        }
        if (max !== void 0 && min > max) {
          (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
          cxt.fail();
          return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema2)) {
          let cond = (0, codegen_1._)`${len} >= ${min}`;
          if (max !== void 0)
            cond = (0, codegen_1._)`${cond} && ${len} <= ${max}`;
          cxt.pass(cond);
          return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === void 0 && min === 1) {
          validateItems(valid, () => gen.if(valid, () => gen.break()));
        } else if (min === 0) {
          gen.let(valid, true);
          if (max !== void 0)
            gen.if((0, codegen_1._)`${data}.length > 0`, validateItemsWithCount);
        } else {
          gen.let(valid, false);
          validateItemsWithCount();
        }
        cxt.result(valid, () => cxt.reset());
        function validateItemsWithCount() {
          const schValid = gen.name("_valid");
          const count = gen.let("count", 0);
          validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        function validateItems(_valid, block) {
          gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
              keyword: "contains",
              dataProp: i,
              dataPropType: util_1.Type.Num,
              compositeRule: true
            }, _valid);
            block();
          });
        }
        function checkLimits(count) {
          gen.code((0, codegen_1._)`${count}++`);
          if (max === void 0) {
            gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true).break());
          } else {
            gen.if((0, codegen_1._)`${count} > ${max}`, () => gen.assign(valid, false).break());
            if (min === 1)
              gen.assign(valid, true);
            else
              gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true));
          }
        }
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/dependencies.js
var require_dependencies = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/dependencies.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    exports.error = {
      message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str)`must have ${property_ies} ${deps} when property ${property} is present`;
      },
      params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
      // TODO change to reference
    };
    var def = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: exports.error,
      code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
      }
    };
    function splitDependencies({ schema: schema2 }) {
      const propertyDeps = {};
      const schemaDeps = {};
      for (const key in schema2) {
        if (key === "__proto__")
          continue;
        const deps = Array.isArray(schema2[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema2[key];
      }
      return [propertyDeps, schemaDeps];
    }
    function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
      const { gen, data, it } = cxt;
      if (Object.keys(propertyDeps).length === 0)
        return;
      const missing = gen.let("missing");
      for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
          continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
          property: prop,
          depsCount: deps.length,
          deps: deps.join(", ")
        });
        if (it.allErrors) {
          gen.if(hasProperty, () => {
            for (const depProp of deps) {
              (0, code_1.checkReportMissingProp)(cxt, depProp);
            }
          });
        } else {
          gen.if((0, codegen_1._)`${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
          (0, code_1.reportMissingProp)(cxt, missing);
          gen.else();
        }
      }
    }
    exports.validatePropertyDeps = validatePropertyDeps;
    function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
          continue;
        gen.if(
          (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties),
          () => {
            const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
          },
          () => gen.var(valid, true)
          // TODO var
        );
        cxt.ok(valid);
      }
    }
    exports.validateSchemaDeps = validateSchemaDeps;
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/propertyNames.js
var require_propertyNames = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/propertyNames.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "property name must be valid",
      params: ({ params }) => (0, codegen_1._)`{propertyName: ${params.propertyName}}`
    };
    var def = {
      keyword: "propertyNames",
      type: "object",
      schemaType: ["object", "boolean"],
      error,
      code(cxt) {
        const { gen, schema: schema2, data, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema2))
          return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
          cxt.setParams({ propertyName: key });
          cxt.subschema({
            keyword: "propertyNames",
            data: key,
            dataTypes: ["string"],
            propertyName: key,
            compositeRule: true
          }, valid);
          gen.if((0, codegen_1.not)(valid), () => {
            cxt.error(true);
            if (!it.allErrors)
              gen.break();
          });
        });
        cxt.ok(valid);
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js
var require_additionalProperties = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var util_1 = require_util();
    var error = {
      message: "must NOT have additional properties",
      params: ({ params }) => (0, codegen_1._)`{additionalProperty: ${params.additionalProperty}}`
    };
    var def = {
      keyword: "additionalProperties",
      type: ["object"],
      schemaType: ["boolean", "object"],
      allowUndefined: true,
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema: schema2, parentSchema, data, errsCount, it } = cxt;
        if (!errsCount)
          throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema2))
          return;
        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
          gen.forIn("key", data, (key) => {
            if (!props.length && !patProps.length)
              additionalPropertyCode(key);
            else
              gen.if(isAdditional(key), () => additionalPropertyCode(key));
          });
        }
        function isAdditional(key) {
          let definedProp;
          if (props.length > 8) {
            const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
            definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
          } else if (props.length) {
            definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._)`${key} === ${p}`));
          } else {
            definedProp = codegen_1.nil;
          }
          if (patProps.length) {
            definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._)`${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
          }
          return (0, codegen_1.not)(definedProp);
        }
        function deleteAdditional(key) {
          gen.code((0, codegen_1._)`delete ${data}[${key}]`);
        }
        function additionalPropertyCode(key) {
          if (opts.removeAdditional === "all" || opts.removeAdditional && schema2 === false) {
            deleteAdditional(key);
            return;
          }
          if (schema2 === false) {
            cxt.setParams({ additionalProperty: key });
            cxt.error();
            if (!allErrors)
              gen.break();
            return;
          }
          if (typeof schema2 == "object" && !(0, util_1.alwaysValidSchema)(it, schema2)) {
            const valid = gen.name("valid");
            if (opts.removeAdditional === "failing") {
              applyAdditionalSchema(key, valid, false);
              gen.if((0, codegen_1.not)(valid), () => {
                cxt.reset();
                deleteAdditional(key);
              });
            } else {
              applyAdditionalSchema(key, valid);
              if (!allErrors)
                gen.if((0, codegen_1.not)(valid), () => gen.break());
            }
          }
        }
        function applyAdditionalSchema(key, valid, errors) {
          const subschema = {
            keyword: "additionalProperties",
            dataProp: key,
            dataPropType: util_1.Type.Str
          };
          if (errors === false) {
            Object.assign(subschema, {
              compositeRule: true,
              createErrors: false,
              allErrors: false
            });
          }
          cxt.subschema(subschema, valid);
        }
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/properties.js
var require_properties = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/properties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var validate_1 = require_validate();
    var code_1 = require_code2();
    var util_1 = require_util();
    var additionalProperties_1 = require_additionalProperties();
    var def = {
      keyword: "properties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema: schema2, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
          additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = (0, code_1.allSchemaProperties)(schema2);
        for (const prop of allProps) {
          it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
          it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
        }
        const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema2[p]));
        if (properties.length === 0)
          return;
        const valid = gen.name("valid");
        for (const prop of properties) {
          if (hasDefault(prop)) {
            applyPropertySchema(prop);
          } else {
            gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
            applyPropertySchema(prop);
            if (!it.allErrors)
              gen.else().var(valid, true);
            gen.endIf();
          }
          cxt.it.definedProperties.add(prop);
          cxt.ok(valid);
        }
        function hasDefault(prop) {
          return it.opts.useDefaults && !it.compositeRule && schema2[prop].default !== void 0;
        }
        function applyPropertySchema(prop) {
          cxt.subschema({
            keyword: "properties",
            schemaProp: prop,
            dataProp: prop
          }, valid);
        }
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/patternProperties.js
var require_patternProperties = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/patternProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var util_2 = require_util();
    var def = {
      keyword: "patternProperties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema: schema2, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = (0, code_1.allSchemaProperties)(schema2);
        const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema2[p]));
        if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
          return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
          it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
          for (const pat of patterns) {
            if (checkProperties)
              checkMatchingProperties(pat);
            if (it.allErrors) {
              validateProperties(pat);
            } else {
              gen.var(valid, true);
              validateProperties(pat);
              gen.if(valid);
            }
          }
        }
        function checkMatchingProperties(pat) {
          for (const prop in checkProperties) {
            if (new RegExp(pat).test(prop)) {
              (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
            }
          }
        }
        function validateProperties(pat) {
          gen.forIn("key", data, (key) => {
            gen.if((0, codegen_1._)`${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
              const alwaysValid = alwaysValidPatterns.includes(pat);
              if (!alwaysValid) {
                cxt.subschema({
                  keyword: "patternProperties",
                  schemaProp: pat,
                  dataProp: key,
                  dataPropType: util_2.Type.Str
                }, valid);
              }
              if (it.opts.unevaluated && props !== true) {
                gen.assign((0, codegen_1._)`${props}[${key}]`, true);
              } else if (!alwaysValid && !it.allErrors) {
                gen.if((0, codegen_1.not)(valid), () => gen.break());
              }
            });
          });
        }
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/not.js
var require_not = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/not.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "not",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      code(cxt) {
        const { gen, schema: schema2, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema2)) {
          cxt.fail();
          return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
          keyword: "not",
          compositeRule: true,
          createErrors: false,
          allErrors: false
        }, valid);
        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
      },
      error: { message: "must NOT be valid" }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/anyOf.js
var require_anyOf = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/anyOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var def = {
      keyword: "anyOf",
      schemaType: "array",
      trackErrors: true,
      code: code_1.validateUnion,
      error: { message: "must match a schema in anyOf" }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/oneOf.js
var require_oneOf = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/oneOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "must match exactly one schema in oneOf",
      params: ({ params }) => (0, codegen_1._)`{passingSchemas: ${params.passing}}`
    };
    var def = {
      keyword: "oneOf",
      schemaType: "array",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema: schema2, parentSchema, it } = cxt;
        if (!Array.isArray(schema2))
          throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator)
          return;
        const schArr = schema2;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({ passing });
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
          schArr.forEach((sch, i) => {
            let schCxt;
            if ((0, util_1.alwaysValidSchema)(it, sch)) {
              gen.var(schValid, true);
            } else {
              schCxt = cxt.subschema({
                keyword: "oneOf",
                schemaProp: i,
                compositeRule: true
              }, schValid);
            }
            if (i > 0) {
              gen.if((0, codegen_1._)`${schValid} && ${valid}`).assign(valid, false).assign(passing, (0, codegen_1._)`[${passing}, ${i}]`).else();
            }
            gen.if(schValid, () => {
              gen.assign(valid, true);
              gen.assign(passing, i);
              if (schCxt)
                cxt.mergeEvaluated(schCxt, codegen_1.Name);
            });
          });
        }
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/allOf.js
var require_allOf = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/allOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "allOf",
      schemaType: "array",
      code(cxt) {
        const { gen, schema: schema2, it } = cxt;
        if (!Array.isArray(schema2))
          throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema2.forEach((sch, i) => {
          if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
          const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
          cxt.ok(valid);
          cxt.mergeEvaluated(schCxt);
        });
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/if.js
var require_if = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/if.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params }) => (0, codegen_1.str)`must match "${params.ifClause}" schema`,
      params: ({ params }) => (0, codegen_1._)`{failingKeyword: ${params.ifClause}}`
    };
    var def = {
      keyword: "if",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === void 0 && parentSchema.else === void 0) {
          (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
          return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
          const ifClause = gen.let("ifClause");
          cxt.setParams({ ifClause });
          gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        } else if (hasThen) {
          gen.if(schValid, validateClause("then"));
        } else {
          gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
          const schCxt = cxt.subschema({
            keyword: "if",
            compositeRule: true,
            createErrors: false,
            allErrors: false
          }, schValid);
          cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
          return () => {
            const schCxt = cxt.subschema({ keyword }, schValid);
            gen.assign(valid, schValid);
            cxt.mergeValidEvaluated(schCxt, valid);
            if (ifClause)
              gen.assign(ifClause, (0, codegen_1._)`${keyword}`);
            else
              cxt.setParams({ ifClause: keyword });
          };
        }
      }
    };
    function hasSchema(it, keyword) {
      const schema2 = it.schema[keyword];
      return schema2 !== void 0 && !(0, util_1.alwaysValidSchema)(it, schema2);
    }
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/thenElse.js
var require_thenElse = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/thenElse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: ["then", "else"],
      schemaType: ["object", "boolean"],
      code({ keyword, parentSchema, it }) {
        if (parentSchema.if === void 0)
          (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/applicator/index.js
var require_applicator = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/applicator/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var additionalItems_1 = require_additionalItems();
    var prefixItems_1 = require_prefixItems();
    var items_1 = require_items();
    var items2020_1 = require_items2020();
    var contains_1 = require_contains();
    var dependencies_1 = require_dependencies();
    var propertyNames_1 = require_propertyNames();
    var additionalProperties_1 = require_additionalProperties();
    var properties_1 = require_properties();
    var patternProperties_1 = require_patternProperties();
    var not_1 = require_not();
    var anyOf_1 = require_anyOf();
    var oneOf_1 = require_oneOf();
    var allOf_1 = require_allOf();
    var if_1 = require_if();
    var thenElse_1 = require_thenElse();
    function getApplicator(draft2020 = false) {
      const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default
      ];
      if (draft2020)
        applicator.push(prefixItems_1.default, items2020_1.default);
      else
        applicator.push(additionalItems_1.default, items_1.default);
      applicator.push(contains_1.default);
      return applicator;
    }
    exports.default = getApplicator;
  }
});

// cli/node_modules/ajv/dist/vocabularies/format/format.js
var require_format = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/format/format.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match format "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{format: ${schemaCode}}`
    };
    var def = {
      keyword: "format",
      type: ["number", "string"],
      schemaType: "string",
      $data: true,
      error,
      code(cxt, ruleType) {
        const { gen, data, $data, schema: schema2, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self } = it;
        if (!opts.validateFormats)
          return;
        if ($data)
          validate$DataFormat();
        else
          validateFormat();
        function validate$DataFormat() {
          const fmts = gen.scopeValue("formats", {
            ref: self.formats,
            code: opts.code.formats
          });
          const fDef = gen.const("fDef", (0, codegen_1._)`${fmts}[${schemaCode}]`);
          const fType = gen.let("fType");
          const format = gen.let("format");
          gen.if((0, codegen_1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._)`${fDef}.type || "string"`).assign(format, (0, codegen_1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._)`"string"`).assign(format, fDef));
          cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
          function unknownFmt() {
            if (opts.strictSchema === false)
              return codegen_1.nil;
            return (0, codegen_1._)`${schemaCode} && !${format}`;
          }
          function invalidFmt() {
            const callFormat = schemaEnv.$async ? (0, codegen_1._)`(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))` : (0, codegen_1._)`${format}(${data})`;
            const validData = (0, codegen_1._)`(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
            return (0, codegen_1._)`${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
          }
        }
        function validateFormat() {
          const formatDef = self.formats[schema2];
          if (!formatDef) {
            unknownFormat();
            return;
          }
          if (formatDef === true)
            return;
          const [fmtType, format, fmtRef] = getFormat(formatDef);
          if (fmtType === ruleType)
            cxt.pass(validCondition());
          function unknownFormat() {
            if (opts.strictSchema === false) {
              self.logger.warn(unknownMsg());
              return;
            }
            throw new Error(unknownMsg());
            function unknownMsg() {
              return `unknown format "${schema2}" ignored in schema at path "${errSchemaPath}"`;
            }
          }
          function getFormat(fmtDef) {
            const code = fmtDef instanceof RegExp ? (0, codegen_1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(schema2)}` : void 0;
            const fmt = gen.scopeValue("formats", { key: schema2, ref: fmtDef, code });
            if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
              return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._)`${fmt}.validate`];
            }
            return ["string", fmtDef, fmt];
          }
          function validCondition() {
            if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
              if (!schemaEnv.$async)
                throw new Error("async format in sync schema");
              return (0, codegen_1._)`await ${fmtRef}(${data})`;
            }
            return typeof format == "function" ? (0, codegen_1._)`${fmtRef}(${data})` : (0, codegen_1._)`${fmtRef}.test(${data})`;
          }
        }
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/vocabularies/format/index.js
var require_format2 = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/format/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var format_1 = require_format();
    var format = [format_1.default];
    exports.default = format;
  }
});

// cli/node_modules/ajv/dist/vocabularies/metadata.js
var require_metadata = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/metadata.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.contentVocabulary = exports.metadataVocabulary = void 0;
    exports.metadataVocabulary = [
      "title",
      "description",
      "default",
      "deprecated",
      "readOnly",
      "writeOnly",
      "examples"
    ];
    exports.contentVocabulary = [
      "contentMediaType",
      "contentEncoding",
      "contentSchema"
    ];
  }
});

// cli/node_modules/ajv/dist/vocabularies/draft7.js
var require_draft7 = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/draft7.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require_core2();
    var validation_1 = require_validation();
    var applicator_1 = require_applicator();
    var format_1 = require_format2();
    var metadata_1 = require_metadata();
    var draft7Vocabularies = [
      core_1.default,
      validation_1.default,
      (0, applicator_1.default)(),
      format_1.default,
      metadata_1.metadataVocabulary,
      metadata_1.contentVocabulary
    ];
    exports.default = draft7Vocabularies;
  }
});

// cli/node_modules/ajv/dist/vocabularies/discriminator/types.js
var require_types = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/discriminator/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiscrError = void 0;
    var DiscrError;
    (function(DiscrError2) {
      DiscrError2["Tag"] = "tag";
      DiscrError2["Mapping"] = "mapping";
    })(DiscrError || (exports.DiscrError = DiscrError = {}));
  }
});

// cli/node_modules/ajv/dist/vocabularies/discriminator/index.js
var require_discriminator = __commonJS({
  "cli/node_modules/ajv/dist/vocabularies/discriminator/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var types_1 = require_types();
    var compile_1 = require_compile();
    var ref_error_1 = require_ref_error();
    var util_1 = require_util();
    var error = {
      message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
      params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
    };
    var def = {
      keyword: "discriminator",
      type: "object",
      schemaType: "object",
      error,
      code(cxt) {
        const { gen, data, schema: schema2, parentSchema, it } = cxt;
        const { oneOf } = parentSchema;
        if (!it.opts.discriminator) {
          throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema2.propertyName;
        if (typeof tagName != "string")
          throw new Error("discriminator: requires propertyName");
        if (schema2.mapping)
          throw new Error("discriminator: mapping is not supported");
        if (!oneOf)
          throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
        gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
        cxt.ok(valid);
        function validateMapping() {
          const mapping = getMapping();
          gen.if(false);
          for (const tagValue in mapping) {
            gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
            gen.assign(valid, applyTagSchema(mapping[tagValue]));
          }
          gen.else();
          cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
          gen.endIf();
        }
        function applyTagSchema(schemaProp) {
          const _valid = gen.name("valid");
          const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
          cxt.mergeEvaluated(schCxt, codegen_1.Name);
          return _valid;
        }
        function getMapping() {
          var _a;
          const oneOfMapping = {};
          const topRequired = hasRequired(parentSchema);
          let tagRequired = true;
          for (let i = 0; i < oneOf.length; i++) {
            let sch = oneOf[i];
            if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
              const ref = sch.$ref;
              sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref);
              if (sch instanceof compile_1.SchemaEnv)
                sch = sch.schema;
              if (sch === void 0)
                throw new ref_error_1.default(it.opts.uriResolver, it.baseId, ref);
            }
            const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
            if (typeof propSch != "object") {
              throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
            }
            tagRequired = tagRequired && (topRequired || hasRequired(sch));
            addMappings(propSch, i);
          }
          if (!tagRequired)
            throw new Error(`discriminator: "${tagName}" must be required`);
          return oneOfMapping;
          function hasRequired({ required }) {
            return Array.isArray(required) && required.includes(tagName);
          }
          function addMappings(sch, i) {
            if (sch.const) {
              addMapping(sch.const, i);
            } else if (sch.enum) {
              for (const tagValue of sch.enum) {
                addMapping(tagValue, i);
              }
            } else {
              throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
            }
          }
          function addMapping(tagValue, i) {
            if (typeof tagValue != "string" || tagValue in oneOfMapping) {
              throw new Error(`discriminator: "${tagName}" values must be unique strings`);
            }
            oneOfMapping[tagValue] = i;
          }
        }
      }
    };
    exports.default = def;
  }
});

// cli/node_modules/ajv/dist/refs/json-schema-draft-07.json
var require_json_schema_draft_07 = __commonJS({
  "cli/node_modules/ajv/dist/refs/json-schema-draft-07.json"(exports, module) {
    module.exports = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://json-schema.org/draft-07/schema#",
      title: "Core schema meta-schema",
      definitions: {
        schemaArray: {
          type: "array",
          minItems: 1,
          items: { $ref: "#" }
        },
        nonNegativeInteger: {
          type: "integer",
          minimum: 0
        },
        nonNegativeIntegerDefault0: {
          allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }]
        },
        simpleTypes: {
          enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
        },
        stringArray: {
          type: "array",
          items: { type: "string" },
          uniqueItems: true,
          default: []
        }
      },
      type: ["object", "boolean"],
      properties: {
        $id: {
          type: "string",
          format: "uri-reference"
        },
        $schema: {
          type: "string",
          format: "uri"
        },
        $ref: {
          type: "string",
          format: "uri-reference"
        },
        $comment: {
          type: "string"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        default: true,
        readOnly: {
          type: "boolean",
          default: false
        },
        examples: {
          type: "array",
          items: true
        },
        multipleOf: {
          type: "number",
          exclusiveMinimum: 0
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "number"
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "number"
        },
        maxLength: { $ref: "#/definitions/nonNegativeInteger" },
        minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        pattern: {
          type: "string",
          format: "regex"
        },
        additionalItems: { $ref: "#" },
        items: {
          anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
          default: true
        },
        maxItems: { $ref: "#/definitions/nonNegativeInteger" },
        minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        uniqueItems: {
          type: "boolean",
          default: false
        },
        contains: { $ref: "#" },
        maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
        minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        required: { $ref: "#/definitions/stringArray" },
        additionalProperties: { $ref: "#" },
        definitions: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        properties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        patternProperties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          propertyNames: { format: "regex" },
          default: {}
        },
        dependencies: {
          type: "object",
          additionalProperties: {
            anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }]
          }
        },
        propertyNames: { $ref: "#" },
        const: true,
        enum: {
          type: "array",
          items: true,
          minItems: 1,
          uniqueItems: true
        },
        type: {
          anyOf: [
            { $ref: "#/definitions/simpleTypes" },
            {
              type: "array",
              items: { $ref: "#/definitions/simpleTypes" },
              minItems: 1,
              uniqueItems: true
            }
          ]
        },
        format: { type: "string" },
        contentMediaType: { type: "string" },
        contentEncoding: { type: "string" },
        if: { $ref: "#" },
        then: { $ref: "#" },
        else: { $ref: "#" },
        allOf: { $ref: "#/definitions/schemaArray" },
        anyOf: { $ref: "#/definitions/schemaArray" },
        oneOf: { $ref: "#/definitions/schemaArray" },
        not: { $ref: "#" }
      },
      default: true
    };
  }
});

// cli/node_modules/ajv/dist/ajv.js
var require_ajv = __commonJS({
  "cli/node_modules/ajv/dist/ajv.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv = void 0;
    var core_1 = require_core();
    var draft7_1 = require_draft7();
    var discriminator_1 = require_discriminator();
    var draft7MetaSchema = require_json_schema_draft_07();
    var META_SUPPORT_DATA = ["/properties"];
    var META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
    var Ajv2 = class extends core_1.default {
      _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
          this.addKeyword(discriminator_1.default);
      }
      _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
          return;
        const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
      }
    };
    exports.Ajv = Ajv2;
    module.exports = exports = Ajv2;
    module.exports.Ajv = Ajv2;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Ajv2;
    var validate_1 = require_validate();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function() {
      return validation_error_1.default;
    } });
    var ref_error_1 = require_ref_error();
    Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function() {
      return ref_error_1.default;
    } });
  }
});

// cli/src/lib/pipeline-engine/schemas/orchestration-state-v5.schema.json
var orchestration_state_v5_schema_default;
var init_orchestration_state_v5_schema = __esm({
  "cli/src/lib/pipeline-engine/schemas/orchestration-state-v5.schema.json"() {
    orchestration_state_v5_schema_default = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "orchestration-state-v5",
      title: "Orchestration State v5",
      description: "Canonical schema for the orchestration system's v5 state format.",
      type: "object",
      additionalProperties: false,
      required: ["$schema", "project", "config", "pipeline", "graph"],
      properties: {
        $schema: {
          title: "Schema Version",
          description: "Schema version identifier. Must be orchestration-state-v5.",
          const: "orchestration-state-v5"
        },
        project: {
          title: "Project Metadata",
          description: "Core project identity and timestamps.",
          type: "object",
          additionalProperties: false,
          required: ["name", "created", "updated"],
          properties: {
            name: {
              title: "Project Name",
              description: "Unique project identifier derived from the project directory name.",
              type: "string"
            },
            created: {
              title: "Created Timestamp",
              description: "ISO 8601 timestamp when the project was initialized.",
              type: "string"
            },
            updated: {
              title: "Updated Timestamp",
              description: "ISO 8601 timestamp of the last state mutation.",
              type: "string"
            }
          }
        },
        config: {
          title: "Project Configuration",
          description: "Static configuration values set at project initialization.",
          type: "object",
          additionalProperties: false,
          required: ["gate_mode", "limits", "source_control"],
          properties: {
            gate_mode: {
              title: "Gate Mode",
              description: "Default human gate frequency. Values: ask, task, phase, autonomous.",
              type: "string",
              enum: ["ask", "task", "phase", "autonomous"]
            },
            limits: {
              title: "Execution Limits",
              description: "Safeguard limits for the execution pipeline.",
              type: "object",
              additionalProperties: false,
              required: [
                "max_phases",
                "max_tasks_per_phase",
                "max_retries_per_task",
                "max_consecutive_review_rejections"
              ],
              properties: {
                max_phases: {
                  title: "Max Phases",
                  description: "Maximum number of phases allowed per pipeline run.",
                  type: "integer",
                  minimum: 1
                },
                max_tasks_per_phase: {
                  title: "Max Tasks Per Phase",
                  description: "Maximum number of tasks allowed in a single phase.",
                  type: "integer",
                  minimum: 1
                },
                max_retries_per_task: {
                  title: "Max Retries Per Task",
                  description: "Maximum number of retry attempts per task.",
                  type: "integer",
                  minimum: 0
                },
                max_consecutive_review_rejections: {
                  title: "Max Consecutive Review Rejections",
                  description: "Maximum number of consecutive review rejections before the pipeline halts.",
                  type: "integer",
                  minimum: 0
                }
              }
            },
            source_control: {
              title: "Source Control Configuration",
              description: "Default source control settings for the project.",
              type: "object",
              additionalProperties: false,
              required: ["auto_commit", "auto_pr"],
              properties: {
                auto_commit: {
                  title: "Auto Commit Mode",
                  description: "Controls when commits are made automatically. Values: ask, always, never.",
                  type: "string",
                  enum: ["ask", "always", "never"]
                },
                auto_pr: {
                  title: "Auto PR Mode",
                  description: "Controls when pull requests are created automatically. Values: ask, always, never.",
                  type: "string",
                  enum: ["ask", "always", "never"]
                }
              }
            }
          }
        },
        pipeline: {
          title: "Pipeline Section",
          description: "Current pipeline execution state including tier, source control, and halt information.",
          allOf: [{ $ref: "#/definitions/PipelineSection" }]
        },
        graph: {
          title: "Graph State",
          description: "DAG execution state including the template, current position, and all node states.",
          allOf: [{ $ref: "#/definitions/GraphState" }]
        }
      },
      definitions: {
        NodeStatus: {
          title: "Node Status",
          description: "Execution status of a node. Values: not_started, in_progress, completed, failed, halted, skipped.",
          type: "string",
          enum: ["not_started", "in_progress", "completed", "failed", "halted", "skipped"]
        },
        GraphStatus: {
          title: "Graph Status",
          description: "Execution status of the graph. Values: not_started, in_progress, completed, halted.",
          type: "string",
          enum: ["not_started", "in_progress", "completed", "halted"]
        },
        NodesRecord: {
          title: "Nodes Record",
          description: "A map of node IDs to their NodeState. Keys are string node identifiers.",
          type: "object",
          additionalProperties: {
            title: "Node State Entry",
            description: "The state of a single node, discriminated by the kind field.",
            $ref: "#/definitions/NodeState"
          }
        },
        NodeState: {
          title: "Node State",
          description: "Discriminated union of all possible node state variants, discriminated by the kind field.",
          oneOf: [
            { $ref: "#/definitions/StepNodeState" },
            { $ref: "#/definitions/GateNodeState" },
            { $ref: "#/definitions/ConditionalNodeState" },
            { $ref: "#/definitions/ParallelNodeState" },
            { $ref: "#/definitions/ForEachPhaseNodeState" },
            { $ref: "#/definitions/ForEachTaskNodeState" }
          ]
        },
        StepNodeState: {
          title: "Step Node State",
          description: "State for a step node that executes an action and tracks its document output.",
          type: "object",
          additionalProperties: false,
          required: ["kind", "status", "doc_path", "retries"],
          properties: {
            kind: {
              title: "Node Kind",
              description: "Discriminant for the step node variant. Must be 'step'.",
              const: "step"
            },
            status: {
              title: "Node Status",
              description: "Current execution status of this node.",
              $ref: "#/definitions/NodeStatus"
            },
            doc_path: {
              title: "Document Path",
              description: "Path to the output document produced by this step, or null if not yet created.",
              oneOf: [
                { type: "string" },
                { type: "null" }
              ]
            },
            retries: {
              title: "Retry Count",
              description: "Number of retry attempts taken for this step.",
              type: "integer",
              minimum: 0
            },
            verdict: {
              title: "Verdict",
              description: "Review verdict for this step, or null if not yet reviewed.",
              oneOf: [
                { type: "string" },
                { type: "null" }
              ]
            },
            last_parse_error: {
              title: "Last Parse Error",
              description: "Structured error info from the most recent failed Master Plan parse attempt by the explosion script. Populated on explosion_failed, cleared on explosion_completed. Used by the planner's recovery branch to self-correct.",
              oneOf: [
                {
                  type: "object",
                  additionalProperties: false,
                  required: ["line", "expected", "found", "message"],
                  properties: {
                    line: { type: "integer", minimum: 1 },
                    expected: { type: "string" },
                    found: { type: "string" },
                    message: { type: "string" }
                  }
                },
                { type: "null" }
              ]
            },
            parse_retry_count: {
              title: "Parse Retry Count",
              description: "Number of times the explosion script's parser has rejected the planner's Master Plan output for this node. Reset to 0 on explosion_completed. Hardcoded cap of 3 enforced in the explosion_failed mutation handler.",
              oneOf: [
                { type: "integer", minimum: 0 },
                { type: "null" }
              ]
            }
          }
        },
        GateNodeState: {
          title: "Gate Node State",
          description: "State for a gate node that pauses pipeline execution for human approval.",
          type: "object",
          additionalProperties: false,
          required: ["kind", "status", "gate_active"],
          properties: {
            kind: {
              title: "Node Kind",
              description: "Discriminant for the gate node variant. Must be 'gate'.",
              const: "gate"
            },
            status: {
              title: "Node Status",
              description: "Current execution status of this node.",
              $ref: "#/definitions/NodeStatus"
            },
            gate_active: {
              title: "Gate Active",
              description: "When true, the gate is currently blocking pipeline execution awaiting human approval.",
              type: "boolean"
            }
          }
        },
        ConditionalNodeState: {
          title: "Conditional Node State",
          description: "State for a conditional node that routes execution based on an evaluated condition.",
          type: "object",
          additionalProperties: false,
          required: ["kind", "status", "branch_taken"],
          properties: {
            kind: {
              title: "Node Kind",
              description: "Discriminant for the conditional node variant. Must be 'conditional'.",
              const: "conditional"
            },
            status: {
              title: "Node Status",
              description: "Current execution status of this node.",
              $ref: "#/definitions/NodeStatus"
            },
            branch_taken: {
              title: "Branch Taken",
              description: "Which branch was selected after condition evaluation: 'true', 'false', or null if not yet evaluated.",
              oneOf: [
                { type: "string", enum: ["true", "false"] },
                { type: "null" }
              ]
            }
          }
        },
        ParallelNodeState: {
          title: "Parallel Node State",
          description: "State for a parallel node that executes multiple child nodes concurrently or serially.",
          type: "object",
          additionalProperties: false,
          required: ["kind", "status", "nodes"],
          properties: {
            kind: {
              title: "Node Kind",
              description: "Discriminant for the parallel node variant. Must be 'parallel'.",
              const: "parallel"
            },
            status: {
              title: "Node Status",
              description: "Current execution status of this node.",
              $ref: "#/definitions/NodeStatus"
            },
            nodes: {
              title: "Child Nodes",
              description: "Map of child node IDs to their execution state.",
              $ref: "#/definitions/NodesRecord"
            }
          }
        },
        ForEachPhaseNodeState: {
          title: "For-Each-Phase Node State",
          description: "State for a for_each_phase node that iterates over all phases defined in the master plan.",
          type: "object",
          additionalProperties: false,
          required: ["kind", "status", "iterations"],
          properties: {
            kind: {
              title: "Node Kind",
              description: "Discriminant for the for_each_phase node variant. Must be 'for_each_phase'.",
              const: "for_each_phase"
            },
            status: {
              title: "Node Status",
              description: "Current execution status of this node.",
              $ref: "#/definitions/NodeStatus"
            },
            iterations: {
              title: "Phase Iterations",
              description: "Ordered list of phase iteration entries, one per phase in the master plan.",
              type: "array",
              items: {
                title: "Phase Iteration Entry",
                description: "State for a single phase iteration.",
                $ref: "#/definitions/IterationEntry"
              }
            }
          }
        },
        ForEachTaskNodeState: {
          title: "For-Each-Task Node State",
          description: "State for a for_each_task node that iterates over all tasks in the current phase.",
          type: "object",
          additionalProperties: false,
          required: ["kind", "status", "iterations"],
          properties: {
            kind: {
              title: "Node Kind",
              description: "Discriminant for the for_each_task node variant. Must be 'for_each_task'.",
              const: "for_each_task"
            },
            status: {
              title: "Node Status",
              description: "Current execution status of this node.",
              $ref: "#/definitions/NodeStatus"
            },
            iterations: {
              title: "Task Iterations",
              description: "Ordered list of task iteration entries, one per task in the current phase.",
              type: "array",
              items: {
                title: "Task Iteration Entry",
                description: "State for a single task iteration.",
                $ref: "#/definitions/IterationEntry"
              }
            }
          }
        },
        IterationEntry: {
          title: "Iteration Entry",
          description: "State for a single phase or task iteration within a for-each node.",
          type: "object",
          additionalProperties: false,
          required: ["index", "status", "nodes", "corrective_tasks", "commit_hash"],
          properties: {
            index: {
              title: "Iteration Index",
              description: "0-based iteration index.",
              type: "integer",
              minimum: 0
            },
            status: {
              title: "Iteration Status",
              description: "Current execution status of this iteration.",
              $ref: "#/definitions/NodeStatus"
            },
            nodes: {
              title: "Iteration Nodes",
              description: "Map of node IDs to their execution state for this iteration.",
              $ref: "#/definitions/NodesRecord"
            },
            corrective_tasks: {
              title: "Corrective Tasks",
              description: "Ordered list of corrective task entries injected during this iteration.",
              type: "array",
              items: {
                title: "Corrective Task Entry",
                description: "State for a single corrective task injected into this iteration.",
                $ref: "#/definitions/CorrectiveTaskEntry"
              }
            },
            doc_path: {
              title: "Iteration Doc Path",
              description: "Relative path to the authoring doc for this iteration (phase plan or task handoff). Optional; absent on iterations that have not yet been authored.",
              type: ["string", "null"]
            },
            commit_hash: {
              title: "Commit Hash",
              description: "Per-task commit hash set by the COMMIT_COMPLETED mutation, or null if no commit has been made for this iteration.",
              oneOf: [
                { type: "string" },
                { type: "null" }
              ]
            }
          }
        },
        CorrectiveTaskEntry: {
          title: "Corrective Task Entry",
          description: "State for a corrective task injected into the pipeline after a review rejection.",
          type: "object",
          additionalProperties: false,
          required: ["index", "reason", "injected_after", "status", "nodes", "commit_hash"],
          properties: {
            index: {
              title: "Corrective Task Index",
              description: "1-based corrective attempt number within this iteration.",
              type: "integer",
              minimum: 1
            },
            reason: {
              title: "Injection Reason",
              description: "Human-readable explanation of why this corrective task was injected.",
              type: "string"
            },
            injected_after: {
              title: "Injected After",
              description: "Node ID of the node that triggered the corrective task injection (e.g., 'code_review').",
              type: "string"
            },
            status: {
              title: "Corrective Task Status",
              description: "Current execution status of this corrective task.",
              $ref: "#/definitions/NodeStatus"
            },
            nodes: {
              title: "Corrective Task Nodes",
              description: "Map of node IDs to their execution state for this corrective task.",
              $ref: "#/definitions/NodesRecord"
            },
            doc_path: {
              title: "Corrective Task Doc Path",
              description: "Relative path to the corrective task handoff doc. Optional; absent on entries that have not yet been authored.",
              type: ["string", "null"]
            },
            commit_hash: {
              title: "Commit Hash",
              description: "Per-corrective-task commit hash set by the COMMIT_COMPLETED mutation, or null if no commit has been made for this corrective task.",
              oneOf: [
                { type: "string" },
                { type: "null" }
              ]
            }
          }
        },
        SourceControlState: {
          title: "Source Control State",
          description: "Source control configuration and runtime state for the project. Does not include commit_hash (tracked per-iteration instead).",
          type: "object",
          additionalProperties: false,
          required: [
            "branch",
            "base_branch",
            "worktree_path",
            "auto_commit",
            "auto_pr",
            "remote_url",
            "compare_url",
            "pr_url"
          ],
          properties: {
            branch: {
              title: "Feature Branch",
              description: "Git branch name used for the project's code changes.",
              type: "string"
            },
            base_branch: {
              title: "Base Branch",
              description: "Git branch to merge into when the pull request is created.",
              type: "string"
            },
            worktree_path: {
              title: "Worktree Path",
              description: "Absolute path to the git worktree directory for this project.",
              type: "string"
            },
            auto_commit: {
              title: "Auto Commit Mode",
              description: "Controls when commits are made automatically. Values: ask, always, never.",
              type: "string",
              enum: ["ask", "always", "never"]
            },
            auto_pr: {
              title: "Auto PR Mode",
              description: "Controls when pull requests are created automatically. Values: ask, always, never.",
              type: "string",
              enum: ["ask", "always", "never"]
            },
            remote_url: {
              title: "Remote URL",
              description: "URL of the remote repository, or null if not configured.",
              oneOf: [
                { type: "string" },
                { type: "null" }
              ]
            },
            compare_url: {
              title: "Compare URL",
              description: "URL to compare the feature branch against base branch, or null if not yet available.",
              oneOf: [
                { type: "string" },
                { type: "null" }
              ]
            },
            pr_url: {
              title: "Pull Request URL",
              description: "URL of the created pull request, or null if not yet created.",
              oneOf: [
                { type: "string" },
                { type: "null" }
              ]
            }
          }
        },
        PipelineSection: {
          title: "Pipeline Section",
          description: "Current pipeline execution state including tier, source control configuration, and halt information.",
          type: "object",
          additionalProperties: false,
          required: ["gate_mode", "source_control", "current_tier", "halt_reason"],
          properties: {
            gate_mode: {
              title: "Gate Mode Override",
              description: "Human gate frequency override for this project, or null to use config default. Values: task, phase, autonomous.",
              oneOf: [
                { type: "string", enum: ["task", "phase", "autonomous"] },
                { type: "null" }
              ]
            },
            source_control: {
              title: "Source Control State",
              description: "Source control runtime state for this project, or null if not yet initialized.",
              oneOf: [
                { $ref: "#/definitions/SourceControlState" },
                { type: "null" }
              ]
            },
            current_tier: {
              title: "Current Tier",
              description: "Active pipeline tier. Values: planning, execution, review, halted.",
              type: "string",
              enum: ["planning", "execution", "review", "halted"]
            },
            halt_reason: {
              title: "Halt Reason",
              description: "Human-readable reason why the pipeline halted, or null if the pipeline is not halted.",
              oneOf: [
                { type: "string" },
                { type: "null" }
              ]
            }
          }
        },
        GraphState: {
          title: "Graph State",
          description: "DAG execution state including the pipeline template, current node position, and all node states.",
          type: "object",
          additionalProperties: false,
          required: ["template_id", "status", "current_node_path", "nodes"],
          properties: {
            template_id: {
              title: "Template ID",
              description: "Identifier of the pipeline template being executed.",
              type: "string"
            },
            status: {
              title: "Graph Status",
              description: "Current execution status of the entire graph.",
              $ref: "#/definitions/GraphStatus"
            },
            current_node_path: {
              title: "Current Node Path",
              description: "Dot/bracket path to the currently active node for observability (e.g., 'phase_loop[1].task_loop[2].code_review'), or null if no node is active.",
              oneOf: [
                { type: "string" },
                { type: "null" }
              ]
            },
            nodes: {
              title: "Root Nodes",
              description: "Map of root-level node IDs to their execution state.",
              $ref: "#/definitions/NodesRecord"
            }
          }
        }
      }
    };
  }
});

// cli/src/lib/pipeline-engine/schema-validator.ts
function getValidator() {
  if (validateFn !== null) {
    return validateFn;
  }
  const ajv = new import_ajv.Ajv({ allErrors: true });
  validateFn = ajv.compile(orchestration_state_v5_schema_default);
  return validateFn;
}
function instancePathToDotNotation(instancePath) {
  if (!instancePath) return "";
  const stripped = instancePath.startsWith("/") ? instancePath.slice(1) : instancePath;
  const segments = stripped.split("/");
  let result = "";
  for (const segment of segments) {
    if (/^\d+$/.test(segment)) {
      result += `[${segment}]`;
    } else {
      result += result === "" ? segment : `.${segment}`;
    }
  }
  return result;
}
function formatSchemaError(error) {
  const basePath = instancePathToDotNotation(error.instancePath);
  let path20;
  let problem;
  switch (error.keyword) {
    case "required": {
      const missing = error.params["missingProperty"];
      path20 = basePath ? `${basePath}.${missing}` : missing;
      problem = "required field missing";
      break;
    }
    case "type": {
      const expected = error.params["type"];
      const actual = error.data === null ? "null" : typeof error.data;
      path20 = basePath;
      problem = `expected ${expected}, got ${actual}`;
      break;
    }
    case "enum": {
      const allowedValues = error.params["allowedValues"];
      path20 = basePath;
      problem = `invalid value ${JSON.stringify(error.data)} \u2014 must be one of: ${allowedValues.join(", ")}`;
      break;
    }
    case "const": {
      const expectedValue = error.params["allowedValue"];
      path20 = basePath;
      problem = `expected ${JSON.stringify(expectedValue)}, got ${JSON.stringify(error.data)}`;
      break;
    }
    case "additionalProperties": {
      const additionalProp = error.params["additionalProperty"];
      path20 = basePath ? `${basePath}.${additionalProp}` : additionalProp;
      problem = "unexpected field";
      if (additionalProp === "commit_hash" && basePath.startsWith("pipeline.source_control")) {
        problem += " \u2014 global commit_hash was removed in v5; per-task commit_hash is now recorded on each IterationEntry";
      }
      break;
    }
    case "minimum": {
      const limit = error.params["limit"];
      path20 = basePath;
      problem = `value must be >= ${limit}`;
      break;
    }
    default:
      path20 = basePath;
      problem = error.message ?? "validation failed";
  }
  return `[schema] ${path20}: ${problem}`;
}
function validateStateSchema(state) {
  const validate = getValidator();
  const valid = validate(state);
  if (valid) {
    return [];
  }
  const errors = validate.errors ?? [];
  return errors.map(formatSchemaError);
}
var import_ajv, validateFn;
var init_schema_validator = __esm({
  "cli/src/lib/pipeline-engine/schema-validator.ts"() {
    "use strict";
    import_ajv = __toESM(require_ajv(), 1);
    init_orchestration_state_v5_schema();
    validateFn = null;
  }
});

// cli/src/lib/pipeline-engine/validator.ts
function validateState(_previousState, proposedState, config, template) {
  return [
    ...validateStateSchema(proposedState),
    // schema check (must be first)
    ...checkGraphStatus(proposedState),
    ...checkCorrectiveTaskStructure(proposedState.graph.nodes, "graph.nodes"),
    ...checkNodeStatuses(proposedState.graph.nodes, "graph.nodes"),
    ...checkIterationIndices(proposedState.graph.nodes, "graph.nodes"),
    ...checkCompletedParentChildren(proposedState.graph.nodes, "graph.nodes"),
    ...checkIterationLimits(proposedState, config),
    ...checkNodeKindMatchesTemplate(proposedState, template),
    ...checkStatusTransitions(_previousState, proposedState)
  ];
}
function checkGraphStatus(state) {
  if (!validGraphStatuses.has(state.graph.status)) {
    return [`Invalid graph status: '${state.graph.status}'`];
  }
  return [];
}
function checkNodeStatuses(nodes, path20) {
  const errors = [];
  for (const [id, node] of Object.entries(nodes)) {
    const nodePath = `${path20}.${id}`;
    if (!validNodeStatuses.has(node.status)) {
      errors.push(`Invalid node status '${node.status}' at ${nodePath}`);
    }
    if (node.kind === "for_each_phase" || node.kind === "for_each_task") {
      for (const iter of node.iterations) {
        if (!validNodeStatuses.has(iter.status)) {
          errors.push(`Invalid iteration status '${iter.status}' at ${nodePath}.iterations[${iter.index}]`);
        }
        errors.push(...checkNodeStatuses(iter.nodes, `${nodePath}.iterations[${iter.index}].nodes`));
        for (const ct of iter.corrective_tasks) {
          errors.push(...checkNodeStatuses(ct.nodes, `${nodePath}.iterations[${iter.index}].corrective_tasks[${ct.index}].nodes`));
        }
      }
    }
    if (node.kind === "parallel") {
      errors.push(...checkNodeStatuses(node.nodes, `${nodePath}.nodes`));
    }
  }
  return errors;
}
function checkIterationIndices(nodes, path20) {
  const errors = [];
  for (const [id, node] of Object.entries(nodes)) {
    const nodePath = `${path20}.${id}`;
    if (node.kind === "for_each_phase" || node.kind === "for_each_task") {
      for (let i = 0; i < node.iterations.length; i++) {
        const iter = node.iterations[i];
        if (iter.index !== i) {
          errors.push(`Iteration index mismatch at ${nodePath}.iterations[${i}]: expected ${i}, got ${iter.index}`);
        }
        for (let j = 0; j < iter.corrective_tasks.length; j++) {
          const ct = iter.corrective_tasks[j];
          if (ct.index !== j + 1) {
            errors.push(`Corrective task index mismatch at ${nodePath}.iterations[${i}].corrective_tasks[${j}]: expected ${j + 1}, got ${ct.index}`);
          }
        }
        errors.push(...checkIterationIndices(iter.nodes, `${nodePath}.iterations[${i}].nodes`));
      }
    }
    if (node.kind === "parallel") {
      errors.push(...checkIterationIndices(node.nodes, `${nodePath}.nodes`));
    }
  }
  return errors;
}
function checkCompletedParentChildren(nodes, path20) {
  const errors = [];
  for (const [id, node] of Object.entries(nodes)) {
    const nodePath = `${path20}.${id}`;
    if (node.kind === "for_each_phase" || node.kind === "for_each_task") {
      if (node.status === "completed") {
        for (const iter of node.iterations) {
          errors.push(...findInProgressNodes(iter.nodes, `${nodePath}.iterations[${iter.index}].nodes`, nodePath));
          for (const ct of iter.corrective_tasks) {
            errors.push(...findInProgressNodes(ct.nodes, `${nodePath}.iterations[${iter.index}].corrective_tasks[${ct.index}].nodes`, nodePath));
          }
        }
      }
      for (const iter of node.iterations) {
        errors.push(...checkCompletedParentChildren(iter.nodes, `${nodePath}.iterations[${iter.index}].nodes`));
        for (const ct of iter.corrective_tasks) {
          errors.push(...checkCompletedParentChildren(ct.nodes, `${nodePath}.iterations[${iter.index}].corrective_tasks[${ct.index}].nodes`));
        }
      }
    }
    if (node.kind === "parallel") {
      if (node.status === "completed") {
        errors.push(...findInProgressNodes(node.nodes, `${nodePath}.nodes`, nodePath));
      }
      errors.push(...checkCompletedParentChildren(node.nodes, `${nodePath}.nodes`));
    }
  }
  return errors;
}
function findInProgressNodes(nodes, path20, parentPath) {
  const errors = [];
  for (const [id, node] of Object.entries(nodes)) {
    if (node.status === "in_progress") {
      errors.push(`Node '${path20}.${id}' is in_progress but parent '${parentPath}' is completed`);
    }
    if (node.kind === "for_each_phase" || node.kind === "for_each_task") {
      for (const iter of node.iterations) {
        errors.push(...findInProgressNodes(iter.nodes, `${path20}.${id}.iterations[${iter.index}].nodes`, parentPath));
        for (const ct of iter.corrective_tasks) {
          errors.push(...findInProgressNodes(ct.nodes, `${path20}.${id}.iterations[${iter.index}].corrective_tasks[${ct.index}].nodes`, parentPath));
        }
      }
    }
    if (node.kind === "parallel") {
      errors.push(...findInProgressNodes(node.nodes, `${path20}.${id}.nodes`, parentPath));
    }
  }
  return errors;
}
function checkCorrectiveTaskStructure(nodes, path20) {
  const errors = [];
  for (const [id, node] of Object.entries(nodes)) {
    const nodePath = `${path20}.${id}`;
    if (node.kind === "for_each_phase" || node.kind === "for_each_task") {
      for (const iter of node.iterations) {
        for (const ct of iter.corrective_tasks) {
          errors.push(...validateCorrectiveEntry(ct, `${nodePath}.iterations[${iter.index}].corrective_tasks[${ct.index}]`));
        }
        errors.push(...checkCorrectiveTaskStructure(iter.nodes, `${nodePath}.iterations[${iter.index}].nodes`));
      }
    }
    if (node.kind === "parallel") {
      errors.push(...checkCorrectiveTaskStructure(node.nodes, `${nodePath}.nodes`));
    }
  }
  return errors;
}
function validateCorrectiveEntry(ct, path20) {
  const errors = [];
  if (typeof ct.index !== "number" || ct.index < 1) {
    errors.push(`Corrective task at ${path20} has invalid index: ${ct.index} (must be >= 1)`);
  }
  if (typeof ct.reason !== "string" || ct.reason.length === 0) {
    errors.push(`Corrective task at ${path20} has empty or missing reason`);
  }
  if (typeof ct.injected_after !== "string" || ct.injected_after.length === 0) {
    errors.push(`Corrective task at ${path20} has empty or missing injected_after`);
  }
  if (!validNodeStatuses.has(ct.status)) {
    errors.push(`Corrective task at ${path20} has invalid status: '${ct.status}'`);
  }
  if (!ct.nodes || typeof ct.nodes !== "object") {
    errors.push(`Corrective task at ${path20} has missing or invalid nodes`);
  } else if (ct.injected_after !== "phase_review" && Object.keys(ct.nodes).length === 0) {
    errors.push(`Corrective task at ${path20} has empty or missing nodes`);
  }
  return errors;
}
function checkIterationLimits(state, config) {
  const errors = [];
  const limits = config.limits;
  function walk(nodes, path20) {
    for (const [id, node] of Object.entries(nodes)) {
      const nodePath = `${path20}.${id}`;
      if (node.kind === "for_each_phase") {
        if (node.iterations.length > limits.max_phases) {
          errors.push(`${nodePath} has ${node.iterations.length} iterations, exceeding max_phases limit of ${limits.max_phases}`);
        }
        for (const iter of node.iterations) {
          walk(iter.nodes, `${nodePath}.iterations[${iter.index}].nodes`);
        }
      }
      if (node.kind === "for_each_task") {
        if (node.iterations.length > limits.max_tasks_per_phase) {
          errors.push(`${nodePath} has ${node.iterations.length} iterations, exceeding max_tasks_per_phase limit of ${limits.max_tasks_per_phase}`);
        }
        for (const iter of node.iterations) {
          walk(iter.nodes, `${nodePath}.iterations[${iter.index}].nodes`);
        }
      }
      if (node.kind === "parallel") {
        walk(node.nodes, `${nodePath}.nodes`);
      }
    }
  }
  walk(state.graph.nodes, "graph.nodes");
  return errors;
}
function collectNodeDefKinds(nodes, map2) {
  for (const nodeDef of nodes) {
    map2.set(nodeDef.id, nodeDef.kind);
    if (nodeDef.kind === "for_each_phase" || nodeDef.kind === "for_each_task") {
      collectNodeDefKinds(nodeDef.body, map2);
    }
    if (nodeDef.kind === "conditional") {
      collectNodeDefKinds(nodeDef.branches.true, map2);
      collectNodeDefKinds(nodeDef.branches.false, map2);
    }
    if (nodeDef.kind === "parallel") {
      collectNodeDefKinds(nodeDef.children, map2);
    }
  }
}
function checkNodeKindMatchesTemplate(state, template) {
  const errors = [];
  const templateKindMap = /* @__PURE__ */ new Map();
  collectNodeDefKinds(template.nodes, templateKindMap);
  function walkStateNodes(nodes, path20) {
    for (const [id, node] of Object.entries(nodes)) {
      const nodePath = `${path20}.${id}`;
      const templateKind = templateKindMap.get(id);
      if (templateKind !== void 0 && node.kind !== templateKind) {
        errors.push(`Node '${id}' has kind '${node.kind}' but template defines kind '${templateKind}'`);
      }
      if (node.kind === "for_each_phase" || node.kind === "for_each_task") {
        for (const iter of node.iterations) {
          walkStateNodes(iter.nodes, `${nodePath}.iterations[${iter.index}].nodes`);
          for (const ct of iter.corrective_tasks) {
            walkStateNodes(ct.nodes, `${nodePath}.iterations[${iter.index}].corrective_tasks[${ct.index}].nodes`);
          }
        }
      }
      if (node.kind === "parallel") {
        walkStateNodes(node.nodes, `${nodePath}.nodes`);
      }
    }
  }
  walkStateNodes(state.graph.nodes, "graph.nodes");
  return errors;
}
function checkStatusTransitions(previousState, proposedState) {
  if (!previousState) return [];
  const errors = [];
  compareNodes(
    previousState.graph.nodes,
    proposedState.graph.nodes,
    "graph.nodes",
    errors
  );
  return errors;
}
function compareNodes(prevNodes, currNodes, path20, errors) {
  for (const [id, currNode] of Object.entries(currNodes)) {
    const prevNode = prevNodes[id];
    if (!prevNode) continue;
    if (prevNode.status !== currNode.status) {
      const allowed = ALLOWED_NODE_TRANSITIONS.get(prevNode.status);
      if (allowed && allowed.size === 0) {
        errors.push(
          `Illegal status transition at ${path20}.${id}: '${prevNode.status}' \u2192 '${currNode.status}'`
        );
      }
    }
    if ((currNode.kind === "for_each_phase" || currNode.kind === "for_each_task") && (prevNode.kind === "for_each_phase" || prevNode.kind === "for_each_task")) {
      for (const currIter of currNode.iterations) {
        const prevIter = prevNode.iterations[currIter.index];
        if (!prevIter) continue;
        compareNodes(prevIter.nodes, currIter.nodes, `${path20}.${id}.iterations[${currIter.index}].nodes`, errors);
        for (const currCt of currIter.corrective_tasks) {
          const prevCt = prevIter.corrective_tasks.find((ct) => ct.index === currCt.index);
          if (!prevCt) continue;
          compareNodes(
            prevCt.nodes,
            currCt.nodes,
            `${path20}.${id}.iterations[${currIter.index}].corrective_tasks[${currCt.index}].nodes`,
            errors
          );
        }
      }
    }
    if (currNode.kind === "parallel" && prevNode.kind === "parallel") {
      compareNodes(prevNode.nodes, currNode.nodes, `${path20}.${id}.nodes`, errors);
    }
  }
}
var validNodeStatuses, validGraphStatuses;
var init_validator = __esm({
  "cli/src/lib/pipeline-engine/validator.ts"() {
    "use strict";
    init_constants();
    init_schema_validator();
    validNodeStatuses = new Set(Object.values(NODE_STATUSES));
    validGraphStatuses = new Set(Object.values(GRAPH_STATUSES));
  }
});

// cli/src/lib/pipeline-engine/engine.ts
import * as os6 from "node:os";
import * as path17 from "node:path";
function scaffoldState(template, projectName, config) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const nodes = {};
  for (const node of template.nodes) {
    nodes[node.id] = scaffoldNodeState(node);
  }
  return {
    $schema: "orchestration-state-v5",
    project: {
      name: projectName,
      created: now,
      updated: now
    },
    config: {
      gate_mode: config.human_gates.execution_mode,
      limits: {
        max_phases: config.limits.max_phases,
        max_tasks_per_phase: config.limits.max_tasks_per_phase,
        max_retries_per_task: config.limits.max_retries_per_task,
        max_consecutive_review_rejections: config.limits.max_consecutive_review_rejections
      },
      source_control: {
        auto_commit: config.source_control.auto_commit,
        auto_pr: config.source_control.auto_pr
      }
    },
    pipeline: {
      gate_mode: null,
      source_control: null,
      current_tier: "planning",
      halt_reason: null
    },
    graph: {
      template_id: template.template.id,
      status: "in_progress",
      current_node_path: null,
      nodes
    }
  };
}
function normalizeDocPath(docPath, basePath, projectName) {
  if (!docPath) return docPath;
  const normalized = docPath.replace(/\\/g, "/");
  const normalizedBase = basePath.replace(/\\/g, "/");
  const prefix = normalizedBase + "/" + projectName + "/";
  if (normalized.toLowerCase().startsWith(prefix.toLowerCase())) return normalized.slice(prefix.length);
  return normalized;
}
function resolveGateApproved(context) {
  const gateType = context.gate_type;
  if (gateType === "task") return "task_gate_approved";
  if (gateType === "phase") return "phase_gate_approved";
  throw new Error(gateType ? `Unknown gate type '${gateType}': expected task or phase` : "gate_approved requires --gate-type task|phase");
}
function processEvent(event, projectDir, context, io, pathContext, configPath) {
  const { templatesDir } = pathContext;
  try {
    const config = io.readConfig(configPath);
    const state = io.readState(projectDir);
    const resolution = resolveTemplateName(state, context.template, config, projectDir, templatesDir);
    const effectiveLoadPath = state !== null ? resolution.templatePath : path17.join(templatesDir, resolution.templateName + ".yml");
    const loadedTemplate = loadTemplate(effectiveLoadPath);
    const { template, eventIndex } = loadedTemplate;
    const wrappedReadDocument = (docPath) => {
      if (path17.isAbsolute(docPath)) {
        return io.readDocument(docPath);
      }
      const resolvedProjectDir = path17.resolve(projectDir);
      const resolved = path17.resolve(resolvedProjectDir, docPath);
      const relativeToProject = path17.relative(resolvedProjectDir, resolved);
      if (relativeToProject === ".." || relativeToProject.startsWith(`..${path17.sep}`) || path17.isAbsolute(relativeToProject)) {
        throw new Error(`Document path escapes project directory: ${docPath}`);
      }
      return io.readDocument(resolved);
    };
    if (event === "start") {
      if (state === null) {
        const projectName = path17.basename(projectDir);
        io.ensureDirectories(projectDir);
        try {
          snapshotTemplate(
            path17.join(templatesDir, resolution.templateName + ".yml"),
            projectDir
          );
        } catch (err) {
          console.error("[engine] snapshotTemplate failed; project will use global template on future events:", err);
        }
        const scaffolded = scaffoldState(template, projectName, config);
        scaffolded.project.updated = (/* @__PURE__ */ new Date()).toISOString();
        const nextAction2 = walkDAG(scaffolded, template, config, wrappedReadDocument);
        const postWalkErrors = validateState(null, scaffolded, config, template);
        if (postWalkErrors.length > 0) {
          return {
            action: null,
            context: { error: postWalkErrors[0] },
            error: {
              message: postWalkErrors[0],
              event
            }
          };
        }
        io.writeState(projectDir, scaffolded);
        const enrichedContext = nextAction2 ? enrichActionContext({
          action: nextAction2.action,
          walkerContext: nextAction2.context,
          state: scaffolded,
          config,
          cliContext: context
        }) : {};
        return {
          action: nextAction2?.action ?? null,
          context: enrichedContext
        };
      } else {
        const walkerResult = walkDAG(state, template, config, wrappedReadDocument);
        state.project.updated = (/* @__PURE__ */ new Date()).toISOString();
        const validationErrors2 = validateState(null, state, config, template);
        if (validationErrors2.length > 0) {
          return {
            action: null,
            context: { error: validationErrors2[0] },
            error: { message: validationErrors2[0], event }
          };
        }
        io.writeState(projectDir, state);
        const enrichedContext = walkerResult ? enrichActionContext({
          action: walkerResult.action,
          walkerContext: walkerResult.context,
          state,
          config,
          cliContext: context
        }) : {};
        return {
          action: walkerResult?.action ?? null,
          context: enrichedContext
        };
      }
    }
    if (state === null) {
      return {
        action: null,
        context: { error: "No state.json found; use --event start" },
        error: {
          message: "No state.json found; use --event start",
          event
        }
      };
    }
    if (OUT_OF_BAND_EVENTS.has(event)) {
      const mutation2 = getMutation(event);
      if (!mutation2) {
        return {
          action: null,
          context: { error: `No mutation registered for event: ${event}` },
          error: { message: `No mutation registered for event: ${event}`, event }
        };
      }
      const normalizedContext2 = { ...context };
      if (normalizedContext2.doc_path) {
        normalizedContext2.doc_path = normalizeDocPath(
          normalizedContext2.doc_path,
          PROJECTS_BASE_PATH,
          path17.basename(projectDir)
        );
      }
      const mutationResult2 = mutation2(state, normalizedContext2, config, template);
      const mutatedState2 = mutationResult2.state;
      const validationErrors2 = validateState(state, mutatedState2, config, template);
      if (validationErrors2.length > 0) {
        return {
          action: null,
          context: { error: validationErrors2[0] },
          error: { message: validationErrors2[0], event }
        };
      }
      mutatedState2.project.updated = (/* @__PURE__ */ new Date()).toISOString();
      const walkerResult = walkDAG(mutatedState2, template, config, wrappedReadDocument);
      const postWalkErrors = validateState(state, mutatedState2, config, template);
      if (postWalkErrors.length > 0) {
        return {
          action: null,
          context: { error: postWalkErrors[0] },
          error: { message: postWalkErrors[0], event }
        };
      }
      io.writeState(projectDir, mutatedState2);
      const enrichedContext = walkerResult ? enrichActionContext({
        action: walkerResult.action,
        walkerContext: walkerResult.context,
        state: mutatedState2,
        config,
        cliContext: context
      }) : {};
      return {
        action: walkerResult?.action ?? null,
        context: enrichedContext
      };
    }
    if (event === "gate_approved") {
      try {
        event = resolveGateApproved(context);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
          action: null,
          context: { error: message },
          error: {
            message,
            event
          }
        };
      }
    }
    const entry = eventIndex.get(event);
    if (!entry) {
      return {
        action: null,
        context: { error: `Unknown event: ${event}` },
        error: {
          message: `Unknown event: ${event}`,
          event
        }
      };
    }
    const preReadResult = preRead(event, context, io.readDocument, projectDir, state, entry);
    if (preReadResult.error) {
      return {
        action: null,
        context: { error: preReadResult.error.message },
        error: preReadResult.error
      };
    }
    const mutation = getMutation(event);
    if (!mutation) {
      return {
        action: null,
        context: { error: `No mutation registered for event: ${event}` },
        error: {
          message: `No mutation registered for event: ${event}`,
          event
        }
      };
    }
    const normalizedContext = { ...preReadResult.context };
    if (normalizedContext.doc_path) {
      normalizedContext.doc_path = normalizeDocPath(
        normalizedContext.doc_path,
        PROJECTS_BASE_PATH,
        path17.basename(projectDir)
      );
    }
    const mutationResult = mutation(state, normalizedContext, config, template);
    const mutatedState = mutationResult.state;
    const validationErrors = validateState(state, mutatedState, config, template);
    if (validationErrors.length > 0) {
      return {
        action: null,
        context: { error: validationErrors[0] },
        error: {
          message: validationErrors[0],
          event
        }
      };
    }
    mutatedState.project.updated = (/* @__PURE__ */ new Date()).toISOString();
    mutatedState.graph.current_node_path = resolveNodeStatePath(entry.templatePath, context);
    let nextAction;
    if (entry.eventPhase === "started") {
      const stepNode = entry.nodeDef;
      const rawContext = stepNode.context ?? {};
      const enrichedCtx = enrichActionContext({
        action: stepNode.action,
        walkerContext: rawContext,
        state: mutatedState,
        config,
        cliContext: context
      });
      nextAction = { action: stepNode.action, context: enrichedCtx };
      io.writeState(projectDir, mutatedState);
    } else {
      const walkerResult = walkDAG(mutatedState, template, config, wrappedReadDocument);
      const postWalkErrors = validateState(state, mutatedState, config, template);
      if (postWalkErrors.length > 0) {
        return {
          action: null,
          context: { error: postWalkErrors[0] },
          error: {
            message: postWalkErrors[0],
            event
          }
        };
      }
      io.writeState(projectDir, mutatedState);
      if (walkerResult) {
        nextAction = {
          action: walkerResult.action,
          context: enrichActionContext({
            action: walkerResult.action,
            walkerContext: walkerResult.context,
            state: mutatedState,
            config,
            cliContext: context
          })
        };
      } else {
        nextAction = walkerResult;
      }
    }
    return {
      action: nextAction?.action ?? null,
      context: nextAction?.context ?? {}
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      action: null,
      context: { error: message },
      error: {
        message,
        event
      }
    };
  }
}
var PROJECTS_BASE_PATH;
var init_engine = __esm({
  "cli/src/lib/pipeline-engine/engine.ts"() {
    "use strict";
    init_template_loader();
    init_template_resolver();
    init_pre_reads();
    init_mutations();
    init_dag_walker();
    init_context_enrichment();
    init_constants();
    init_scaffold();
    init_validator();
    PROJECTS_BASE_PATH = path17.join(os6.homedir(), ".radorch", "projects");
  }
});

// cli/src/lib/pipeline-engine/state-io.ts
import * as fs12 from "node:fs";
import * as path18 from "node:path";
function deepMerge2(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const srcVal = source[key];
    const tgtVal = result[key];
    if (srcVal !== null && srcVal !== void 0 && typeof srcVal === "object" && !Array.isArray(srcVal) && tgtVal !== null && tgtVal !== void 0 && typeof tgtVal === "object" && !Array.isArray(tgtVal)) {
      result[key] = deepMerge2(
        tgtVal,
        srcVal
      );
    } else if (srcVal !== void 0) {
      result[key] = srcVal;
    }
  }
  return result;
}
function isEnoent2(err) {
  return err !== null && typeof err === "object" && err.code === "ENOENT";
}
function readState3(projectDir) {
  const statePath = path18.join(projectDir, "state.json");
  try {
    const raw = fs12.readFileSync(statePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (isEnoent2(err)) return null;
    throw err;
  }
}
function writeState2(projectDir, state) {
  fs12.mkdirSync(projectDir, { recursive: true });
  const statePath = path18.join(projectDir, "state.json");
  const tmpPath = path18.join(projectDir, "state.json.tmp");
  try {
    fs12.writeFileSync(tmpPath, JSON.stringify(state, null, 2), "utf-8");
    fs12.renameSync(tmpPath, statePath);
  } catch (err) {
    fs12.rmSync(tmpPath, { force: true });
    throw err;
  }
}
function stripRetiredKeys(merged) {
  delete merged.system;
  delete merged.projects;
  const sc = merged.source_control;
  if (sc !== null && typeof sc === "object" && !Array.isArray(sc)) {
    delete sc.provider;
  }
  return merged;
}
function readConfig(configPath) {
  const base = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  if (!configPath) {
    return base;
  }
  try {
    const raw = fs12.readFileSync(configPath, "utf-8");
    const parsed = jsYaml.load(raw);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      return base;
    }
    const merged = deepMerge2(base, parsed);
    return stripRetiredKeys(merged);
  } catch (err) {
    if (isEnoent2(err)) return base;
    throw err;
  }
}
function readDocument3(docPath) {
  let raw;
  try {
    raw = fs12.readFileSync(docPath, "utf-8");
  } catch (err) {
    if (isEnoent2(err)) return null;
    throw err;
  }
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, content: raw };
  }
  const frontmatterText = match[1] ?? "";
  const content = match[2] ?? "";
  const parsed = jsYaml.load(frontmatterText);
  const frontmatter = parsed !== null && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  return {
    frontmatter,
    content
  };
}
function ensureDirectories(projectDir) {
  fs12.mkdirSync(projectDir, { recursive: true });
  for (const subdir of ["phases", "tasks", "reports", "reviews"]) {
    fs12.mkdirSync(path18.join(projectDir, subdir), { recursive: true });
  }
}
var DEFAULT_CONFIG;
var init_state_io = __esm({
  "cli/src/lib/pipeline-engine/state-io.ts"() {
    "use strict";
    init_js_yaml();
    DEFAULT_CONFIG = {
      default_template: "extra-high",
      limits: {
        max_phases: 10,
        max_tasks_per_phase: 8,
        max_retries_per_task: 5,
        max_consecutive_review_rejections: 3
      },
      human_gates: {
        after_planning: true,
        execution_mode: "ask",
        after_final_review: true
      },
      source_control: {
        auto_commit: "ask",
        auto_pr: "ask"
      }
    };
  }
});

// cli/src/lib/pipeline-engine/path-context.ts
import os7 from "node:os";
import path19 from "node:path";
import { fileURLToPath } from "node:url";
function resolvePathContext() {
  const scriptsDir = path19.dirname(fileURLToPath(import.meta.url));
  const templatesDir = process.env["RADORCH_TEMPLATES_DIR"] ?? path19.join(os7.homedir(), ".radorch", "templates");
  return { scriptsDir, templatesDir };
}
function resolveDiscoveredConfigPath() {
  return path19.join(os7.homedir(), ".radorch", "orchestration.yml");
}
var init_path_context = __esm({
  "cli/src/lib/pipeline-engine/path-context.ts"() {
    "use strict";
  }
});

// cli/src/commands/gate/shared.ts
function makeIO() {
  return { readState: readState3, writeState: writeState2, readConfig, readDocument: readDocument3, ensureDirectories };
}
function autoResolveMasterPlanDocPath(state) {
  const s = state;
  return s?.graph?.nodes?.["master_plan"]?.doc_path;
}
function autoResolveFinalReviewDocPath(state) {
  const s = state;
  return s?.graph?.nodes?.["final_review"]?.doc_path;
}
var init_shared = __esm({
  "cli/src/commands/gate/shared.ts"() {
    "use strict";
    init_engine();
    init_state_io();
    init_path_context();
  }
});

// cli/src/commands/gate/approve-plan.ts
var approve_plan_exports = {};
__export(approve_plan_exports, {
  approvePlanCommand: () => approvePlanCommand,
  runApprovePlan: () => runApprovePlan
});
async function runApprovePlan(opts) {
  const dir = opts.projectDir;
  if (!dir) throw new UserError("--project-dir is required");
  const state = readState3(dir);
  if (!state) throw new UserError(`No state.json at ${dir}`);
  const docPath = autoResolveMasterPlanDocPath(state);
  const ctx = docPath ? { doc_path: docPath } : {};
  const result = processEvent("plan_approved", dir, ctx, makeIO(), resolvePathContext());
  return result;
}
var approvePlanCommand;
var init_approve_plan = __esm({
  "cli/src/commands/gate/approve-plan.ts"() {
    "use strict";
    init_command();
    init_errors2();
    init_shared();
    init_state_io();
    approvePlanCommand = defineCommand({
      name: "approve-plan",
      description: "Approve the project Master Plan",
      args: {},
      flags: { "project-dir": { description: "absolute path to the project directory", type: "string" } },
      handler: async ({ flags }) => {
        const dir = flags["project-dir"];
        if (!dir) throw new UserError("--project-dir is required");
        const result = await runApprovePlan({ projectDir: dir });
        return result;
      },
      mapResult: (r) => r.error ? { ok: false, error: { type: "user_error", message: r.error.message } } : { ok: true, data: r, exit_code: 0 }
    });
  }
});

// cli/src/commands/gate/approve-final.ts
var approve_final_exports = {};
__export(approve_final_exports, {
  approveFinalCommand: () => approveFinalCommand,
  runApproveFinal: () => runApproveFinal
});
async function runApproveFinal(opts) {
  const dir = opts.projectDir;
  if (!dir) throw new UserError("--project-dir is required");
  const state = readState3(dir);
  if (!state) throw new UserError(`No state.json at ${dir}`);
  const docPath = autoResolveFinalReviewDocPath(state);
  const ctx = docPath ? { doc_path: docPath } : {};
  const result = processEvent("final_approved", dir, ctx, makeIO(), resolvePathContext());
  return result;
}
var approveFinalCommand;
var init_approve_final = __esm({
  "cli/src/commands/gate/approve-final.ts"() {
    "use strict";
    init_command();
    init_errors2();
    init_shared();
    init_state_io();
    approveFinalCommand = defineCommand({
      name: "approve-final",
      description: "Approve the project Final Review",
      args: {},
      flags: { "project-dir": { description: "absolute path to the project directory", type: "string" } },
      handler: async ({ flags }) => {
        const dir = flags["project-dir"];
        if (!dir) throw new UserError("--project-dir is required");
        const result = await runApproveFinal({ projectDir: dir });
        return result;
      },
      mapResult: (r) => r.error ? { ok: false, error: { type: "user_error", message: r.error.message } } : { ok: true, data: r, exit_code: 0 }
    });
  }
});

// cli/src/cli.ts
init_esm();
init_command();

// cli/src/commands/doctor/index.ts
init_command();
init_paths();
import { spawnSync as spawnSync2 } from "node:child_process";

// cli/src/framework/banner.ts
init_theme2();
function renderBanner(opts) {
  if (!opts.isTTY || opts.nonInteractive || opts.json || opts.noColor) return;
  const theme = makeTheme2({ noColor: opts.noColor });
  opts.stream.write("\n" + theme.banner("RadOrch") + "\n\n");
}

// cli/src/commands/doctor/index.ts
init_package_version();

// cli/src/commands/doctor/checks.ts
init_fs_helpers();
init_paths();
init_config();
init_install_json();
import fsP from "node:fs/promises";
import path6 from "node:path";
import { spawnSync } from "node:child_process";

// cli/src/lib/yaml.ts
init_js_yaml();
function parseYaml(text) {
  const result = load2(text);
  return result;
}
function stringifyYaml(value) {
  return dump(value, { indent: 2, lineWidth: 100, noRefs: true });
}

// cli/src/lib/cross-harness-scan.ts
init_install_json();
import fs4 from "node:fs";
import os3 from "node:os";
import path5 from "node:path";
function scanUserLevelHarnesses() {
  const home = os3.homedir();
  const installJson = path5.join(home, ".radorch", "install.json");
  const reports = [];
  let registry;
  if (fs4.existsSync(installJson)) {
    try {
      const parsed = JSON.parse(fs4.readFileSync(installJson, "utf8"));
      if (typeof parsed.harnesses === "object" && parsed.harnesses !== null) {
        registry = { harnesses: parsed.harnesses };
      } else {
        registry = { harnesses: {} };
      }
    } catch {
      registry = void 0;
    }
  }
  for (const key of INSTALL_KEYS) {
    const entry = registry?.harnesses[key];
    if (!entry) {
      reports.push({ installKey: key, installed: false });
      continue;
    }
    reports.push({
      installKey: key,
      installed: true,
      packageVersion: entry.version,
      channel: entry.channel
    });
  }
  return reports;
}

// cli/src/commands/doctor/checks.ts
init_package_version();
var pkg2 = { version: getCliVersion() };
var RETIRED_KEYS = ["system.orch_root", "projects.base_path", "projects.naming", "source_control.provider"];
async function runEnvironmentChecks() {
  const out = [];
  const major = Number(process.versions.node.split(".")[0]);
  out.push({
    category: "Environment",
    name: "node-version",
    status: major >= 20 ? "pass" : "fail",
    detail: `node ${process.versions.node}`
  });
  out.push({
    category: "Environment",
    name: "platform",
    status: "pass",
    detail: `${process.platform}/${process.arch}`
  });
  return out;
}
async function runInstallChecks() {
  const p = userDataPaths();
  const out = [];
  const rootExists = await pathExists(p.root);
  out.push({
    category: "Install",
    name: "radorch-home-exists",
    status: rootExists ? "pass" : "fail",
    detail: rootExists ? p.root : `missing ${p.root} \u2014 run \`radorch install\``
  });
  if (!rootExists) return out;
  try {
    const ij = await readInstallJson(p.installJson);
    const version = Object.values(ij.harnesses)[0]?.version;
    out.push({
      category: "Install",
      name: "install-json-shape",
      status: typeof version === "string" ? "pass" : "fail"
    });
  } catch (e) {
    out.push({ category: "Install", name: "install-json-shape", status: "fail", detail: e.message });
  }
  {
    const templatesDir = p.templates;
    const required = ["extra-high.yml", "high.yml", "medium.yml", "low.yml"];
    let allPresent = true;
    const missing = [];
    for (const file of required) {
      if (!await pathExists(path6.join(templatesDir, file))) {
        allPresent = false;
        missing.push(file);
      }
    }
    out.push({
      category: "Install",
      name: "templates-folder-populated",
      status: allPresent ? "pass" : "warn",
      detail: allPresent ? void 0 : `missing templates: ${missing.join(", ")}`
    });
  }
  {
    const orchYml = p.orchestrationYml;
    const found = [];
    try {
      const text = await fsP.readFile(orchYml, "utf8");
      const parsed = parseYaml(text);
      if (parsed && typeof parsed === "object") {
        for (const key of RETIRED_KEYS) {
          const parts = key.split(".");
          const top = parts[0];
          const sub = parts[1];
          if (!top) continue;
          const topVal = parsed[top];
          if (sub) {
            if (topVal !== null && typeof topVal === "object" && sub in topVal) {
              found.push(key);
            }
          } else {
            if (top in parsed) found.push(key);
          }
        }
      }
    } catch {
    }
    if (found.length > 0) {
      out.push({
        category: "Install",
        name: "retired-properties-present",
        status: "warn",
        detail: `stale keys in orchestration.yml (safe to delete): ${found.join(", ")}`
      });
    } else {
      out.push({
        category: "Install",
        name: "retired-properties-present",
        status: "pass"
      });
    }
  }
  {
    let versionStatus = "pass";
    let versionDetail;
    try {
      const ij = await readInstallJson(p.installJson);
      const installedVersion = Object.values(ij.harnesses)[0]?.version;
      if (typeof installedVersion !== "string") {
        versionStatus = "warn";
        versionDetail = "install.json missing version";
      } else {
        const cliVersion = pkg2.version;
        if (cliVersion) {
          const match = cmpSemver(cliVersion, installedVersion) === 0;
          versionStatus = match ? "pass" : "warn";
          versionDetail = match ? `${cliVersion}` : `CLI is ${cliVersion}, install.json reports ${installedVersion} \u2014 re-run \`radorch install\``;
        }
      }
    } catch {
      versionStatus = "warn";
      versionDetail = "install.json unreadable \u2014 run `radorch install`";
    }
    out.push({ category: "Install", name: "version-match", status: versionStatus, detail: versionDetail });
  }
  return out;
}
async function runPluginChecks(opts) {
  const out = [];
  const p = installPaths(opts.root);
  const registeredReports = scanUserLevelHarnesses();
  const claudePluginRegistered = registeredReports.some(
    (r) => r.installKey === "claude-plugin" && r.installed
  );
  const runPluginSpecificChecks = opts.pluginRoot !== void 0 || claudePluginRegistered;
  if (runPluginSpecificChecks) {
    if (opts.pluginRoot) {
      const bundle = path6.join(
        opts.pluginRoot,
        "skills",
        "rad-orchestration",
        "scripts",
        "radorch.mjs"
      );
      const exists = await pathExists(bundle);
      out.push({
        category: "Plugin",
        name: "bundle-integrity",
        status: exists ? "pass" : "fail",
        detail: exists ? bundle : `missing ${bundle} \u2014 run \`npm run build:plugin\``
      });
    } else {
      out.push({
        category: "Plugin",
        name: "bundle-integrity",
        status: "warn",
        detail: "CLAUDE_PLUGIN_ROOT not set \u2014 bundle presence not verified"
      });
    }
  }
  const pidExists = await pathExists(p.uiPidFile);
  let pidStatus = "pass";
  let pidDetail;
  if (pidExists) {
    try {
      const fsModule = await import("node:fs/promises");
      const entry = JSON.parse(await fsModule.readFile(p.uiPidFile, "utf8"));
      try {
        process.kill(entry.pid, 0);
      } catch {
        pidStatus = "warn";
        pidDetail = `stale PID ${entry.pid} in ${p.uiPidFile} \u2014 process is dead`;
      }
    } catch {
      pidStatus = "warn";
      pidDetail = "pid file present but unparseable";
    }
  }
  out.push({ category: "Plugin", name: "ui-pid-consistency", status: pidStatus, detail: pidDetail });
  let skewStatus = "pass";
  let skewDetail;
  if (await pathExists(p.installJson)) {
    const ij = await readInstallJson(p.installJson);
    const lastWriter = readLastWriterVersion(ij);
    if (!lastWriter) {
      skewStatus = "pass";
      skewDetail = "install.json has no last_writer_version (iter-01 install \u2014 skipping skew check)";
    } else if (cmpSemver(opts.localVersion, lastWriter) < 0) {
      skewStatus = "fail";
      skewDetail = `state last written by ${lastWriter}; this CLI is ${opts.localVersion}`;
    }
  }
  out.push({ category: "Plugin", name: "version-skew", status: skewStatus, detail: skewDetail });
  {
    const projectsDir = path6.join(opts.root, "projects");
    let detail;
    let status = "pass";
    try {
      await fsP.access(projectsDir, fsP.constants.R_OK);
      detail = projectsDir;
    } catch {
      status = "fail";
      detail = `${projectsDir} is missing or unreadable`;
    }
    out.push({ category: "Plugin", name: "projects-base-path-readable", status, detail });
  }
  if (runPluginSpecificChecks) {
    if (opts.pluginRoot) {
      const skillsDir = path6.join(opts.pluginRoot, "skills");
      if (!await pathExists(skillsDir)) {
        out.push({
          category: "Plugin",
          name: "plugin-skills-enumerable",
          status: "warn",
          detail: "skills/ directory missing under CLAUDE_PLUGIN_ROOT"
        });
      } else {
        const missing = [];
        for (const name of await fsP.readdir(skillsDir)) {
          const f = path6.join(skillsDir, name, "SKILL.md");
          if (!await pathExists(f)) missing.push(name);
        }
        out.push({
          category: "Plugin",
          name: "plugin-skills-enumerable",
          status: missing.length === 0 ? "pass" : "fail",
          detail: missing.length === 0 ? void 0 : `skills missing SKILL.md: ${missing.join(", ")}`
        });
      }
    } else {
      out.push({
        category: "Plugin",
        name: "plugin-skills-enumerable",
        status: "warn",
        detail: "CLAUDE_PLUGIN_ROOT not set \u2014 skills not verifiable outside a plugin session"
      });
    }
  }
  if (runPluginSpecificChecks) {
    if (opts.pluginRoot) {
      const agentsDir = path6.join(opts.pluginRoot, "agents");
      const missing = [];
      if (!await pathExists(agentsDir)) {
        missing.push("agents/ directory");
      } else {
        const entries = (await fsP.readdir(agentsDir)).filter((f) => f.endsWith(".md"));
        if (entries.length === 0) {
          missing.push("no .md agent files under agents/");
        } else {
          for (const f of entries) {
            try {
              await fsP.access(path6.join(agentsDir, f), fsP.constants.R_OK);
            } catch {
              missing.push(f);
            }
          }
        }
      }
      out.push({
        category: "Plugin",
        name: "plugin-agents-resolvable",
        status: missing.length === 0 ? "pass" : "fail",
        detail: missing.length === 0 ? void 0 : `missing or unreadable: ${missing.join(", ")}`
      });
    } else {
      out.push({
        category: "Plugin",
        name: "plugin-agents-resolvable",
        status: "warn",
        detail: "CLAUDE_PLUGIN_ROOT not set \u2014 agents not verifiable outside a plugin session"
      });
    }
  }
  {
    let crossStatus = "warn";
    let crossDetail = "iter-01 install not detected; nothing to compare";
    if (opts.iter01Version) {
      if (opts.iter01Version === opts.localVersion) {
        crossStatus = "pass";
        crossDetail = `iter-01 install at ${opts.iter01Version} matches plugin CLI`;
      } else {
        crossStatus = "warn";
        crossDetail = `iter-01 install reports ${opts.iter01Version}; plugin CLI is ${opts.localVersion}`;
      }
    }
    out.push({
      category: "Plugin",
      name: "cross-install-version-skew",
      status: crossStatus,
      detail: crossDetail
    });
  }
  {
    const reports = registeredReports;
    const lines = reports.map((r) => {
      if (!r.installed) return `${r.installKey}: not installed`;
      const channel = r.channel ? ` (${r.channel})` : "";
      const ver = r.packageVersion ?? "unknown";
      return `${r.installKey}: ${ver}${channel}`;
    });
    const hasClaude = reports.some((r) => r.installed && r.installKey === "claude");
    const hasClaudePlugin = reports.some((r) => r.installed && r.installKey === "claude-plugin");
    if (hasClaude && hasClaudePlugin) {
      lines.push("");
      lines.push("Both `claude` and `claude-plugin` are registered \u2014 they share ~/.claude/.");
      lines.push("The plugin is the recommended channel. To remove the legacy install,");
      lines.push("run `npx rad-orchestration uninstall`.");
    }
    out.push({
      category: "Plugin",
      name: "multi-harness-install-table",
      status: "pass",
      detail: lines.join("\n")
    });
  }
  return out;
}
function defaultToolingExec(file, args) {
  const r = spawnSync(file, args, { encoding: "utf8", timeout: 1e3, shell: false });
  return {
    status: r.status ?? 1,
    stdout: r.stdout ?? "",
    stderr: r.stderr ?? "",
    error: r.error
  };
}
function agentsToCheck(reports) {
  const installed = new Set(reports.filter((r) => r.installed).map((r) => r.installKey));
  const out = [];
  if (installed.has("claude") || installed.has("claude-plugin")) {
    out.push({ name: "claude", bin: "claude", install: "install Claude Code (https://docs.anthropic.com/claude/claude-code)" });
  }
  if (installed.has("copilot-cli")) {
    out.push({ name: "copilot", bin: "copilot", install: "install GitHub Copilot CLI (https://github.com/github/copilot-cli)" });
  }
  if (installed.has("copilot-vscode")) {
    out.push({ name: "code", bin: "code", install: "install VS Code's `code` shim via the command palette: `Shell Command: Install 'code' command in PATH`" });
  }
  return out;
}
async function runToolingChecks(opts = {}) {
  const exec2 = opts.exec ?? defaultToolingExec;
  const reports = opts.harnessReports ?? scanUserLevelHarnesses();
  const out = [];
  const gitResult = exec2("git", ["--version"]);
  const gitMissing = gitResult.error?.code === "ENOENT" || gitResult.status !== 0;
  if (gitMissing) {
    out.push({ category: "Tooling", name: "git", status: "fail", detail: "git not on PATH \u2014 install git and re-run doctor" });
  } else {
    const m = gitResult.stdout.match(/git version (\S+)/);
    out.push({ category: "Tooling", name: "git", status: "pass", detail: m ? `git ${m[1]}` : "git present" });
  }
  const ghBinary = exec2("gh", ["--version"]);
  const ghMissing = ghBinary.error?.code === "ENOENT" || ghBinary.status !== 0;
  if (ghMissing) {
    out.push({ category: "Tooling", name: "gh", status: "fail", detail: "gh not on PATH \u2014 install GitHub CLI and run `gh auth login`" });
  } else {
    const ghAuth = exec2("gh", ["auth", "status"]);
    if (ghAuth.status === 0) {
      out.push({ category: "Tooling", name: "gh", status: "pass", detail: "gh authenticated" });
    } else {
      out.push({
        category: "Tooling",
        name: "gh",
        status: "fail",
        detail: ghAuth.stderr.trim() || "gh present but not logged in \u2014 run `gh auth login`"
      });
    }
  }
  for (const spec of agentsToCheck(reports)) {
    const r = exec2(spec.bin, ["--version"]);
    const missing = r.error?.code === "ENOENT" || r.status !== 0;
    if (missing) {
      out.push({ category: "Tooling", name: spec.name, status: "fail", detail: `${spec.bin} not on PATH \u2014 ${spec.install}` });
    } else {
      const v = r.stdout.trim().split("\n")[0] ?? "";
      out.push({ category: "Tooling", name: spec.name, status: "pass", detail: v || `${spec.bin} present` });
    }
  }
  return out;
}

// cli/src/commands/doctor/index.ts
var pkg3 = { version: getCliVersion() };
function detectIter01Version(env2) {
  const candidates = process.platform === "win32" ? ["rad-orchestration.cmd", "rad-orchestration"] : ["rad-orchestration"];
  for (const cmd of candidates) {
    try {
      const r = spawnSync2(cmd, ["--version"], {
        encoding: "utf8",
        timeout: 1e3,
        shell: false,
        env: env2
      });
      if (r.status === 0 && r.stdout) {
        const m = r.stdout.trim().match(/^\d+\.\d+\.\d+(-[\w.]+)?$/m);
        if (m) return m[0];
      }
    } catch {
    }
  }
  return void 0;
}
async function runDoctor(opts) {
  const root = resolveInstallRoot();
  const iter01Version = detectIter01Version(opts.env);
  const checks = [
    ...await runEnvironmentChecks(),
    ...await runInstallChecks(),
    ...await runPluginChecks({
      root,
      localVersion: pkg3.version,
      pluginRoot: opts.env["CLAUDE_PLUGIN_ROOT"],
      iter01Version
    }),
    ...await runToolingChecks()
  ];
  const all_passed = !checks.some((c) => c.status === "fail");
  return { all_passed, checks };
}
function renderInteractive(result, ctx) {
  if (!ctx.ux.isTTY || ctx.ux.nonInteractive || ctx.ux.json) return;
  const lookup = { pass: ctx.theme.success("PASS"), warn: ctx.theme.warning("WARN"), fail: ctx.theme.error("FAIL") };
  const seen = /* @__PURE__ */ new Set();
  for (const c of result.checks) {
    if (!seen.has(c.category)) {
      ctx.stderr.write(`
${ctx.theme.heading(c.category)}
`);
      seen.add(c.category);
    }
    ctx.stderr.write(`  [${lookup[c.status]}] ${c.name}${c.detail ? " \u2014 " + c.detail : ""}
`);
  }
  ctx.stderr.write(`
Summary: ${result.all_passed ? ctx.theme.success("all passed") : ctx.theme.error("failures present")}
`);
}
var doctorCommand = defineCommand({
  name: "doctor",
  description: "Run health checks across environment, install integrity, and registry shape",
  args: {},
  flags: {},
  handler: async ({ ctx }) => {
    renderBanner({ stream: ctx.stderr, isTTY: ctx.ux.isTTY, nonInteractive: ctx.ux.nonInteractive, noColor: ctx.ux.noColor, json: ctx.ux.json });
    const result = await runDoctor({ env: ctx.env });
    renderInteractive(result, ctx);
    return result;
  },
  // Doctor's exit code is computed from check results, not error type.
  // exits 0 on no failures (warns allowed), 1 on any failure, 2 for unexpected internal errors (framework catch branch).
  mapResult: (r) => ({
    ok: true,
    data: r,
    exit_code: r.all_passed ? 0 : 1
  })
});

// cli/src/commands/ui/index.ts
init_command();

// cli/src/commands/ui/start.ts
init_paths();
init_fs_helpers();
import path8 from "node:path";

// cli/src/commands/ui/pid-file.ts
init_fs_helpers();
import fs5 from "node:fs/promises";
async function writePidFile(file, entry) {
  await writeFileAtomic(file, JSON.stringify(entry, null, 2) + "\n");
}
async function readPidFile(file) {
  if (!await pathExists(file)) return null;
  const text = await fs5.readFile(file, "utf8");
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
async function removePidFile(file) {
  if (await pathExists(file)) await fs5.rm(file);
}
function isPidAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

// cli/src/commands/ui/spawn.ts
import { createServer } from "node:net";
import { spawn as nodeSpawn } from "node:child_process";
import fs6 from "node:fs";
import path7 from "node:path";
async function probePortFree(port) {
  return new Promise((resolve3) => {
    const srv = createServer();
    srv.once("error", () => resolve3(false));
    srv.once("listening", () => srv.close(() => resolve3(true)));
    srv.listen(port, "127.0.0.1");
  });
}
function openLogFd(file) {
  fs6.mkdirSync(path7.dirname(file), { recursive: true });
  return fs6.openSync(file, "a");
}
var spawn = nodeSpawn;

// cli/src/commands/ui/start.ts
init_errors2();
var PORT_LO = 3e3;
var PORT_HI = 3010;
async function runStart(opts) {
  const root = resolveInstallRoot();
  const p = installPaths(root);
  await ensureDir(p.runtimeDir);
  await ensureDir(p.logsDir);
  const existing = await readPidFile(p.uiPidFile);
  if (existing) {
    if (isPidAlive(existing.pid)) {
      return {
        pid: existing.pid,
        port: existing.port,
        url: `http://localhost:${existing.port}`,
        started_at: existing.started_at
      };
    }
    await removePidFile(p.uiPidFile);
  }
  const probe = opts._probePortFree ?? probePortFree;
  let chosenPort = null;
  const tried = [];
  for (let port = PORT_LO; port <= PORT_HI; port++) {
    tried.push(port);
    if (await probe(port)) {
      chosenPort = port;
      break;
    }
  }
  if (chosenPort === null) {
    throw new UserError(
      `every port ${PORT_LO}-${PORT_HI} is taken (tried ${tried.join(", ")}); free one and retry`
    );
  }
  const uiDir = opts.env["RADORCH_UI_DIR"] ?? path8.join(resolveInstallRoot(), "ui");
  const serverJs = path8.join(uiDir, "server.js");
  const spawnFn = opts._spawn ?? spawn;
  const env2 = {
    ...opts.env,
    WORKSPACE_ROOT: root,
    ORCH_ROOT: ".",
    PORT: String(chosenPort),
    HOSTNAME: "127.0.0.1",
    RADORCH_CLI_PATH: process.argv[1] ?? ""
  };
  const logFd = opts._spawn ? -1 : openLogFd(p.uiLog);
  const child = spawnFn("node", [serverJs], {
    detached: true,
    windowsHide: true,
    stdio: opts._spawn ? "ignore" : ["ignore", logFd, logFd],
    env: env2,
    cwd: uiDir
  });
  if (!child.pid) throw new SystemError("failed to spawn UI server");
  child.unref();
  const started_at = (/* @__PURE__ */ new Date()).toISOString();
  await writePidFile(p.uiPidFile, { pid: child.pid, port: chosenPort, started_at });
  return { pid: child.pid, port: chosenPort, url: `http://localhost:${chosenPort}`, started_at };
}

// cli/src/commands/ui/stop.ts
init_paths();
var POLL_INTERVAL_MS = 200;
var POLL_TIMEOUT_MS = 5e3;
async function runStop(opts) {
  const p = installPaths(resolveInstallRoot());
  const entry = await readPidFile(p.uiPidFile);
  if (!entry) return { stopped: true };
  if (isPidAlive(entry.pid)) {
    try {
      process.kill(entry.pid, "SIGTERM");
    } catch {
    }
  }
  await removePidFile(p.uiPidFile);
  const probe = opts._probePortFree ?? probePortFree;
  const now = opts._now ?? Date.now;
  const sleep = opts._sleep ?? ((ms) => new Promise((r) => setTimeout(r, ms)));
  const startedAt = now();
  let port_released = false;
  while (now() - startedAt < POLL_TIMEOUT_MS) {
    if (await probe(entry.port)) {
      port_released = true;
      break;
    }
    await sleep(POLL_INTERVAL_MS);
  }
  return { stopped: true, pid: entry.pid, port_released };
}

// cli/src/commands/ui/status.ts
init_paths();
async function runStatus() {
  const p = installPaths(resolveInstallRoot());
  const entry = await readPidFile(p.uiPidFile);
  if (!entry) return { running: false };
  if (!isPidAlive(entry.pid)) {
    await removePidFile(p.uiPidFile);
    return { running: false };
  }
  return { running: true, pid: entry.pid, port: entry.port, url: `http://localhost:${entry.port}` };
}

// cli/src/commands/ui/index.ts
var uiStartCommand = defineCommand({
  name: "ui-start",
  description: "Spawn the detached UI server and emit the URL",
  args: {},
  flags: {},
  handler: async ({ ctx }) => runStart({ env: ctx.env })
});
var uiStopCommand = defineCommand({
  name: "ui-stop",
  description: "Stop the detached UI server (SIGTERM) and clear the PID file",
  args: {},
  flags: {},
  handler: async ({ ctx }) => runStop({ env: ctx.env })
});
var uiStatusCommand = defineCommand({
  name: "ui-status",
  description: "Report whether the detached UI server is running",
  args: {},
  flags: {},
  handler: async () => runStatus()
});

// cli/src/commands/git/commit.ts
init_command();
init_errors2();
import { execFileSync } from "node:child_process";
function gitCommit(opts) {
  const exec2 = opts.exec ?? ((file, args, o) => execFileSync(file, args, o));
  let commitHash = null;
  try {
    exec2("git", ["add", "-A"], { cwd: opts.worktreePath, encoding: "utf8" });
    exec2("git", ["commit", "-m", opts.message], { cwd: opts.worktreePath, encoding: "utf8" });
    commitHash = String(exec2("git", ["rev-parse", "--short", "HEAD"], { cwd: opts.worktreePath, encoding: "utf8" })).trim();
  } catch (e) {
    const err = e;
    const text = err.stderr || err.stdout || err.message || "";
    const isNothing2 = text.includes("nothing to commit") || err.stdout && err.stdout.includes("nothing to commit") || err.message.includes("nothing to commit");
    return {
      committed: false,
      pushed: false,
      commitHash: null,
      upstreamConfigured: false,
      error: isNothing2 ? "nothing to commit" : text.trim() || err.message.trim(),
      errorType: isNothing2 ? "nothing_to_commit" : "commit_failed"
    };
  }
  try {
    exec2("git", ["push"], { cwd: opts.worktreePath, encoding: "utf8" });
  } catch (e) {
    const err = e;
    const text = err.stderr || err.message || "";
    if (text.includes("has no upstream branch") || text.includes("no upstream branch")) {
      try {
        const branch = String(exec2("git", ["rev-parse", "--abbrev-ref", "HEAD"], { cwd: opts.worktreePath, encoding: "utf8" })).trim();
        exec2("git", ["push", "--set-upstream", "origin", branch], { cwd: opts.worktreePath, encoding: "utf8" });
        return { committed: true, pushed: true, commitHash, upstreamConfigured: true, error: null, errorType: null };
      } catch (retryErr) {
        const r = retryErr;
        const rt = r.stderr || r.message || "";
        return {
          committed: true,
          pushed: false,
          commitHash,
          upstreamConfigured: false,
          error: rt.trim() || r.message.trim(),
          errorType: "push_failed"
        };
      }
    }
    return {
      committed: true,
      pushed: false,
      commitHash,
      upstreamConfigured: false,
      error: text.trim() || err.message.trim(),
      errorType: "push_failed"
    };
  }
  return { committed: true, pushed: true, commitHash, upstreamConfigured: false, error: null, errorType: null };
}
var gitCommitCommand = defineCommand({
  name: "git-commit",
  description: "Commit changes in the worktree and push to origin",
  args: {
    "worktree-path": { description: "Absolute path to the worktree to commit from", required: true },
    message: { description: "Commit message body (used as the -m argument to git commit)", required: true }
  },
  flags: {},
  handler: async ({ args }) => {
    const wt = args["worktree-path"];
    const msg = args.message;
    if (!wt || !msg) throw new UserError("--worktree-path and --message are both required");
    return gitCommit({ worktreePath: wt, message: msg });
  }
});

// cli/src/commands/git/pr.ts
init_command();
import { execFileSync as execFileSync2 } from "node:child_process";
function ghPr(opts) {
  const exec2 = opts.exec ?? ((file, args, o) => execFileSync2(file, args, o));
  if (!opts.worktreePath || !opts.branch || !opts.baseBranch || !opts.title) {
    return {
      pr_created: false,
      pr_url: null,
      pr_number: null,
      pr_existed: false,
      error: "precondition_failure",
      message: "Missing required argument: --worktree-path, --branch, --base-branch, and --title are all required"
    };
  }
  try {
    exec2("gh", ["auth", "status"], { encoding: "utf8" });
  } catch (e) {
    const err = e;
    const text = err.stderr || err.stdout || err.message || "";
    const isNotFound = text.includes("ENOENT") || text.includes("not found") || text.includes("not recognized");
    return {
      pr_created: false,
      pr_url: null,
      pr_number: null,
      pr_existed: false,
      error: isNotFound ? "gh_not_found" : "auth_failed",
      message: text.trim() || err.message.trim()
    };
  }
  let remote = "";
  try {
    remote = String(exec2("git", ["remote"], { cwd: opts.worktreePath, encoding: "utf8" })).trim();
  } catch (e) {
    const err = e;
    return {
      pr_created: false,
      pr_url: null,
      pr_number: null,
      pr_existed: false,
      error: "no_remote",
      message: (err.stderr || err.message || "Failed to detect git remote").trim()
    };
  }
  if (!remote) {
    return {
      pr_created: false,
      pr_url: null,
      pr_number: null,
      pr_existed: false,
      error: "no_remote",
      message: "No git remote configured"
    };
  }
  try {
    const list = String(exec2("gh", [
      "pr",
      "list",
      "--head",
      opts.branch,
      "--base",
      opts.baseBranch,
      "--json",
      "url,number",
      "--limit",
      "1"
    ], { cwd: opts.worktreePath, encoding: "utf8" })).trim();
    const parsed = JSON.parse(list);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return {
        pr_created: false,
        pr_url: parsed[0].url,
        pr_number: parsed[0].number,
        pr_existed: true,
        error: null,
        message: "Existing PR found"
      };
    }
  } catch {
  }
  try {
    const args = ["pr", "create", "--head", opts.branch, "--base", opts.baseBranch, "--title", opts.title];
    if (opts.bodyFile) args.push("--body-file", opts.bodyFile);
    const url = String(exec2("gh", args, { cwd: opts.worktreePath, encoding: "utf8" })).trim();
    const segs = url.split("/");
    const n = parseInt(segs[segs.length - 1], 10);
    return {
      pr_created: true,
      pr_url: url,
      pr_number: Number.isNaN(n) ? null : n,
      pr_existed: false,
      error: null,
      message: "PR created successfully"
    };
  } catch (e) {
    const err = e;
    const text = err.stderr || err.stdout || err.message || "";
    return {
      pr_created: false,
      pr_url: null,
      pr_number: null,
      pr_existed: false,
      error: "creation_failed",
      message: text.trim() || err.message.trim()
    };
  }
}
var gitPrCommand = defineCommand({
  name: "git-pr",
  description: "Open a GitHub pull request for the worktree branch",
  args: {
    "worktree-path": { description: "Absolute path to the worktree containing the branch", required: true },
    branch: { description: "Head branch name to open the PR from", required: true },
    "base-branch": { description: "Base branch name to target (typically main)", required: true },
    title: { description: "PR title \u2014 typically the project name", required: true },
    "body-file": { description: "Optional absolute path to a markdown file used as the PR description; omitted means the PR opens with no body" }
  },
  flags: {},
  handler: async ({ args }) => {
    return ghPr({
      worktreePath: args["worktree-path"] ?? "",
      branch: args.branch ?? "",
      baseBranch: args["base-branch"] ?? "",
      title: args.title ?? "",
      bodyFile: args["body-file"]
    });
  }
});

// cli/src/commands/project/context.ts
init_command();
import fs7 from "node:fs";
import os4 from "node:os";
import path9 from "node:path";
import { execFileSync as execFileSync3 } from "node:child_process";
function deriveRemoteUrl(raw) {
  if (!raw) return "";
  const ssh = raw.match(/^git@github\.com:(.+?)(?:\.git)?$/);
  if (ssh) return `https://github.com/${ssh[1]}`;
  if (raw.startsWith("https://")) return raw.replace(/\.git$/, "");
  return "";
}
function parseSimpleYaml(content) {
  const out = {};
  const stack = [];
  for (const raw of content.split("\n")) {
    if (raw.trim() === "" || raw.trim().startsWith("#")) continue;
    const indent = raw.search(/\S/);
    const trimmed = raw.trim();
    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) stack.pop();
    const m = trimmed.match(/^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)/);
    if (!m) continue;
    const prefix = stack.length > 0 ? `${stack[stack.length - 1].prefix}.${m[1]}` : m[1];
    let value = m[2] ?? "";
    if (value === "") {
      stack.push({ indent, prefix });
      continue;
    }
    value = value.replace(/\s+#.*$/, "").replace(/^["'](.*)["']$/, "$1");
    out[prefix] = value;
  }
  return out;
}
function isSourceControlInitialized(state) {
  const sc = state?.pipeline?.source_control;
  return !!sc && typeof sc === "object" && !Array.isArray(sc) && typeof sc.auto_commit === "string" && sc.auto_commit !== "" && typeof sc.auto_pr === "string" && sc.auto_pr !== "";
}
function projectContext(opts = {}) {
  const exec2 = opts.exec ?? ((f, a, o) => execFileSync3(f, a, { ...o, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
  const repoRootRaw = String(exec2("git", ["rev-parse", "--show-toplevel"])).trim();
  const repoRoot = path9.resolve(repoRootRaw);
  const repoName = path9.basename(repoRoot);
  const repoParent = path9.dirname(repoRoot);
  let currentBranch = "HEAD";
  try {
    currentBranch = String(exec2("git", ["branch", "--show-current"])).trim() || "HEAD";
  } catch {
  }
  let defaultBranch = "main";
  try {
    const ref = String(exec2("git", ["symbolic-ref", "refs/remotes/origin/HEAD"])).trim();
    defaultBranch = ref.split("/").pop() || "main";
  } catch {
    try {
      const branches = String(exec2("git", ["branch", "-r"])).trim();
      if (branches.includes("origin/master") && !branches.includes("origin/main")) defaultBranch = "master";
    } catch {
    }
  }
  const platformMap = { win32: "windows", darwin: "mac" };
  const platform = platformMap[process.platform] ?? "linux";
  const projectsBasePath = path9.join(os4.homedir(), ".radorch", "projects");
  const configPath = path9.join(os4.homedir(), ".radorch", "orchestration.yml");
  let configAutoCommit = "ask";
  let configAutoPr = "ask";
  if (fs7.existsSync(configPath)) {
    try {
      const yaml = parseSimpleYaml(fs7.readFileSync(configPath, "utf8"));
      if (yaml["source_control.auto_commit"]) configAutoCommit = yaml["source_control.auto_commit"];
      if (yaml["source_control.auto_pr"]) configAutoPr = yaml["source_control.auto_pr"];
    } catch {
    }
  }
  let remoteUrl = "";
  try {
    remoteUrl = deriveRemoteUrl(String(exec2("git", ["remote", "get-url", "origin"])).trim());
  } catch {
  }
  let projectDir = null;
  let sourceControlInitialized = null;
  if (opts.projectName) {
    projectDir = path9.join(projectsBasePath, opts.projectName);
    const stateJson = path9.join(projectDir, "state.json");
    if (fs7.existsSync(stateJson)) {
      try {
        sourceControlInitialized = isSourceControlInitialized(JSON.parse(fs7.readFileSync(stateJson, "utf8")));
      } catch {
        sourceControlInitialized = false;
      }
    } else {
      sourceControlInitialized = false;
    }
  }
  return {
    repoRoot,
    repoName,
    repoParent,
    currentBranch,
    defaultBranch,
    platform,
    projectsBasePath,
    configAutoCommit,
    configAutoPr,
    remoteUrl,
    projectDir,
    sourceControlInitialized
  };
}
var projectContextCommand = defineCommand({
  name: "project-context",
  description: "Return the shared context block for the workspace and optional project",
  args: {
    "project-name": { description: "When set, result includes the project-state block" }
  },
  flags: {},
  handler: async ({ args }) => projectContext({ projectName: args["project-name"] })
});

// cli/src/commands/project/find.ts
init_command();
init_errors2();
import fs8 from "node:fs";
import path10 from "node:path";
import { execFileSync as execFileSync4 } from "node:child_process";
function readState(projectDir) {
  const statePath = path10.join(projectDir, "state.json");
  if (!fs8.existsSync(statePath)) return null;
  try {
    return JSON.parse(fs8.readFileSync(statePath, "utf8"));
  } catch {
    return null;
  }
}
function masterPlanPath(state) {
  const planning = state["planning"];
  const step = planning?.steps?.find((s) => s.name === "master_plan" || s.id === "master_plan");
  return step?.doc_path ?? null;
}
function worktreeInfo(state) {
  const sc = state["pipeline"]?.source_control;
  return { worktreePath: sc?.worktree_path ?? null, branch: sc?.branch ?? null };
}
function activeWorktrees(repoRoot, exec2) {
  const out = /* @__PURE__ */ new Set();
  try {
    const text = String(exec2("git", ["worktree", "list", "--porcelain"], { cwd: repoRoot, encoding: "utf8" }));
    for (const line of text.split("\n")) {
      if (line.startsWith("worktree ")) out.add(path10.resolve(line.slice("worktree ".length).trim()));
    }
  } catch {
  }
  return out;
}
function summarize(name, state, active) {
  const wt = worktreeInfo(state);
  const tier = state["pipeline"]?.current_tier ?? null;
  return {
    name,
    masterPlanPath: masterPlanPath(state),
    currentTier: tier,
    existingWorktreePath: wt.worktreePath,
    existingBranch: wt.branch,
    worktreeExists: wt.worktreePath ? active.has(path10.resolve(wt.worktreePath)) : false
  };
}
function projectFind(opts) {
  const exec2 = opts.exec ?? ((f, a, o) => execFileSync4(f, a, { ...o, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
  if (!fs8.existsSync(opts.projectsBasePath)) return { basePathExists: false, projects: [] };
  const active = activeWorktrees(opts.repoRoot, exec2);
  if (opts.projectName) {
    const dir = path10.join(opts.projectsBasePath, opts.projectName);
    const state = readState(dir);
    if (!state) return { basePathExists: true, projects: [] };
    return { basePathExists: true, projects: [summarize(opts.projectName, state, active)] };
  }
  const entries = fs8.readdirSync(opts.projectsBasePath, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith("_")).sort((a, b) => a.name.localeCompare(b.name));
  const out = [];
  for (const d of entries) {
    const state = readState(path10.join(opts.projectsBasePath, d.name));
    if (!state) continue;
    const tier = state["pipeline"]?.current_tier;
    if (tier !== "execution") continue;
    out.push(summarize(d.name, state, active));
  }
  return { basePathExists: true, projects: out };
}
var projectFindCommand = defineCommand({
  name: "project-find",
  description: "Find execution-tier projects under the projects base path",
  args: {
    "projects-base-path": { description: "Absolute path to the projects base directory (typically ~/.radorch/projects)", required: true },
    "repo-root": { description: "Absolute path to the repository root used to enumerate active git worktrees", required: true },
    "project-name": { description: "Optional single-project lookup; when supplied the tier filter is bypassed" }
  },
  flags: {},
  handler: async ({ args }) => {
    const base = args["projects-base-path"];
    const root = args["repo-root"];
    if (!base || !root) throw new UserError("--projects-base-path and --repo-root are both required");
    return projectFind({ projectsBasePath: base, repoRoot: root, projectName: args["project-name"] });
  }
});

// cli/src/commands/worktree/create.ts
init_command();
init_errors2();
import path11 from "node:path";
import { execFileSync as execFileSync5 } from "node:child_process";
function deriveRemoteUrl2(raw) {
  if (!raw) return "";
  const ssh = raw.match(/^git@github\.com:(.+?)(?:\.git)?$/);
  if (ssh) return `https://github.com/${ssh[1]}`;
  if (raw.startsWith("https://")) return raw.replace(/\.git$/, "");
  return "";
}
function classify(stderr) {
  const m = (stderr || "").toLowerCase();
  if (m.includes("already exists") && m.includes("branch")) return "already_exists_branch";
  if (m.includes("already exists")) return "already_exists_path";
  if (m.includes("invalid reference") || m.includes("not a valid")) return "invalid_reference";
  return "unknown";
}
function worktreeCreate(opts) {
  const exec2 = opts.exec ?? ((f, a, o) => execFileSync5(f, a, { ...o, stdio: ["ignore", "pipe", "pipe"] }));
  try {
    exec2(
      "git",
      ["worktree", "add", "-b", opts.branch, opts.worktreePath, opts.baseBranch],
      { cwd: opts.repoRoot, encoding: "utf8" }
    );
  } catch (e) {
    const err = e;
    const stderr = (err.stderr || err.message || "").trim();
    return {
      created: false,
      worktreePath: opts.worktreePath,
      branch: opts.branch,
      baseBranch: opts.baseBranch,
      pushed: false,
      remoteUrl: "",
      compareUrl: "",
      error: stderr,
      errorType: classify(stderr)
    };
  }
  let pushed = false;
  try {
    exec2("git", ["push", "-u", "origin", opts.branch], { cwd: opts.worktreePath, encoding: "utf8" });
    pushed = true;
  } catch {
  }
  let raw = "";
  try {
    raw = String(exec2("git", ["remote", "get-url", "origin"], { cwd: opts.worktreePath, encoding: "utf8" })).trim();
  } catch {
  }
  const remoteUrl = deriveRemoteUrl2(raw);
  const baseShort = opts.baseBranch.replace(/^origin\//, "");
  const compareUrl = remoteUrl ? `${remoteUrl}/compare/${baseShort}...${opts.branch}` : "";
  return {
    created: true,
    worktreePath: path11.resolve(opts.worktreePath),
    branch: opts.branch,
    baseBranch: opts.baseBranch,
    pushed,
    remoteUrl,
    compareUrl,
    error: null,
    errorType: null
  };
}
var worktreeCreateCommand = defineCommand({
  name: "worktree-create",
  description: "Create a worktree at the given path on a new branch from base",
  args: {
    "repo-root": { description: "Absolute path to the repository root from which the worktree is added", required: true },
    branch: { description: "New branch name to create with the worktree", required: true },
    "worktree-path": { description: "Absolute target path for the new worktree directory", required: true },
    "base-branch": { description: "Existing ref to branch from (e.g. main, origin/main, or a commit SHA)", required: true }
  },
  flags: {},
  handler: async ({ args }) => {
    const root = args["repo-root"];
    const br = args.branch;
    const wt = args["worktree-path"];
    const base = args["base-branch"];
    if (!root || !br || !wt || !base) {
      throw new UserError("--repo-root, --branch, --worktree-path, and --base-branch are all required");
    }
    return worktreeCreate({ repoRoot: root, branch: br, worktreePath: wt, baseBranch: base });
  },
  mapResult: (r) => {
    if (!r.created) {
      const error = {
        type: "user_error",
        message: r.error ?? "worktree creation failed",
        errorType: r.errorType,
        worktreePath: r.worktreePath,
        branch: r.branch,
        baseBranch: r.baseBranch
      };
      return { ok: false, error, exit_code: 2 };
    }
    return { ok: true, data: r, exit_code: r.pushed ? 0 : 1 };
  }
});

// cli/src/commands/worktree/launch.ts
init_command();
init_errors2();
import os5 from "node:os";
import path12 from "node:path";
import { spawn as defaultSpawn } from "node:child_process";
var LAUNCH_AGENTS = ["claude", "copilot", "vscode", "terminal"];
var VALID_PERMISSION_MODES = ["default", "acceptEdits", "bypassPermissions", "auto", "dontAsk", "plan"];
function validateLaunchFlags(input) {
  const agent = input.agent;
  if (!agent || !LAUNCH_AGENTS.includes(agent)) {
    return { ok: false, error: { type: "user_error", message: `--agent must be one of: ${LAUNCH_AGENTS.join(", ")}` } };
  }
  const a = agent;
  const promptRequired = a === "claude" || a === "copilot";
  if (promptRequired && (!input.prompt || input.prompt === "")) {
    return { ok: false, error: { type: "user_error", message: `--prompt is required when --agent is ${a}` } };
  }
  if (!promptRequired && input.prompt) {
    return { ok: false, error: { type: "user_error", message: `--prompt is not valid with --agent ${a}; valid only for claude or copilot` } };
  }
  if (input.permissionMode !== void 0 && a !== "claude") {
    return { ok: false, error: { type: "user_error", message: `--permission-mode is only valid with --agent claude (got ${a})` } };
  }
  let pm;
  if (a === "claude") {
    const supplied = input.permissionMode ?? "auto";
    if (!VALID_PERMISSION_MODES.includes(supplied)) {
      return { ok: false, error: { type: "user_error", message: `--permission-mode invalid; valid values: ${VALID_PERMISSION_MODES.join(", ")}` } };
    }
    pm = supplied;
  }
  return { ok: true, agent: a, prompt: input.prompt, permissionMode: pm };
}
function repairMsysPrompt(prompt) {
  if (typeof prompt !== "string" || prompt.length === 0) return prompt;
  if (prompt.startsWith("/")) return prompt;
  if (!/^[A-Za-z]:[\\/]/.test(prompt)) return prompt;
  for (let i = prompt.length - 1; i >= 0; i--) {
    const ch = prompt[i];
    if (ch !== "/" && ch !== "\\") continue;
    const tailStart = i + 1;
    let tailEnd = tailStart;
    while (tailEnd < prompt.length && !/\s/.test(prompt[tailEnd])) tailEnd++;
    const command = prompt.slice(tailStart, tailEnd);
    if (!/^[A-Za-z][\w-]*$/.test(command)) continue;
    return `/${command}${prompt.slice(tailEnd)}`;
  }
  return prompt;
}
function quoteSingle(s) {
  return `'${s.replace(/'/g, "'\\''")}'`;
}
function quoteSinglePwsh(s) {
  return `'${s.replace(/'/g, "''")}'`;
}
function buildClaudeArgs(prompt, permissionMode, addDir) {
  return ["claude", "--permission-mode", permissionMode, prompt, "--add-dir", addDir];
}
function buildCopilotArgs(prompt, addDir) {
  return ["copilot", "--agent", "orchestrator", "--add-dir", addDir, "--allow-tool=shell", "-i", prompt];
}
function worktreeLaunch(opts) {
  const platform = opts.platform ?? process.platform;
  const spawn2 = opts.spawn ?? defaultSpawn;
  const repaired = repairMsysPrompt(opts.prompt);
  const addDir = path12.join(os5.homedir(), ".radorch", "projects");
  let agentArgs = [];
  if (opts.agent === "claude") {
    agentArgs = buildClaudeArgs(repaired ?? "", opts.permissionMode ?? "auto", addDir);
  } else if (opts.agent === "copilot") {
    agentArgs = buildCopilotArgs(repaired ?? "", addDir);
  } else if (opts.agent === "vscode") {
    agentArgs = ["code", opts.worktreePath];
  }
  try {
    const shellQuotedAgent = agentArgs.length > 0 ? `${agentArgs[0]} ${agentArgs.slice(1).map(quoteSingle).join(" ")}` : "";
    if (platform === "win32") {
      const cdPartPwsh = `Set-Location ${quoteSinglePwsh(opts.worktreePath)}`;
      const shellQuotedAgentPwsh = agentArgs.length > 0 ? `${agentArgs[0]} ${agentArgs.slice(1).map(quoteSinglePwsh).join(" ")}` : "";
      const psCmd = shellQuotedAgentPwsh ? `${cdPartPwsh}; ${shellQuotedAgentPwsh}` : cdPartPwsh;
      const encoded = Buffer.from(psCmd, "utf16le").toString("base64");
      const child = spawn2(
        "wt",
        ["--startingDirectory", opts.worktreePath, "powershell", "-NoExit", "-EncodedCommand", encoded],
        { detached: true, stdio: "ignore" }
      );
      child.unref();
    } else if (platform === "darwin") {
      const bashCd = `cd ${quoteSingle(opts.worktreePath)}`;
      const shell = shellQuotedAgent ? `${bashCd} && ${shellQuotedAgent}` : bashCd;
      const escaped = shell.replace(/"/g, '\\"');
      const child = spawn2(
        "osascript",
        ["-e", `tell application "Terminal" to do script "${escaped}"`],
        { detached: true, stdio: "ignore" }
      );
      child.unref();
    } else {
      const bashCd = `cd ${quoteSingle(opts.worktreePath)}`;
      const shell = shellQuotedAgent ? `${bashCd} && ${shellQuotedAgent}; exec bash` : `${bashCd}; exec bash`;
      const child = spawn2(
        "gnome-terminal",
        ["--", "bash", "-c", shell],
        { detached: true, stdio: "ignore" }
      );
      child.unref();
    }
  } catch (e) {
    return { ok: false, platform, agent: opts.agent, error: e.message };
  }
  const out = { ok: true, platform, agent: opts.agent };
  if (opts.agent === "claude" && opts.permissionMode) out.permissionMode = opts.permissionMode;
  return out;
}
var LAUNCH_DESCRIPTION = [
  "Open a terminal at the worktree and launch the chosen agent",
  "",
  "--prompt required for: claude, copilot \xB7 rejected for: vscode, terminal",
  "--permission-mode only valid with: claude (default: auto)"
].join("\n");
var worktreeLaunchCommand = defineCommand({
  name: "worktree-launch",
  description: LAUNCH_DESCRIPTION,
  args: {
    agent: { description: "Launch target: `claude`, `copilot`, `vscode`, or `terminal`", required: true },
    "worktree-path": { description: "Absolute path to the worktree the new terminal opens in", required: true },
    prompt: { description: "Initial prompt; required when --agent is `claude` or `copilot`, rejected otherwise" },
    "permission-mode": {
      description: "Claude permission mode (default `auto`); valid values: default, acceptEdits, bypassPermissions, auto, dontAsk, plan"
    }
  },
  flags: {},
  handler: async ({ args }) => {
    const wt = args["worktree-path"];
    if (!wt) throw new UserError("--worktree-path is required");
    const validated = validateLaunchFlags({
      agent: args.agent,
      prompt: args.prompt,
      permissionMode: args["permission-mode"]
    });
    if (!validated.ok) throw new UserError(validated.error.message);
    return worktreeLaunch({
      agent: validated.agent,
      worktreePath: wt,
      prompt: validated.prompt,
      permissionMode: validated.permissionMode
    });
  }
});

// cli/src/commands/plan/explode.ts
init_command();
init_errors2();

// cli/src/lib/explode-master-plan.ts
import * as fs9 from "node:fs";
import * as path13 from "node:path";
var ParseError = class extends Error {
  line;
  expected;
  found;
  constructor(detail) {
    super(detail.message);
    this.name = "ParseError";
    this.line = detail.line;
    this.expected = detail.expected;
    this.found = detail.found;
  }
  toDetail() {
    return {
      line: this.line,
      expected: this.expected,
      found: this.found,
      message: this.message
    };
  }
};
function readDocument2(docPath) {
  let raw;
  try {
    raw = fs9.readFileSync(docPath, "utf-8");
  } catch (err) {
    if (isEnoent(err)) return null;
    throw err;
  }
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, content: raw };
  }
  const frontmatterText = match[1] ?? "";
  const content = match[2] ?? "";
  const parsed = parseYaml(frontmatterText);
  const frontmatter = parsed !== null && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  return {
    frontmatter,
    content
  };
}
function isEnoent(err) {
  return err !== null && typeof err === "object" && err.code === "ENOENT";
}
function readState2(projectDir) {
  const statePath = path13.join(projectDir, "state.json");
  try {
    const raw = fs9.readFileSync(statePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (isEnoent(err)) return null;
    throw err;
  }
}
function writeState(projectDir, state) {
  fs9.mkdirSync(projectDir, { recursive: true });
  const statePath = path13.join(projectDir, "state.json");
  const tmpPath = path13.join(projectDir, "state.json.tmp");
  try {
    fs9.writeFileSync(tmpPath, JSON.stringify(state, null, 2), "utf-8");
    fs9.renameSync(tmpPath, statePath);
  } catch (err) {
    fs9.rmSync(tmpPath, { force: true });
    throw err;
  }
}
function validateFrontmatterPhaseCreated(frontmatter) {
  const tasks = frontmatter.tasks;
  if (!Array.isArray(tasks)) {
    return { error: "Invalid value: tasks must be an array", field: "tasks" };
  }
  if (tasks.length === 0) {
    return { error: "Invalid value: tasks must be a non-empty array", field: "tasks" };
  }
  return null;
}
var PHASE_HEADING_RE = /^##\s+P(\d{2}):\s*(.+?)\s*$/;
var TASK_HEADING_RE = /^###\s+P(\d{2})-T(\d{2}):\s*(.+?)\s*$/;
var LOOKS_LIKE_PHASE_RE = /^##\s+(P\d|Phase\b)/i;
var LOOKS_LIKE_TASK_RE = /^###\s+P\d/;
function computeFrontmatterOffset(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return 0;
  const block = match[0];
  const withoutTrailingNewline = block.replace(/\r?\n$/, "");
  return withoutTrailingNewline.split(/\r?\n/).length;
}
function parseMasterPlan(masterPlanPath2) {
  let raw;
  try {
    raw = fs9.readFileSync(masterPlanPath2, "utf-8");
  } catch (err) {
    const code = err?.code;
    if (code === "ENOENT") {
      throw new ParseError({
        line: 1,
        expected: "Master Plan file at " + masterPlanPath2,
        found: "missing file",
        message: `Master Plan file not found at ${masterPlanPath2}`
      });
    }
    throw err;
  }
  const frontmatterOffset = computeFrontmatterOffset(raw);
  const doc = readDocument2(masterPlanPath2);
  if (doc === null) {
    throw new ParseError({
      line: 1,
      expected: "Master Plan file at " + masterPlanPath2,
      found: "missing file",
      message: `Master Plan file not found at ${masterPlanPath2}`
    });
  }
  const frontmatter = doc.frontmatter;
  const body = doc.content;
  const lines = body.split(/\r?\n/);
  const phases = [];
  let preambleLines = [];
  let currentPhase = null;
  let currentTask = null;
  let currentBodyLines = [];
  const flushTask = () => {
    if (currentTask !== null) {
      currentTask.body = currentBodyLines.join("\n").trimEnd();
      currentTask.requirementTags = extractRequirementTags(currentTask.body);
      currentPhase.tasks.push(currentTask);
      currentTask = null;
      currentBodyLines = [];
    }
  };
  const flushPhase = () => {
    flushTask();
    if (currentPhase !== null) {
      if (currentPhase.tasks.length === 0) {
        currentPhase.body = currentBodyLines.join("\n").trimEnd();
      }
      phases.push(currentPhase);
      currentPhase = null;
      currentBodyLines = [];
    }
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    const lineNumber = i + 1 + frontmatterOffset;
    const phaseMatch = line.match(PHASE_HEADING_RE);
    if (phaseMatch) {
      const [, numStr, title] = phaseMatch;
      const phaseIndex = Number.parseInt(numStr, 10);
      if (Number.isNaN(phaseIndex) || phaseIndex < 1) {
        throw new ParseError({
          line: lineNumber,
          expected: 'a two-digit positive phase number (e.g. "P01")',
          found: `P${numStr}`,
          message: `Invalid phase number at line ${lineNumber}: "${line}"`
        });
      }
      if (currentPhase !== null) {
        flushPhase();
      } else {
        preambleLines = currentBodyLines;
        currentBodyLines = [];
      }
      currentPhase = {
        id: `P${numStr}`,
        index: phaseIndex,
        title: (title ?? "").trim(),
        body: "",
        tasks: []
      };
      continue;
    }
    if (LOOKS_LIKE_PHASE_RE.test(line) && !line.match(PHASE_HEADING_RE)) {
      throw new ParseError({
        line: lineNumber,
        expected: '"## P{NN}: {Title}" phase heading',
        found: line,
        message: `Malformed phase heading at line ${lineNumber}: expected "## P{NN}: {Title}", found "${line}"`
      });
    }
    const taskMatch = line.match(TASK_HEADING_RE);
    if (taskMatch) {
      const [, phaseNumStr, taskNumStr, title] = taskMatch;
      const phaseIndex = Number.parseInt(phaseNumStr, 10);
      const taskIndex = Number.parseInt(taskNumStr, 10);
      if (currentPhase === null) {
        throw new ParseError({
          line: lineNumber,
          expected: 'a "## P{NN}:" phase heading before any "### P{NN}-T{MM}:" task heading',
          found: line,
          message: `Task heading at line ${lineNumber} appears before any phase heading: "${line}"`
        });
      }
      if (phaseIndex !== currentPhase.index) {
        throw new ParseError({
          line: lineNumber,
          expected: `task under current phase P${String(currentPhase.index).padStart(2, "0")}`,
          found: `P${phaseNumStr}`,
          message: `Task phase id mismatch at line ${lineNumber}: task claims phase P${phaseNumStr} but the enclosing phase is ${currentPhase.id}`
        });
      }
      if (currentTask === null && currentPhase.tasks.length === 0) {
        currentPhase.body = currentBodyLines.join("\n").trimEnd();
        currentBodyLines = [];
      }
      flushTask();
      currentTask = {
        id: `P${phaseNumStr}-T${taskNumStr}`,
        phaseIndex,
        taskIndex,
        title: (title ?? "").trim(),
        requirementTags: [],
        body: ""
      };
      continue;
    }
    if (LOOKS_LIKE_TASK_RE.test(line) && !line.match(TASK_HEADING_RE)) {
      throw new ParseError({
        line: lineNumber,
        expected: '"### P{NN}-T{MM}: {Title}" task heading',
        found: line,
        message: `Malformed task heading at line ${lineNumber}: expected "### P{NN}-T{MM}: {Title}", found "${line}"`
      });
    }
    currentBodyLines.push(line);
  }
  flushPhase();
  if (phases.length === 0) {
    throw new ParseError({
      line: frontmatterOffset + 1,
      expected: 'at least one "## P{NN}:" phase heading',
      found: "no phase headings",
      message: "Master Plan contains no parseable phase headings"
    });
  }
  return {
    phases,
    frontmatter,
    preamble: preambleLines.join("\n").trimEnd()
  };
}
function extractRequirementTags(body) {
  const tags = /* @__PURE__ */ new Set();
  const tagLineMatch = body.match(/\*\*Requirements:\*\*\s*([^\n]+)/);
  if (tagLineMatch) {
    const items = (tagLineMatch[1] ?? "").split(/[,\s]+/).map((s) => s.trim()).filter(Boolean);
    for (const item of items) tags.add(item);
  }
  return Array.from(tags);
}
function titleToFilenameSlug(title) {
  const cleaned = title.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return cleaned || "UNTITLED";
}
function phaseFilename(projectName, phase) {
  const idx = String(phase.index).padStart(2, "0");
  return `${projectName}-PHASE-${idx}-${titleToFilenameSlug(phase.title)}.md`;
}
function taskFilename(projectName, task) {
  const pidx = String(task.phaseIndex).padStart(2, "0");
  const tidx = String(task.taskIndex).padStart(2, "0");
  return `${projectName}-TASK-P${pidx}-T${tidx}-${titleToFilenameSlug(task.title)}.md`;
}
function buildPhaseFrontmatter(opts) {
  return {
    project: opts.projectName,
    phase: opts.phase.index,
    title: opts.phase.title,
    status: "active",
    tasks: opts.phase.tasks.map((t) => ({ id: `T${String(t.taskIndex).padStart(2, "0")}`, title: t.title })),
    author: "explosion-script",
    created: opts.createdIso,
    type: "phase_plan"
  };
}
function buildTaskFrontmatter(opts) {
  return {
    project: opts.projectName,
    phase: opts.task.phaseIndex,
    task: opts.task.taskIndex,
    title: opts.task.title,
    status: "pending",
    requirement_tags: opts.task.requirementTags,
    author: "explosion-script",
    created: opts.createdIso,
    type: "task_handoff"
  };
}
function renderDoc(frontmatter, body) {
  const frontmatterYaml = stringifyYaml(frontmatter).trimEnd();
  return `---
${frontmatterYaml}
---

${body.trimEnd()}
`;
}
function renderPhaseBody(phase) {
  const header = `# Phase ${phase.index}: ${phase.title}`;
  const sections = [header, ""];
  if (phase.body.trim().length > 0) {
    sections.push(phase.body.trim(), "");
  }
  sections.push("## Tasks", "");
  if (phase.tasks.length === 0) {
    sections.push("_(no tasks emitted by explosion script \u2014 phase has no task headings in the Master Plan)_");
  } else {
    for (const t of phase.tasks) {
      const tidx = String(t.taskIndex).padStart(2, "0");
      sections.push(`- **T${tidx}**: ${t.title}`);
    }
  }
  return sections.join("\n");
}
function renderTaskBody(task) {
  const pidx = String(task.phaseIndex).padStart(2, "0");
  const tidx = String(task.taskIndex).padStart(2, "0");
  const header = `# P${pidx}-T${tidx}: ${task.title}`;
  const sections = [header, ""];
  if (task.body.trim().length > 0) {
    sections.push(task.body.trim());
  } else {
    sections.push("_(empty body in Master Plan)_");
  }
  return sections.join("\n");
}
function hasContents(dir) {
  try {
    const entries = fs9.readdirSync(dir);
    return entries.length > 0;
  } catch {
    return false;
  }
}
function moveContentsTo(srcDir, destDir) {
  if (!fs9.existsSync(srcDir)) return;
  fs9.mkdirSync(destDir, { recursive: true });
  for (const entry of fs9.readdirSync(srcDir)) {
    const srcPath = path13.join(srcDir, entry);
    const destPath = path13.join(destDir, entry);
    try {
      fs9.renameSync(srcPath, destPath);
    } catch (err) {
      const code = err?.code;
      if (code === "EXDEV" || code === "EPERM" || code === "ENOTEMPTY") {
        fs9.cpSync(srcPath, destPath, { recursive: true });
        fs9.rmSync(srcPath, { recursive: true, force: true });
      } else {
        throw err;
      }
    }
  }
}
function makeBackupDir(projectDir, nowIso) {
  const iso = nowIso ?? (/* @__PURE__ */ new Date()).toISOString();
  const stamp = iso.replace(/[:.]/g, "-");
  return path13.join(projectDir, "backups", stamp);
}
function explodeMasterPlan(opts) {
  const { projectDir, masterPlanPath: masterPlanPath2, projectName } = opts;
  const nowIso = opts.nowIso ?? (/* @__PURE__ */ new Date()).toISOString();
  const parsed = parseMasterPlan(masterPlanPath2);
  const phasesDir = path13.join(projectDir, "phases");
  const tasksDir = path13.join(projectDir, "tasks");
  let backupDir = null;
  const phasesHas = hasContents(phasesDir);
  const tasksHas = hasContents(tasksDir);
  if (phasesHas || tasksHas) {
    backupDir = makeBackupDir(projectDir, nowIso);
    if (phasesHas) moveContentsTo(phasesDir, path13.join(backupDir, "phases"));
    if (tasksHas) moveContentsTo(tasksDir, path13.join(backupDir, "tasks"));
  }
  fs9.mkdirSync(phasesDir, { recursive: true });
  fs9.mkdirSync(tasksDir, { recursive: true });
  const emittedPhaseFiles = [];
  const emittedTaskFiles = [];
  for (const phase of parsed.phases) {
    const fname = phaseFilename(projectName, phase);
    const fpath = path13.join(phasesDir, fname);
    const frontmatter = buildPhaseFrontmatter({ projectName, phase, createdIso: nowIso });
    if (phase.tasks.length > 0) {
      const err = validateFrontmatterPhaseCreated(frontmatter);
      if (err !== null) {
        throw new Error(
          `Explosion emitter produced invalid phase frontmatter for ${fname}: ${err.error} (field: ${err.field})`
        );
      }
    }
    fs9.writeFileSync(fpath, renderDoc(frontmatter, renderPhaseBody(phase)), "utf-8");
    emittedPhaseFiles.push(fpath);
    for (const task of phase.tasks) {
      const tname = taskFilename(projectName, task);
      const tpath = path13.join(tasksDir, tname);
      const tfront = buildTaskFrontmatter({ projectName, task, createdIso: nowIso });
      fs9.writeFileSync(tpath, renderDoc(tfront, renderTaskBody(task)), "utf-8");
      emittedTaskFiles.push(tpath);
    }
  }
  const state = readState2(projectDir);
  if (state !== null) {
    seedIterations(state, parsed, projectName, emittedPhaseFiles, emittedTaskFiles, projectDir);
    writeState(projectDir, state);
  }
  return {
    emittedPhaseFiles,
    emittedTaskFiles,
    backupDir
  };
}
function toRelativeDocPath(absPath, projectDir) {
  const rel = path13.relative(projectDir, absPath);
  return rel.split(path13.sep).join("/");
}
function seedIterations(state, parsed, _projectName, emittedPhaseFiles, emittedTaskFiles, projectDir) {
  let phaseLoop = state.graph.nodes["phase_loop"];
  if (phaseLoop === void 0) {
    phaseLoop = {
      kind: "for_each_phase",
      status: "not_started",
      iterations: []
    };
    state.graph.nodes["phase_loop"] = phaseLoop;
  } else if (phaseLoop.kind !== "for_each_phase") {
    throw new Error(
      `explosion script: expected state.graph.nodes.phase_loop to be 'for_each_phase', got '${phaseLoop.kind}'`
    );
  }
  phaseLoop.iterations = [];
  phaseLoop.status = "not_started";
  let taskFilePointer = 0;
  for (let i = 0; i < parsed.phases.length; i++) {
    const phase = parsed.phases[i];
    const phaseFileAbs = emittedPhaseFiles[i] ?? null;
    const phaseFile = phaseFileAbs !== null ? toRelativeDocPath(phaseFileAbs, projectDir) : null;
    const taskLoopIterations = [];
    for (let j = 0; j < phase.tasks.length; j++) {
      const taskFileAbs = emittedTaskFiles[taskFilePointer++] ?? null;
      const taskFile = taskFileAbs !== null ? toRelativeDocPath(taskFileAbs, projectDir) : null;
      taskLoopIterations.push({
        index: j,
        status: "not_started",
        nodes: {},
        corrective_tasks: [],
        doc_path: taskFile,
        commit_hash: null
      });
    }
    const taskLoop = {
      kind: "for_each_task",
      status: "not_started",
      iterations: taskLoopIterations
    };
    const phaseEntry = {
      index: i,
      status: "not_started",
      nodes: { task_loop: taskLoop },
      corrective_tasks: [],
      doc_path: phaseFile,
      commit_hash: null
    };
    phaseLoop.iterations.push(phaseEntry);
  }
}

// cli/src/commands/plan/explode.ts
function planExplode(opts) {
  try {
    const r = explodeMasterPlan({
      projectDir: opts.projectDir,
      masterPlanPath: opts.masterPlanPath,
      projectName: opts.projectName
    });
    return {
      type: "success",
      emittedPhases: r.emittedPhaseFiles.length,
      emittedTasks: r.emittedTaskFiles.length,
      backupDir: r.backupDir
    };
  } catch (err) {
    if (err instanceof ParseError) {
      return { type: "parse_error", error: err.toDetail() };
    }
    return { type: "real_error", message: err instanceof Error ? err.message : String(err) };
  }
}
var planExplodeCommand = defineCommand({
  name: "plan-explode",
  description: "Explode the Master Plan into phase and task files",
  args: {
    "project-dir": { description: "Absolute path to the project directory", required: true },
    "master-plan": { description: "Absolute path to the approved Master Plan markdown", required: true },
    "project-name": { description: "Project name used as the filename prefix on emitted phase and task files", required: true }
  },
  flags: {},
  handler: async ({ args }) => {
    const pd = args["project-dir"];
    const mp = args["master-plan"];
    const pn = args["project-name"];
    if (!pd || !mp || !pn) throw new UserError("--project-dir, --master-plan, and --project-name are all required");
    return planExplode({ projectDir: pd, masterPlanPath: mp, projectName: pn });
  },
  mapResult: (r) => {
    if (r.type === "success") {
      return {
        ok: true,
        data: { emittedPhases: r.emittedPhases, emittedTasks: r.emittedTasks, backupDir: r.backupDir },
        exit_code: 0
      };
    }
    if (r.type === "parse_error") {
      return { ok: true, data: { error: r.error }, exit_code: 2 };
    }
    return { ok: false, error: { type: "system_error", message: r.message } };
  }
});

// cli/src/commands/skill/list.ts
init_command();
init_skill_manifest();
var skillListCommand = defineCommand({
  name: "skill-list",
  description: "List repository SKILL.md entries eligible for planner-spawn discovery",
  args: {
    "repo-root": {
      description: "Absolute path to the repository root whose skills are scanned",
      required: true
    }
  },
  flags: {},
  handler: async ({ args, ctx }) => {
    const warn = (msg) => ctx.logger.warn("skill_list_skip", { message: msg });
    return { skills: buildSkillManifest({ repoRoot: args["repo-root"], warn }) };
  }
});

// cli/src/commands/pipeline/signal.ts
init_engine();
init_state_io();
init_path_context();
init_command();

// cli/src/commands/pipeline/parse-error.ts
function parseParseErrorFlag(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    return { ok: false, error: { field: "parse-error", message: `Invalid JSON for --parse-error: ${e.message}` } };
  }
  if (parsed === null || typeof parsed !== "object") {
    return { ok: false, error: { field: "parse-error", message: `Invalid --parse-error shape: expected an object, got ${parsed === null ? "null" : typeof parsed}` } };
  }
  const p = parsed;
  if (!Number.isInteger(p["line"]) || p["line"] < 1 || typeof p["expected"] !== "string" || typeof p["found"] !== "string" || typeof p["message"] !== "string") {
    return { ok: false, error: { field: "parse-error", message: "Invalid --parse-error shape: expected { line: positive integer, expected: string, found: string, message: string }" } };
  }
  return { ok: true, value: { line: p["line"], expected: p["expected"], found: p["found"], message: p["message"] } };
}

// cli/src/commands/pipeline/signal.ts
function makeDefaultIO() {
  return { readState: readState3, writeState: writeState2, readConfig, readDocument: readDocument3, ensureDirectories };
}
async function pipelineSignal(input) {
  const io = input.io ?? makeDefaultIO();
  const pathContext = input.pathContext ?? resolvePathContext();
  const configPath = input.configPath ?? resolveDiscoveredConfigPath();
  let result;
  try {
    result = processEvent(input.event, input.projectDir, input.context, io, pathContext, configPath);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { ok: false, data: { event: input.event || "unknown" }, error: { type: "user_error", message } };
  }
  if (result.error) {
    return {
      ok: false,
      data: { event: result.error.event, ...result.error.field ? { field: result.error.field } : {} },
      error: { type: "user_error", message: result.error.message }
    };
  }
  return { ok: true, data: { action: result.action, context: result.context } };
}
var pipelineSignalCommand = defineCommand({
  name: "pipeline-signal",
  description: "Signal a pipeline event and apply the resulting state mutations",
  args: {
    event: { description: "Pipeline event name (start, master_plan_started, plan_approved, gate_approved, task_completed, commit_completed, pr_created, phase_review_completed, final_review_completed, explosion_failed, source_control_init, \u2026)", required: true },
    "project-dir": { description: "Absolute path to the project directory whose state.json the event mutates", required: true }
  },
  flags: {
    "doc-path": { description: "Absolute path to the doc the engine pre-reads (master plan, phase report, review, \u2026)", type: "string" },
    phase: { description: "1-based phase index", type: "string" },
    task: { description: "1-based task index inside the current phase", type: "string" },
    "gate-mode": { description: "Gate mode: task | phase | autonomous", type: "string" },
    "gate-type": { description: "Gate type for the gate_approved event: task | phase", type: "string" },
    verdict: { description: "Review verdict: approved | changes_requested | rejected", type: "string" },
    branch: { description: "Working branch name for source-control events", type: "string" },
    "base-branch": { description: "Base branch name for source-control init", type: "string" },
    "worktree-path": { description: "Absolute path to the worktree", type: "string" },
    "auto-commit": { description: "Source-control auto-commit policy: always | never", type: "string" },
    "auto-pr": { description: "Source-control auto-pr policy: always | never", type: "string" },
    reason: { description: "Free-text rejection reason for gate_rejected and review failures", type: "string" },
    "commit-hash": { description: "Commit hash recorded on commit_completed", type: "string" },
    pushed: { description: "Push outcome flag carried on commit_completed", type: "string" },
    "remote-url": { description: "Remote URL recorded on source_control_init", type: "string" },
    "compare-url": { description: "Compare URL recorded on commit_completed", type: "string" },
    "pr-url": { description: "PR URL recorded on pr_created", type: "string" },
    template: { description: "Pipeline template id (extra-high | high | medium | low) for the start event", type: "string" },
    step: { description: "Internal step identifier carried by *_started events from the v5 DAG walker", type: "string" },
    "parse-error": { description: "JSON object { line, expected, found, message } carried on explosion_failed", type: "string" },
    config: { description: "Override path to orchestration.yml; default ~/.radorch/orchestration.yml", type: "string" }
  },
  handler: async ({ args, flags }) => {
    const event = args.event;
    const projectDir = args["project-dir"];
    const context = {};
    const copy = (src, dst) => {
      if (flags[src] !== void 0) context[dst] = flags[src];
    };
    copy("doc-path", "doc_path");
    copy("branch", "branch");
    copy("gate-mode", "gate_mode");
    copy("step", "step");
    copy("verdict", "verdict");
    copy("base-branch", "base_branch");
    copy("worktree-path", "worktree_path");
    copy("auto-commit", "auto_commit");
    copy("auto-pr", "auto_pr");
    copy("gate-type", "gate_type");
    copy("reason", "reason");
    copy("commit-hash", "commit_hash");
    copy("pushed", "pushed");
    copy("remote-url", "remote_url");
    copy("compare-url", "compare_url");
    copy("pr-url", "pr_url");
    copy("template", "template");
    if (flags.phase !== void 0) {
      const n = Number(flags.phase);
      if (!Number.isFinite(n) || n < 1) return { ok: false, data: { event, field: "phase" }, error: { type: "user_error", message: `Invalid value for --phase: ${flags.phase}` } };
      context["phase"] = n;
    }
    if (flags.task !== void 0) {
      const n = Number(flags.task);
      if (!Number.isFinite(n) || n < 1) return { ok: false, data: { event, field: "task" }, error: { type: "user_error", message: `Invalid value for --task: ${flags.task}` } };
      context["task"] = n;
    }
    if (flags["parse-error"] !== void 0) {
      const pe = parseParseErrorFlag(flags["parse-error"]);
      if (!pe.ok) return { ok: false, data: { event, field: pe.error.field }, error: { type: "user_error", message: pe.error.message } };
      context["parse_error"] = pe.value;
    }
    return pipelineSignal({ event, projectDir, context, configPath: flags.config });
  },
  mapResult: (r) => r.ok ? { ok: true, data: r.data } : { ok: false, data: r.data, error: r.error }
});

// cli/src/commands/where.ts
init_paths();
var WHERE_NAMES = {
  projects: {
    description: "Global projects folder (~/.radorch/projects).",
    resolve: () => installPaths(resolveInstallRoot()).projectsDir
  },
  root: {
    description: "Radorch install root (~/.radorch).",
    resolve: () => installPaths(resolveInstallRoot()).root
  },
  "install-json": {
    description: "Install metadata (version, timestamp).",
    resolve: () => installPaths(resolveInstallRoot()).installJson
  },
  logs: {
    description: "Logs directory.",
    resolve: () => installPaths(resolveInstallRoot()).logsDir
  },
  "plugin-root": {
    description: "Plugin install root (CLAUDE_PLUGIN_ROOT env var).",
    resolve: (env2) => env2["CLAUDE_PLUGIN_ROOT"] ?? { error: "CLAUDE_PLUGIN_ROOT is not set" }
  }
};
var WHERE_DESCRIPTION = "Print the absolute path for a named radorch location. With no name, prints a `name  path` table for every supported lookup.";
async function runWhere(opts) {
  const { name, stdout, stderr, env: env2 } = opts;
  const names = Object.keys(WHERE_NAMES);
  if (!name) {
    const width = Math.max(...names.map((n) => n.length));
    for (const n of names) {
      const r = WHERE_NAMES[n].resolve(env2);
      const value = typeof r === "string" ? r : `<unset: ${r.error}>`;
      stdout.write(`${n.padEnd(width)}  ${value}
`);
    }
    return 0;
  }
  if (!(name in WHERE_NAMES)) {
    stderr.write(`unknown: ${name}
`);
    stderr.write(`names: ${names.join(", ")}
`);
    return 1;
  }
  const result = WHERE_NAMES[name].resolve(env2);
  if (typeof result === "string") {
    stdout.write(`${result}
`);
    return 0;
  }
  stderr.write(`${name}: ${result.error}
`);
  return 1;
}
function whereHelpText() {
  const names = Object.keys(WHERE_NAMES);
  const width = Math.max(...names.map((n) => n.length));
  const lines = names.map((n) => `  ${n.padEnd(width)}  ${WHERE_NAMES[n].description}`);
  return ["Names:", ...lines].join("\n");
}

// cli/src/cli.ts
function buildProgram(version) {
  const program3 = new Command("radorch");
  program3.description("radorch CLI \u2014 global orchestration root manager").version(version);
  program3.command("doctor").description(doctorCommand.description).allowUnknownOption().allowExcessArguments(true).action(async () => {
    const argv = process.argv.slice(3);
    await runCommand(doctorCommand, { argv, env: process.env, isTTY: Boolean(process.stdin.isTTY), stderr: process.stderr });
  });
  program3.command("where [name]").description(WHERE_DESCRIPTION).addHelpText("after", "\n" + whereHelpText()).action(async (name) => {
    const code = await runWhere({ name, stdout: process.stdout, stderr: process.stderr, env: process.env });
    process.exit(code);
  });
  const ui = program3.command("ui").description("UI server lifecycle");
  ui.command("start").description(uiStartCommand.description).allowUnknownOption().allowExcessArguments(true).action(async () => {
    const argv = process.argv.slice(4);
    await runCommand(uiStartCommand, { argv, env: process.env, isTTY: Boolean(process.stdin.isTTY), stderr: process.stderr });
  });
  ui.command("stop").description(uiStopCommand.description).allowUnknownOption().allowExcessArguments(true).action(async () => {
    const argv = process.argv.slice(4);
    await runCommand(uiStopCommand, { argv, env: process.env, isTTY: Boolean(process.stdin.isTTY), stderr: process.stderr });
  });
  ui.command("status").description(uiStatusCommand.description).allowUnknownOption().allowExcessArguments(true).action(async () => {
    const argv = process.argv.slice(4);
    await runCommand(uiStatusCommand, { argv, env: process.env, isTTY: Boolean(process.stdin.isTTY), stderr: process.stderr });
  });
  const git = program3.command("git").description("Source control operations");
  git.command("commit").description(gitCommitCommand.description).helpOption(false).allowUnknownOption().allowExcessArguments(true).action(async () => {
    const argv = process.argv.slice(4);
    await runCommand(gitCommitCommand, { argv, env: process.env, isTTY: Boolean(process.stdin.isTTY), stderr: process.stderr });
  });
  git.command("pr").description(gitPrCommand.description).helpOption(false).allowUnknownOption().allowExcessArguments(true).action(async () => {
    const argv = process.argv.slice(4);
    await runCommand(gitPrCommand, { argv, env: process.env, isTTY: Boolean(process.stdin.isTTY), stderr: process.stderr });
  });
  const project = program3.command("project").description("Project state read operations");
  project.command("context").description(projectContextCommand.description).helpOption(false).allowUnknownOption().allowExcessArguments(true).action(async () => {
    const argv = process.argv.slice(4);
    await runCommand(projectContextCommand, { argv, env: process.env, isTTY: Boolean(process.stdin.isTTY), stderr: process.stderr });
  });
  project.command("find").description(projectFindCommand.description).helpOption(false).allowUnknownOption().allowExcessArguments(true).action(async () => {
    const argv = process.argv.slice(4);
    await runCommand(projectFindCommand, { argv, env: process.env, isTTY: Boolean(process.stdin.isTTY), stderr: process.stderr });
  });
  const worktree = program3.command("worktree").description("Worktree lifecycle operations");
  worktree.command("create").description(worktreeCreateCommand.description).helpOption(false).allowUnknownOption().allowExcessArguments(true).action(async () => {
    const argv = process.argv.slice(4);
    await runCommand(worktreeCreateCommand, { argv, env: process.env, isTTY: Boolean(process.stdin.isTTY), stderr: process.stderr });
  });
  worktree.command("launch").description(worktreeLaunchCommand.description).helpOption(false).allowUnknownOption().allowExcessArguments(true).action(async () => {
    const argv = process.argv.slice(4);
    await runCommand(worktreeLaunchCommand, { argv, env: process.env, isTTY: Boolean(process.stdin.isTTY), stderr: process.stderr });
  });
  const plan = program3.command("plan").description("Master Plan operations");
  plan.command("explode").description(planExplodeCommand.description).helpOption(false).allowUnknownOption().allowExcessArguments(true).action(async () => {
    const argv = process.argv.slice(4);
    await runCommand(planExplodeCommand, { argv, env: process.env, isTTY: Boolean(process.stdin.isTTY), stderr: process.stderr });
  });
  const skill = program3.command("skill").description("Repository skill catalog operations");
  skill.command("list").description(skillListCommand.description).helpOption(false).allowUnknownOption().allowExcessArguments(true).action(async () => {
    const argv = process.argv.slice(4);
    await runCommand(skillListCommand, { argv, env: process.env, isTTY: Boolean(process.stdin.isTTY), stderr: process.stderr });
  });
  const pipeline = program3.command("pipeline").description("Pipeline event dispatch");
  pipeline.command("signal").description(pipelineSignalCommand.description).helpOption(false).allowUnknownOption().allowExcessArguments(true).action(async () => {
    const argv = process.argv.slice(4);
    await runCommand(pipelineSignalCommand, { argv, env: process.env, isTTY: Boolean(process.stdin.isTTY), stderr: process.stderr });
  });
  const gate = program3.command("gate").description("pipeline gate operations");
  const gateApprove = gate.command("approve").description("approve a pipeline gate");
  gateApprove.command("plan").description("Approve the project Master Plan").allowUnknownOption().allowExcessArguments(true).action(async () => {
    const { approvePlanCommand: approvePlanCommand2 } = await Promise.resolve().then(() => (init_approve_plan(), approve_plan_exports));
    const argv = process.argv.slice(5);
    await runCommand(approvePlanCommand2, { argv, env: process.env, isTTY: Boolean(process.stdin.isTTY), stderr: process.stderr });
  });
  gateApprove.command("final").description("Approve the project Final Review").allowUnknownOption().allowExcessArguments(true).action(async () => {
    const { approveFinalCommand: approveFinalCommand2 } = await Promise.resolve().then(() => (init_approve_final(), approve_final_exports));
    const argv = process.argv.slice(5);
    await runCommand(approveFinalCommand2, { argv, env: process.env, isTTY: Boolean(process.stdin.isTTY), stderr: process.stderr });
  });
  program3.addHelpText(
    "after",
    "\nTip: use 'radorch where <name>' to resolve any radorch path (projects, registry, config, ...). 'radorch where' with no arg lists them all."
  );
  return program3;
}

// cli/src/bin/radorch.ts
init_package_version();
var program2 = buildProgram(getCliVersion());
program2.parseAsync(process.argv).catch((err) => {
  process.stderr.write((err instanceof Error ? err.message : String(err)) + "\n");
  process.exit(2);
});
/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT *)
*/
