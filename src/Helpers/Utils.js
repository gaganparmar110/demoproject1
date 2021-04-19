import React from "react"
import { Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const isEqualsArray = (arr1, arr2) => {
    if(!(arr1 instanceof Array ) || !(arr1 instanceof Array ))
        return false;
    
    if(arr1.length !== arr2.length)
        return false;

    if(arr1 instanceof Object && arr2 instanceof Object) {
        let isEqual = true, arrayLength = arr1.length;
        for (let index = 0; index < arrayLength && isEqual; index++) {
            if(JSON.stringify(arr1[index]) !== JSON.stringify(arr2[index]))
                isEqual = false;
        }

        return isEqual;
    }

    return false;
}

export function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function isIEBrowser() {
    // BROWSER CHECK VARIABLES
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');
    const msie11 = ua.indexOf('Trident/');
    // const msedge = ua.indexOf('Edge/');
    return msie > 0 || msie11 > 0;
    // const isEdge = msedge > 0;
}


export function getColumnSearchProps(dataIndex) {
    let searchInput = null;

    return ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => {
                        confirm();
                    }}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={confirm}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button 
                        onClick={clearFilters}
                        size="small" 
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: text => ( text )
    });
} 


export function setPaginationObject(currentPagination, pagination, filters, sorter, ) {
    let newPaginationInfo = {
        ...currentPagination,
        current: isEmpty(pagination) ? 1 : pagination.current,
    }

    if(filters) {
        newPaginationInfo.search = [];
        for (const key in filters) {
            if(filters[key]) {
                newPaginationInfo.search.push({
                    field : key,
                    value : filters[key][0]
                })
            }
        }
    }

    if (sorter.field) {
        newPaginationInfo.sort = {
            field: sorter.field,
            order: (sorter.order === 'ascend') ? 'asc' : 'desc'
        }
    }

    return newPaginationInfo
}