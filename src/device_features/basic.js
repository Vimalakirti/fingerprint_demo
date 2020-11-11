export function getDevicePixelRatio() {
  return window.devicePixelRatio;
}

export function getUserAgent() {
  return navigator.userAgent;
}

export function getPlatform() {
  return navigator.platform;
}

export function getPlugins() {
  return Array.from(navigator.plugins)
    .map((plugin) => `${plugin.name} - ${plugin.filename}`)
    .join(", ");
}

export async function getHeaders() {
  let response = await fetch("https://httpbin.org/headers");
  let { headers } = await response.json();
  return ["Accept", "Accept-Encoding", "User-Agent"]
    .map((key) => `${key}: ${headers[key]}`)
    .join("\n");
}

export async function getIP() {
  let response = await fetch("https://httpbin.org/ip");
  let { origin } = await response.json();
  return origin;
}

export async function getLocation() {
  let ip = await getIP();
  let response = await fetch("http://ip-api.com/json/"+ip);
  return response
}

export function getDateFormat() {
  return new Date(0).toString();
}

export function getFonts() {
  let fonts = [
    "-apple-system",
    "BlinkMacSystemFont",
    "Cantarell",
    "Consolas",
    "Courier New",
    "Droid Sans",
    "Fira Sans",
    "Helvetica Neue",
    "Menlo",
    "Monaco",
    "Oxygen",
    "Roboto",
    "source-code-pro",
    "Segoe UI",
    "Ubuntu",
  ];
  return fonts
    .filter((font) => document.fonts.check(`12px "${font}"`))
    .join(", ");
}
