// Atlas adapter: upstream default values without a global DialKit tuning panel.
export function useDialKit(_name,config){return Object.fromEntries(Object.entries(config).map(([key,value])=>[key,Array.isArray(value)?value[0]:value&&typeof value==='object'&&'default' in value?value.default:value]));}
