import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ToolPalette = styled.div`
  position: absolute;
  top: 40px;
  left: 20px;
  background: white;
  border: 1px solid black;
  border-radius: 8px 8px 0 0;
  width: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ToolButton = styled.button<{ $selected?: boolean }>`
  width: 100%;
  height: 32px;
  background: ${props => props.$selected ? 'black' : 'white'};
  color: ${props => props.$selected ? 'white' : 'black'};
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;

  &:hover {
    background: ${props => props.$selected ? 'black' : '#e0e0e0'};
  }
`;

const PropertiesWindow = styled.div`
  position: absolute;
  top: 40px;
  right: 20px;
  background: white;
  border: 1px solid black;
  border-radius: 8px 8px 0 0;
  width: 200px;
`;

const PropertiesTitle = styled.div`
  height: 20px;
  background: linear-gradient(90deg, black 50%, white 50%);
  background-size: 2px 2px;
  border-radius: 8px 8px 0 0;
  color: white;
  font-size: 12px;
  padding: 2px 8px;
  display: flex;
  align-items: center;
`;

const PropertiesContent = styled.div`
  padding: 8px;
`;

const PropertyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 12px;
`;

const PropertyLabel = styled.label`
  width: 60px;
`;

const PropertyInput = styled.input`
  flex: 1;
  border: 1px solid black;
  padding: 2px 4px;
  font-family: inherit;
  font-size: 12px;
`;

const Canvas = styled.div`
  flex: 1;
  background: white;
  border: 1px solid black;
  margin: 0 100px;
  position: relative;
`;

const ComponentPreview = styled.div<{ $selected?: boolean }>`
  position: absolute;
  padding: 4px;
  border: ${props => props.$selected ? '1px dashed black' : 'none'};
  cursor: move;

  &:hover {
    border: 1px dashed black;
  }
`;

interface MacUIGeneratorProps {
  onClose?: () => void;
}

export const MacUIGenerator: React.FC<MacUIGeneratorProps> = () => {
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [components, setComponents] = useState<Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    props: { label?: string; width?: string; height?: string; }
  }>>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const tools = [
    { id: 'select', label: 'Select' },
    { id: 'button', label: 'Button' },
    { id: 'textfield', label: 'TextField' },
    { id: 'checkbox', label: 'Checkbox' },
    { id: 'radio', label: 'Radio' }
  ];

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
      <ToolPalette>
        {tools.map(tool => (
          <ToolButton
            key={tool.id}
            $selected={selectedTool === tool.id}
            onClick={() => setSelectedTool(tool.id)}
          >
            {tool.label}
          </ToolButton>
        ))}
      </ToolPalette>

      <Canvas onClick={handleCanvasClick}>
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
      </Canvas>

      {selectedComponent && (
        <PropertiesWindow>
          <PropertiesTitle>Properties</PropertiesTitle>
          <PropertiesContent>
            <PropertyRow>
              <PropertyLabel>Label:</PropertyLabel>
              <PropertyInput
                value={components.find(c => c.id === selectedComponent)?.props.label || ''}
                onChange={(e) => {
                  setComponents(components.map(c => 
                    c.id === selectedComponent
                      ? { ...c, props: { ...c.props, label: e.target.value }}
                      : c
                  ));
                }}
              />
            </PropertyRow>
            <PropertyRow>
              <PropertyLabel>Width:</PropertyLabel>
              <PropertyInput
                value={components.find(c => c.id === selectedComponent)?.props.width || ''}
                onChange={(e) => {
                  setComponents(components.map(c => 
                    c.id === selectedComponent
                      ? { ...c, props: { ...c.props, width: e.target.value }}
                      : c
                  ));
                }}
              />
            </PropertyRow>
          </PropertiesContent>
        </PropertiesWindow>
      )}
    </Container>
  );
}; 