import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function Dashboard() {
  return (
    <div>
      <Title style={{ paddingLeft: "1rem" }} level={2}>
        All Blog posts
      </Title>
      <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
        <Paragraph style={{ fontSize: "1.2rem" }}>
          Welcome to the Qatar Development Bank dashboard! Here you can view
          statistics, manage your blog posts, and more. <br />
          Since we are still in development mode, there is no data or charts
          available yet. <br />
        </Paragraph>
        <Paragraph style={{ fontSize: "1.2rem" }}>
          Until then we suggest you to{" "}
          <Link  style={{ marginTop: 20, textDecoration: 'underline' }} to="/blogs">
            go through the blogs list
          </Link>
        </Paragraph>
      </Content>
    </div>
  );
}
