module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // or babel-jest if you use Babel
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
