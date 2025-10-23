import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, type FormProps, Input } from 'antd';
import type { FC } from 'react';
import { useNavigate } from 'react-router';

import { login } from '@/services/api/auth.ts';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setAuth, setAccountInfo } from '@/stores/reducer/authSlice.ts';

const LoginView: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const initialValues = useAppSelector(state => state.authStore.accountInfo);

    const onFinish: FormProps<LoginDto>['onFinish'] = form => {
        void login(form).then(res => {
            dispatch(
                setAuth({
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                    expiresAt: res.data.expiresAt
                })
            );
            dispatch(
                setAccountInfo({
                    account: form.account,
                    password: form.password
                })
            );
            void navigate('/');
        });
    };

    return (
        <Flex className="size-full" justify="center" align="center">
            <div className="flex h-1/3 w-1/5 items-center justify-center rounded-xl p-6 shadow-[0_4px_16px_rgba(72,144,255,0.12)]">
                <Form initialValues={initialValues} style={{ maxWidth: 360 }} onFinish={onFinish}>
                    <Form.Item<LoginDto> name="account" rules={[{ required: true, message: '请输入账号!' }]}>
                        <Input prefix={<UserOutlined />} placeholder="账号" />
                    </Form.Item>
                    <Form.Item<LoginDto> name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Flex>
    );
};

export default LoginView;
