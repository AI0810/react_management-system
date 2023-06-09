import React, { Component } from 'react'
import { Modal, Form, Row, Col, Input, Select, DatePicker,Radio,message} from 'antd';
import moment from 'moment';
import { addTeacher,editTeacher } from '../../api/teacher';
export default class AddModal extends Component {
    componentDidUpdate(){
        console.log(this.props)
    }
    handleOk = () => {
        this.formRef.validateFields().then(res=>{
            const {id} = this.props.record
            const birth=moment(res.birth).format('YYYY-MM-DD') //日期对象不能直接传给后端，需要转为字符串或时间戳
            const date = moment(res.date).format('YYYY-MM-DD')
            const fn = this.props.title=='新建教师'?addTeacher({...res,birth,date}):editTeacher({...res,birth,date,id})
            fn.then(data=>{
                if(data.code===0){
                    message.success(data.msg);
                    //隐藏弹窗
                    this.props.changeVisible(false);
                    //清空表单数据
                    this.formRef.resetFields();
                    //调用父组件方法刷新数据
                    this.props.reload()
                }
            })
        })
    }
    handleCancel = () => {
        this.props.changeVisible(false)
    }
    render() {
        const {visible,title} = this.props
        console.log(222,visible)
        return (
            <div>
                <Modal
                    title={title}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="800px"
                >
                    <Form
                        name='basic'
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        ref={a=>this.formRef=a}
                    >
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label='姓名'
                                    name='name'
                                    rules={[
                                            { required: true, message: '姓名不能为空' }
                                        ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label='性别'
                                    name='gender'
                                    rules={
                                        [
                                            { required: true, message: '性别不能为空' }
                                        ]
                                    }
                                >
                                    <Select
                                        options={[
                                            {
                                                value: 1,
                                                label: '男',
                                            },
                                            {
                                                value: 2,
                                                label: '女',
                                            },
                                        ]}
                                    >
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label='级别'
                                    name='level'
                                    rules={
                                        [
                                            { required: true, message: '级别不能为空' }
                                        ]
                                    }
                                >
                                    <Select
                                        options={[
                                            {
                                                value: 1,
                                                label: '初级教师',
                                            },
                                            {
                                                value: 2,
                                                label: '中级教师',
                                            },
                                            {
                                                value: 3,
                                                label: '高级教师',
                                            },
                                            {
                                                value: 4,
                                                label: '特级教师',
                                            },
                                        ]}
                                    >
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label='年级'
                                    name='grade'
                                    rules={
                                        [
                                            { required: true, message: '年级不能为空' }
                                        ]
                                    }
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label='科目'
                                    name='subject'
                                    rules={
                                        [
                                            { required: true, message: '科目不能为空' }
                                        ]
                                    }
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label='入职日期'
                                    name='date'
                                    rules={
                                        [
                                            { required: true, message: '入职日期不能为空' }
                                        ]
                                    }
                                >
                                    <DatePicker style={{width:'100%'}}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label='类型'
                                    name='type'
                                    rules={
                                        [
                                            { required: true, message: '类型不能为空' }
                                        ]
                                    }
                                >
                                    <Radio.Group>
                                        <Radio value='1'>全职</Radio>
                                        <Radio value='2'>兼职</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label='手机号码'
                                    name='tel'
                                    rules={
                                        [
                                            { required: true, message: '手机号码不能为空' }
                                        ]
                                    }
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label='毕业院校'
                                    name='school'
                                    rules={
                                        [
                                            { required: true, message: '毕业院校不能为空' }
                                        ]
                                    }
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label='出生年月'
                                    name='birth'
                                    rules={
                                        [
                                            { required: true, message: '出生年月不能为空' }
                                        ]
                                    }
                                >
                                    <DatePicker style={{width:'100%'}}/>
                                </Form.Item>
                                <Form.Item
                                    label='家庭住址'
                                    name='address'
                                    rules={
                                        [
                                            { required: true, message: '家庭住址不能为空' }
                                        ]
                                    }
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label='学历'
                                    name='education'
                                    rules={
                                        [
                                            { required: true, message: '学历不能为空' }
                                        ]
                                    }
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}
