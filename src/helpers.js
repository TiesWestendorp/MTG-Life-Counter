function range(value) { return [...Array(value).keys()] }

function stringToPath(path) {
	if (typeof path !== 'string') return path
	let output = []
	path.split('.').forEach((item, index) => {
		item.split(/\[([^}]+)\]/g).forEach(key => {
			if (key.length > 0) {
				output.push(key)
			}
		})
	})
	return output
}

function get(obj, path, def) {
	path = stringToPath(path)
	let current = obj
	for(let i = 0; i < path.length; i++) {
		if (!current[path[i]]) return def
		current = current[path[i]]
	}
	return current
}

function set(obj, path, value) {
	let copy = {...obj}
	path = stringToPath(path)
	let current = copy
	for(let i = 0; i < path.length-1; i++) {
		current = current[path[i]]
	}
	current[path[path.length-1]] = value
	return copy
}

export { range, stringToPath, get, set }
