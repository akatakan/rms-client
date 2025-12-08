import { Button, Card, Form, Input, Layout, message, type FormProps } from "antd";
import styles from "../styles/Login.module.css"
import { LockOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type FieldType = {
    username?: string;
    password?: string;
}


export default function Login(){
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            setLoading(true);
            await login(values.username!,values.password!);
            message.success('Giriş Başarılı');
            navigate("/tables")
        } catch (error) {
            console.error('Login failed:', error);
            message.error('Kullanıcı adı veya şifre yanlış');
        } finally {
            setLoading(false);
        }
    }

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) =>{
        console.log("Failed:", errorInfo)
    }
    return (
        <Layout className={styles.layout}>
            <div className={styles.overlay}/>
            <Card className={styles.loginCard} variant="outlined">
                <div style={{textAlign:'center'}}>
                    <div className={styles.logo}>
                    <ShopOutlined className={styles.logoIcon}/>
                    </div>
                    <Title level={2}>Giriş Ekranı</Title>
                </div>
                <Form
                    name="login"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    size="large"
                >
                    <Form.Item<FieldType>
                        name="username"
                        rules={[{required:true,message:'Lütfen Kullanıcı adını giriniz!'}]}
                    >
                    <Input
                        prefix={<UserOutlined/>}
                        placeholder="Kullanıcı Adı"
                        style={{borderRadius: '8px'}}
                    />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name="password"
                        rules={[{required:true,message:'Lütfen Şifre adını giriniz!'}]}
                    >
                    <Input.Password
                        prefix={<LockOutlined/>}
                        placeholder="Password"
                        style={{borderRadius: '8px'}}
                    />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                            className={styles.btn}
                        >Giriş Yap</Button>
                    </Form.Item>
                </Form>
            </Card>
        </Layout>
    )
}