import { BellOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Input, Layout } from 'antd';
import styled from 'styled-components';

const { Header } = Layout;

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AppHeader = ({ onSearch }: { onSearch?: (value: string) => void }) => {
  return (
    <StyledHeader>
      <Input.Search
        placeholder="Search posts"
        onSearch={onSearch}
        allowClear
        style={{ maxWidth: 400 }}
      />

      <HeaderRight>
        <Badge count={3}>
          <BellOutlined style={{ fontSize: '18px' }} />
        </Badge>
        <SettingOutlined style={{ fontSize: '18px' }} />
        <Avatar icon={<UserOutlined />} />
      </HeaderRight>
    </StyledHeader>
  );
};

export default AppHeader;
