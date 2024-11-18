import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #aaaaaa;
`;

const Toolbar = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  background: #0055aa;
  border: 2px solid;
  border-color: #ffffff #000000 #000000 #ffffff;
`;

const ToolButton = styled.button<{ $selected?: boolean }>`
  padding: 4px 8px;
  background: ${props => props.$selected ? '#ff8a00' : '#aaaaaa'};
  border: 2px solid;
  border-color: #ffffff #000000 #000000 #ffffff;
  color: #000000;
  font-family: inherit;
  cursor: pointer;

  &:active {
    border-color: #000000 #ffffff #ffffff #000000;
  }
`;

const Workspace = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
  padding: 8px;
  background: #0055aa;
  position: relative;
`;

const IconDrawer = styled.div`
  width: 120px;
  background: #aaaaaa;
  border: 2px solid;
  border-color: #ffffff #000000 #000000 #ffffff;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const WorkArea = styled.div`
  flex: 1;
  background: #aaaaaa;
  border: 2px solid;
  border-color: #ffffff #000000 #000000 #ffffff;
  position: relative;
`;

const AmigaIcon = styled.div<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 4px;
  cursor: pointer;
  background: ${props => props.$selected ? '#0055aa' : 'transparent'};
  color: ${props => props.$selected ? '#ffffff' : '#000000'};

  &:hover {
    background: #0055aa;
    color: #ffffff;
  }
`;

const IconBox = styled.div`
  width: 32px;
  height: 32px;
  background: #ffffff;
  border: 1px solid #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const IconLabel = styled.div`
  font-size: 12px;
  text-align: center;
  word-break: break-word;
`;

const ComponentPreview = styled.div<{ $selected?: boolean }>`
  position: absolute;
  padding: 4px;
  background: #aaaaaa;
  border: ${props => props.$selected ? '2px solid #ff8a00' : '2px solid transparent'};
  cursor: move;

  &:hover {
    border: 2px solid #ff8a00;
  }
`;

interface AmigaUIGeneratorProps {
  onClose?: () => void;
}

export const AmigaUIGenerator: React.FC<AmigaUIGeneratorProps> = () => {
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [components, setComponents] = useState<Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    props: { label?: string; }
  }>>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const tools = [
    { id: 'select', label: 'Select', icon: '↖️' },
    { id: 'button', label: 'Button', icon: '🔲' },
    { id: 'input', label: 'Input', icon: '📝' },
    { id: 'checkbox', label: 'Check', icon: '☑️' },
    { id: 'radio', label: 'Radio', icon: '⭕' }
  ];

  const handleWorkAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedTool !== 'select' && e.target === e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setComponents([...components, {
        id: `${selectedTool}-${Date.now()}`,
        type: selectedTool,
        position: { x, y },
        props: { label: `New ${selectedTool}` }
      }]);
    }
  };

  return (
    <Container>
      <Toolbar>
        {tools.map(tool => (
          <ToolButton
            key={tool.id}
            $selected={selectedTool === tool.id}
            onClick={() => setSelectedTool(tool.id)}
          >
            {tool.icon}
          </ToolButton>
        ))}
      </Toolbar>
      <Workspace>
        <IconDrawer>
          {components.map(comp => (
            <AmigaIcon
              key={comp.id}
              $selected={selectedComponent === comp.id}
              onClick={() => setSelectedComponent(comp.id)}
            >
              <IconBox>{comp.type[0].toUpperCase()}</IconBox>
              <IconLabel>{comp.props.label}</IconLabel>
            </AmigaIcon>
          ))}
        </IconDrawer>
        <WorkArea onClick={handleWorkAreaClick}>
          {components.map(comp => (
            <ComponentPreview
              key={comp.id}
              $selected={selectedComponent === comp.id}
              style={{
                left: comp.position.x,
                top: comp.position.y
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent(comp.id);
              }}
            >
              {comp.props.label}
            </ComponentPreview>
          ))}
        </WorkArea>
      </Workspace>
    </Container>
  );
}; 