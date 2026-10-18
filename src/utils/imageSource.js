// Recipe pictures can be a web link (string) or a photo bundled in the app via require(...).
// A bundled photo is a number on phones and can be an object on web: pass those through unchanged.
export const imageSource = (img) => (typeof img === "string" ? { uri: img } : img);
