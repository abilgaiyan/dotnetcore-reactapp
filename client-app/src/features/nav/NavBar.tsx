import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

interface IProps {
  openCreateForm: () => void;
}

export const NavBar: React.FC<IProps> = props => {
  const { openCreateForm } = props;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: '10px' }}
          />
          My Activities
        </Menu.Item>
        <Menu.Item name="activities" />
        <Menu.Item>
          <Button
            onClick={() => openCreateForm()}
            positive
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
