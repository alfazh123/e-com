import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("/login", "routes/auth/login.tsx"),
	route("/register", "routes/auth/register.tsx"),
	route("/products", "routes/products.tsx"),
	route("/products/:id", "routes/product-detail.tsx"),
	route("/payment-method/:id", "routes/payment-method.tsx"),
	route("/history", "routes/history.tsx"),
	route("/profile", "routes/profile.tsx"),
] satisfies RouteConfig;
