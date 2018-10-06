const UnixArguments = require('../../src/utility/arguments/UnixArguments.js')

exports.pre = async (client, message) => {
	console.log('Test command (UNIX) run by ' + message.author.username)
}

exports.run = async (client, message, args, pre) => {
	let initialText = args.echo
	let text = ''
	for (let i = 0; i < args.repeat; i++) text += initialText
	return message.author.send(text)
}

exports.post = async (client, message, result) => {
	console.log('Test command (UNIX) complete!')
}

/*
	This object is mostly equivalent to yargs-parser's options object (see: https://github.com/yargs/yargs-parser#requireyargs-parserargs-opts),
	with a few additions used by the internal parser wrapper:

	Although yargs-parser only knows numbers, here "integer" and "float" are also supported types.

	Similarly, "user" and "channel" are supported types for user and channel mentions, respectively. These allow both mentions and the IDs
	directly, and the parser will convert those into the IDs. If nothing resembling an ID is passed, false is returned.
	(Note: There is no guarantee that the IDs actually exist, only that they look like valid IDs. Validation in the command is required.)

	Passing an object with a "description" property as a default value will treat it not as a literal value, but a description of a default value
	that's computed at runtime. It is the command implementer's responsibility to actually compute and set that value, as the parser cannot do that.

	Additional supported fields are "required", "exclusive" and "positional".
	- "required" is an array of strings listing all arguments that must be present. Any argument not listed is assumed to be optional.
	- "exclusive" is an array of arrays of strings, listing groups of mutually exclusive arguments. Listing one or more arguments of a
	group as required will mean the entire group is required.
	- "positional" is an object with the format { args: [{ name: String, type: String, required: Boolean|Number|Object|String }], required: Number }.
	(The "default" field is optional.) It is used to define any positional arguments the command takes. Positional arguments will be available using
	the name given, but they will also still be available via the "_" array.

	Lastly, the --help argument is reserved. If it (or any alias of it) is used, the command is not executed, and its usage information is
	displayed instead.
*/
exports.yargsOpts = {
	alias: {
		help: ['h']
	},
	string: ['echo'],
	integer: ['repeat'],
	default: {
		repeat: 1
	},
	required: ['echo']
}

exports.help = {
	name: ['testunix'],
	group: 'dev',
	description: 'A test command with UNIX-style arguments.',
	args: UnixArguments.generateUsage(exports.yargsOpts)
}
