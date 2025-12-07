import { Button, Card, Form, Input, Layout, message, type FormProps } from "antd";
import styles from "../styles/Login.module.css"
import { LockOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useState } from "react";

type FieldType = {
    username?: string;
    password?: string;
}


export default function Login(){
    const [loading, setLoading] = useState(false);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            setLoading(true);
        } catch (error) {
            console.error('Login failed:', error);
            message.error('Invalid username or password');
        } finally {
            setLoading(false);
        }
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
                    <Input
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