import { Spin, Alert, Card, Row, Col, Space, Tag } from "antd";
import {
    FormOutlined,
    CalendarOutlined,
    StopOutlined,
    CheckOutlined,
    TeamOutlined,
    ExclamationCircleFilled,
    ClockCircleOutlined,
} from '@ant-design/icons';
import { useTables } from "../hooks/useTables";
import { TableStatus } from "../enums/table";
import styles from '../styles/Tables.module.css'
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";


const statusConfig = {
    [TableStatus.AVAILABLE]: {
        color: '#52c41a',
        bgColor: 'rgba(82, 196, 26, 0.1)',
        icon: <CheckOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
        label: 'Boş',
        bottomStatusIcon: <CheckOutlined style={{fontSize:'24px',color: '#52c41a',marginRight:'5px'}}/>,
        description: 'Müşteri alabilir.'
    },
    [TableStatus.READY_TO_ORDER]: {
        color: '#faad14',
        bgColor: 'rgba(250, 173, 20, 0.1)',
        icon: <FormOutlined style={{ fontSize: '24px', color: '#faad14' }} />, 
        label: 'Sipariş Alınacak',
        bottomStatusIcon: <ExclamationCircleFilled style={{fontSize:'24px',color: '#faad14',marginRight:'5px'}}/>,
        description: 'Müşteri bekliyor, yönlenin.' 
    },
    [TableStatus.OCCUPIED]: {
        color: '#f5222d',
        bgColor: 'rgba(245, 34, 45, 0.1)',
        icon: <TeamOutlined style={{ fontSize: '24px', color: '#f5222d' }} />,
        label: 'Dolu',
        bottomStatusIcon: <ClockCircleOutlined style={{fontSize:'24px',color: '#f5222d',marginRight:'5px'}}/>,
        description: 'Sipariş verildi, servis sürüyor.' 
    },
    [TableStatus.RESERVED]: {
        color: '#1890ff',
        bgColor: 'rgba(24, 144, 255, 0.1)',
        icon: <CalendarOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
        label: 'Rezerve',
        bottomStatusIcon: <CalendarOutlined style={{fontSize:'24px',color: '#1890ff',marginRight:'5px'}}/>,
        description: 'Yakında gelecek.'
    },
    [TableStatus.CLOSED]: {
        color: '#8c8c8c',
        bgColor: 'rgba(140, 140, 140, 0.1)',
        icon: <StopOutlined style={{ fontSize: '24px', color: '#8c8c8c' }} />,
        label: 'Kapalı',
        bottomStatusIcon: <StopOutlined style={{fontSize:'24px',color: '#8c8c8c',marginRight:'5px'}}/>,
        description: 'Kullanım dışı.'
    }
};

export default function Tables() {
    const { data: tables, isLoading, error } = useTables();

    if (isLoading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
    if (error) return <Alert title="Hata" description="Masalar yüklenemedi" type="error" style={{ margin: '25px' }} />;

    return (
        <Row gutter={[16, 16]} style={{ width: '100%', padding: '25px'}}>
            {tables?.map((table) => {
                const config = statusConfig[table.status] || statusConfig[TableStatus.CLOSED]
                return (
                    <Col key={table.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Card
                            hoverable
                            variant='outlined'
                            className={styles.tableCards}
                            style={{borderColor:config.color}}
                        >
                            <Space orientation="horizontal" size='middle' style={{width:'100%',marginLeft:'10px'}}>
                                <div className={styles.iconBg} style={{backgroundColor:config.bgColor}}>
                                    {config.icon}
                                </div>
                                <div>
                                    <Title level={4}>{`${table.location.location} Masa - ${table.table_number}`}</Title>
                                    <Paragraph ellipsis={{
                                    }}><TeamOutlined/>{` ${table.capacity} Kişilik`}</Paragraph>
                                </div>
                                <Tag style={{backgroundColor:config.bgColor,color:config.color}}>{config.label}</Tag>
                            </Space>
                            <div style={{backgroundColor:config.bgColor}} className={styles.bottomBar}>
                                {config.bottomStatusIcon}
                                <Paragraph style={{margin:0,color:config.color}}>
                                    {config.description}   
                                </Paragraph>
                            </div>
                        </Card>
                    </Col>
                )
            })
            }
        </Row>
    );
}