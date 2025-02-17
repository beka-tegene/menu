"use client";

import React, { useState } from "react";
import { Button, Form, Input, Select, Tree } from "antd";
import type { DataNode } from "antd/es/tree";
import { DownOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

const initialTreeData: DataNode[] = [
  {
    title: "Parent 1",
    key: "0-0",
    children: [
      {
        title: "Child 1",
        key: "0-0-0",
        children: [
          { title: "Leaf 1", key: "0-0-0-0" },
          { title: "Leaf 2", key: "0-0-0-1" },
        ],
      },
      {
        title: "Child 2",
        key: "0-0-1",
        children: [{ title: "Leaf 3", key: "0-0-1-0" }],
      },
    ],
  },
];

const getAllKeys = (nodes: DataNode[]): React.Key[] => {
  return nodes.flatMap((node) => [
    node.key,
    ...(node.children ? getAllKeys(node.children) : []),
  ]);
};

const findNodeByKey = (nodes: DataNode[], key: React.Key): DataNode | null => {
  for (const node of nodes) {
    if (node.key === key) return node;
    if (node.children) {
      const found = findNodeByKey(node.children, key);
      if (found) return found;
    }
  }
  return null;
};

const Page: React.FC = () => {
  const [treeData, setTreeData] = useState<DataNode[]>(initialTreeData);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm();

  const handleSelect = (keys: React.Key[]) => {
    setSelectedKeys(keys);
    const selectedNode = keys.length ? findNodeByKey(treeData, keys[0]) : null;
    setExpandedKeys([selectedNode?.key!])
    form.setFieldsValue({
      menuId: selectedNode?.key || "",
      parentData: selectedNode?.title?.toString() || "",
      depth: selectedNode
        ? selectedNode.key.toString().split("-").length - 1
        : "",
      name: selectedNode?.title?.toString() || "",
    });
  };

  const handleAddChild = () => {
    if (!selectedKeys.length) return;

    const newKey = `${selectedKeys[0]}-${Date.now()}`;
    const newNode: DataNode = { title: "New Child", key: newKey };

    const updateTree = (nodes: DataNode[]): DataNode[] =>
      nodes.map((node) => {
        if (node.key === selectedKeys[0]) {
          return {
            ...node,
            children: node.children ? [...node.children, newNode] : [newNode],
          };
        }
        return {
          ...node,
          children: node.children ? updateTree(node.children) : [],
        };
      });

    setTreeData(updateTree(treeData));
    setExpandedKeys([...expandedKeys, selectedKeys[0]]);
  };

  return (
    <div className="p-6">
      {/* Dropdown Selection */}
      <label className="text-gray-700 font-medium">Menu</label>
      <Select
        placeholder="Select a folder"
        className="w-full mb-2"
        showSearch
        allowClear
        options={getAllKeys(treeData).map((key) => ({
          label: key.toString(),
          value: key,
        }))}
        onChange={(value) => handleSelect(value ? [value] : [])}
      />

      {/* Expand/Collapse Buttons */}
      <div className="mb-2 flex gap-2">
        <Button
          type="primary"
          onClick={() => setExpandedKeys(getAllKeys(treeData))}
        >
          Expand All
        </Button>
        <Button onClick={() => setExpandedKeys([])}>Collapse All</Button>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {/* Folder Tree */}
        <div className="p-2">
          <Tree
            treeData={treeData.map((node) => ({
              ...node,
              title: (
                <div className="flex justify-between items-center">
                   <span>{String(node.title)}</span>
                  {selectedKeys.includes(node.key) && (
                    <EditOutlined
                      className="text-blue-500 cursor-pointer ml-2"
                      onClick={() => form.setFieldsValue({ name: node.title })}
                    />
                  )}
                </div>
              ),
            }))}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            onExpand={setExpandedKeys}
            onSelect={handleSelect}
            showLine
            switcherIcon={<DownOutlined />}
          />
        </div>

        {/* Form */}
        <div>
          <Form layout="vertical" className="space-y-2" form={form}>
            <Form.Item label="Menu ID" name="menuId">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Depth" name="depth">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Parent Data" name="parentData">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Name" name="name">
              <Input placeholder="Enter Name" />
            </Form.Item>

            <div className="flex gap-2">
              <Button
                type="default"
                onClick={handleAddChild}
                className="w-full"
                color="blue"
              >
                Save
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
