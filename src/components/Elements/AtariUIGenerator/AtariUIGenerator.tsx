import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100%;
  background: white;
`;

const Sidebar = styled.div`
  width: 200px;
  background: white;
  border-right: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const ToolSection = styled.div`
  border-bottom: 1px solid black;
  padding: 8px;
`;

const SectionTitle = styled.div`
  background: black;
  color: white;
  padding: 4px;
  margin-bottom: 8px;
  font-size: 12px;
`;

const ToolButton = styled.button<{ $selected?: boolean }>`
  width: 100%;
  padding: 4px;
  margin: 2px 0;
  background: ${props => props.$selected ? 'black' : 'white'};
  color: ${props => props.$selected ? 'white' : 'black'};
  border: 1px solid black;
  cursor: pointer;
  text-align: left;
  font-size: 12px;

  &:hover {
    background: ${props => props.$selected ? 'black' : '#e0e0e0'};
  }
`;

const WorkArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Toolbar = styled.div`
  height: 32px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 8px;
`;

const ToolbarButton = styled.button`
  padding: 4px 8px;
  background: white;
  border: 1px solid black;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: #e0e0e0;
  }

  &:active {
    background: black;
    color: white;
  }
`;

const Canvas = styled.div`
  flex: 1;
  position: relative;
  padding: 16px;
  overflow: auto;
`;

const ComponentPreview = styled.div<{ $selected?: boolean }>`
  position: absolute;
  padding: 4px;
  background: white;
  border: ${props => props.$selected ? '2px solid black' : '1px solid black'};
  min-width: 80px;
  min-height: 24px;
  cursor: move;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 2px solid black;
  }
`;

const Dialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 1px solid black;
  padding: 16px;
  min-width: 300px;
`;

const DialogTitle = styled.div`
  background: black;
  color: white;
  padding: 4px;
  margin: -16px -16px 16px -16px;
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Label = styled.label`
  width: 80px;
  font-size: 12px;
`;

const Input = styled.input`
  flex: 1;
  padding: 4px;
  border: 1px solid black;
  font-size: 12px;
`;

const DialogButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;

const AtariText = styled.div<{ $inverted?: boolean }>`
  background: ${props => props.$inverted ? 'black' : 'white'};
  color: ${props => props.$inverted ? 'white' : 'black'};
  padding: 2px 4px;
  font-family: inherit;
  border: none;
  outline: none;
  width: 100%;
`;

const AtariInput = styled.input`
  background: white;
  color: black;
  border: 1px solid black;
  padding: 4px;
  font-family: inherit;
  font-size: 12px;
  outline: none;

  &:focus {
    background: black;
    color: white;
  }
`;

interface AtariUIGeneratorProps {
  onClose?: () => void;
}

export const AtariUIGenerator: React.FC<AtariUIGeneratorProps> = () => {
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [components, setComponents] = useState<Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    props: { label?: string; width?: string; height?: string; }
  }>>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const tools = [
    { id: 'select', label: 'Select' },
    { id: 'button', label: 'Button' },
    { id: 'text', label: 'Text' },
    { id: 'input', label: 'Input Field' },
    { id: 'checkbox', label: 'Check Box' },
    { id: 'radio', label: 'Radio Button' },
    { id: 'list', label: 'List Box' }
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
        props: { 
          label: `New ${selectedTool}`,
          width: '100',
          height: '24'
        }
      }]);
    }
  };

  return (
    <Container>
      <Sidebar>
        <ToolSection>
          <SectionTitle>Tools</SectionTitle>
          {tools.map(tool => (
            <ToolButton
              key={tool.id}
              $selected={selectedTool === tool.id}
              onClick={() => setSelectedTool(tool.id)}
            >
              {tool.label}
            </ToolButton>
          ))}
        </ToolSection>
        <ToolSection>
          <SectionTitle>Properties</SectionTitle>
          {selectedComponent && (
            <>
              <FormRow>
                <Label>Label:</Label>
                <AtariInput
                  value={components.find(c => c.id === selectedComponent)?.props.label || ''}
                  onChange={(e) => {
                    setComponents(components.map(c => 
                      c.id === selectedComponent
                        ? { ...c, props: { ...c.props, label: e.target.value }}
                        : c
                    ));
                  }}
                />
              </FormRow>
              <FormRow>
                <Label>Width:</Label>
                <Input
                  value={components.find(c => c.id === selectedComponent)?.props.width || ''}
                  onChange={(e) => {
                    setComponents(components.map(c => 
                      c.id === selectedComponent
                        ? { ...c, props: { ...c.props, width: e.target.value }}
                        : c
                    ));
                  }}
                />
              </FormRow>
            </>
          )}
        </ToolSection>
      </Sidebar>
      <WorkArea>
        <Toolbar>
          <ToolbarButton onClick={() => setShowDialog(true)}>New</ToolbarButton>
          <ToolbarButton>Save</ToolbarButton>
          <ToolbarButton>Load</ToolbarButton>
          <ToolbarButton>Export</ToolbarButton>
        </Toolbar>
        <Canvas onClick={handleCanvasClick}>
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
              {comp.props.label}
            </ComponentPreview>
          ))}
        </Canvas>
      </WorkArea>
      {showDialog && (
        <Dialog>
          <DialogTitle>New Form</DialogTitle>
          <DialogContent>
            <FormRow>
              <Label>Name:</Label>
              <Input placeholder="Enter form name" />
            </FormRow>
            <FormRow>
              <Label>Size:</Label>
              <Input placeholder="Width" style={{ width: 80 }} />
              <span>×</span>
              <Input placeholder="Height" style={{ width: 80 }} />
            </FormRow>
            <DialogButtons>
              <ToolbarButton onClick={() => setShowDialog(false)}>Cancel</ToolbarButton>
              <ToolbarButton>OK</ToolbarButton>
            </DialogButtons>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
}; 