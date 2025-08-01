const NotFound = () => (
    <div
        style={{
            minHeight: "100vh",
            background: "#181A20",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
        }}
    >
        <h1 style={{ fontSize: "5rem", margin: 0 }}>404</h1>
        <h2 style={{ margin: "1rem 0" }}>Page Not Found</h2>
        <p style={{ color: "#aaa" }}>
            Sorry, the page you are looking for does not exist.
        </p>
    </div>
);

export default NotFound;