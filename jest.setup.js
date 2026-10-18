// In-memory AsyncStorage for tests (official mock shipped with the package)
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Reanimated has no native animation engine under Jest: use its official mock
jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));
