import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100%;
  background: #c0c0c0;
`;

const Toolbar = styled.div`
  width: 40px;
  background: #c0c0c0;
  border-right: 2px solid;
  border-color: #808080 #ffffff #ffffff #808080;
  padding: 2px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ToolButton = styled.button<{ $selected?: boolean }>`
  width: 36px;
  height: 36px;
  background: ${props => props.$selected ? '#808080' : '#c0c0c0'};
  border: 2px solid;
  border-color: ${props => props.$selected 
    ? '#808080 #ffffff #ffffff #808080' 
    : '#ffffff #808080 #808080 #ffffff'};
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;

  &:active {
    border-color: #808080 #ffffff #ffffff #808080;
  }
`;

const Workspace = styled.div`
  flex: 1;
  display: flex;
`;

const FormDesigner = styled.div`
  flex: 1;
  background: white;
  border: 1px solid #808080;
  margin: 4px;
  position: relative;
`;

const PropertyPanel = styled.div`
  width: 200px;
  background: #c0c0c0;
  border-left: 2px solid;
  border-color: #808080 #ffffff #ffffff #808080;
  display: flex;
  flex-direction: column;
`;

const PropertyGrid = styled.div`
  flex: 1;
  margin: 4px;
  background: white;
  border: 1px solid #808080;
  overflow: auto;
`;

const PropertyRow = styled.div`
  display: flex;
  border-bottom: 1px solid #808080;
  font-size: 12px;
`;

const PropertyName = styled.div`
  width: 80px;
  padding: 2px 4px;
  background: #c0c0c0;
  border-right: 1px solid #808080;
`;

const PropertyValue = styled.input`
  flex: 1;
  padding: 2px 4px;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
`;

const ComponentPreview = styled.div<{ $selected?: boolean }>`
  position: absolute;
  padding: 4px;
  background: #c0c0c0;
  border: ${props => props.$selected ? '1px dashed black' : '1px solid #808080'};
  cursor: move;
  font-size: 12px;
  min-width: 80px;
  min-height: 24px;
  display: flex;
  align-items: center;

  &:hover {
    border: 1px dashed black;
  }
`;

const StatusBar = styled.div`
  height: 20px;
  background: #c0c0c0;
  border-top: 2px solid;
  border-color: #808080 #ffffff #ffffff #808080;
  padding: 2px 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

interface Win95UIGeneratorProps {
  onClose?: () => void;
}

export const Win95UIGenerator: React.FC<Win95UIGeneratorProps> = () => {
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [components, setComponents] = useState<Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    props: { name?: string; text?: string; width?: string; height?: string; }
  }>>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const tools = [
    { id: 'select', label: '↖️', tooltip: 'Pointer' },
    { id: 'label', label: 'A', tooltip: 'Label' },
    { id: 'button', label: '🔲', tooltip: 'Command Button' },
    { id: 'textbox', label: '📝', tooltip: 'Text Box' },
    { id: 'checkbox', label: '☐', tooltip: 'Check Box' },
    { id: 'radio', label: '○', tooltip: 'Option Button' },
    { id: 'combobox', label: '▼', tooltip: 'Combo Box' }
  ];

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedTool !== 'select' && e.target === e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setComponents([...components, {
        id: `${selectedTool}-${Date.now()}`,
        type: selectedTool,
        position: { x, y },
        props: { 
          name: `${selectedTool}1`,
          text: `${selectedTool}1`,
          width: '80',
          height: '24'
        }
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
            title={tool.tooltip}
          >
            {tool.label}
          </ToolButton>
        ))}
      </Toolbar>
      <Workspace>
        <FormDesigner onClick={handleFormClick}>
          {components.map(comp => (
            <ComponentPreview
              key={comp.id}
              $selected={selectedComponent === comp.id}
              style={{
                left: comp.position.x,
                top: comp.position.y,
                width: `${comp.props.width}px`,
                height: `${comp.props.height}px`
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent(comp.id);
              }}
            >
              {comp.props.text}
            </ComponentPreview>
          ))}
        </FormDesigner>
        <PropertyPanel>
          <PropertyGrid>
            {selectedComponent && (
              <>
                <PropertyRow>
                  <PropertyName>Name</PropertyName>
                  <PropertyValue
                    value={components.find(c => c.id === selectedComponent)?.props.name || ''}
                    onChange={(e) => {
                      setComponents(components.map(c => 
                        c.id === selectedComponent
                          ? { ...c, props: { ...c.props, name: e.target.value }}
                          : c
                      ));
                    }}
                  />
                </PropertyRow>
                <PropertyRow>
                  <PropertyName>Caption</PropertyName>
                  <PropertyValue
                    value={components.find(c => c.id === selectedComponent)?.props.text || ''}
                    onChange={(e) => {
                      setComponents(components.map(c => 
                        c.id === selectedComponent
                          ? { ...c, props: { ...c.props, text: e.target.value }}
                          : c
                      ));
                    }}
                  />
                </PropertyRow>
                <PropertyRow>
                  <PropertyName>Width</PropertyName>
                  <PropertyValue
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
                <PropertyRow>
                  <PropertyName>Height</PropertyName>
                  <PropertyValue
                    value={components.find(c => c.id === selectedComponent)?.props.height || ''}
                    onChange={(e) => {
                      setComponents(components.map(c => 
                        c.id === selectedComponent
                          ? { ...c, props: { ...c.props, height: e.target.value }}
                          : c
                      ));
                    }}
                  />
                </PropertyRow>
              </>
            )}
          </PropertyGrid>
          <StatusBar>
            {selectedComponent ? `Selected: ${components.find(c => c.id === selectedComponent)?.props.name}` : 'Ready'}
          </StatusBar>
        </PropertyPanel>
      </Workspace>
    </Container>
  );
}; 