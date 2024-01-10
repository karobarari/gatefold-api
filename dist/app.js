"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const api_router_1 = __importDefault(require("./api/routes/api.router"));
const review_router_1 = __importDefault(require("./api/routes/review.router"));
const login_router_1 = __importDefault(require("./api/routes/login.router"));
const music_router_1 = __importDefault(require("./api/routes/music.router"));
const auth_router_1 = __importDefault(require("./api/routes/auth.router"));
const errors_1 = require("./errors");
const serverless_http_1 = __importDefault(require("serverless-http"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", api_router_1.default);
app.use("/api/music", music_router_1.default);
app.use("/api/reviews", review_router_1.default);
app.use("/api/login", login_router_1.default); //spotify login
app.use("/api/auth", auth_router_1.default); //user auth (omg we're so good at variable names)
app.all("*", errors_1.handle404);
app.use(errors_1.handlePsqlErrors);
app.use(errors_1.handleCustomError);
app.use(errors_1.handleServerErrors);
exports.handler = (0, serverless_http_1.default)(app);
exports.default = app;
