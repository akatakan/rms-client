import { Spin, Alert, Card, Row, Col,Tag, Button } from "antd";
import {
    FormOutlined,
    CalendarOutlined,
    StopOutlined,
    CheckOutlined,
    TeamOutlined,
    ExclamationCircleFilled,
    ClockCircleOutlined,
    PlusOutlined,
    BarsOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import { useTables } from "../hooks/useTables";
import { TableStatus } from "../enums/table";
import styles from '../styles/Tables.module.css'
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { tableService } from "../services/tableService";


const statusConfig = {
    [TableStatus.AVAILABLE]: {
        color: '#52c41a',
        bgColor: 'rgba(82, 196, 26, 0.1)',
        icon: <CheckOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
        label: 'Boş',
        bottomStatusIcon: <CheckOutlined style={{fontSize:'24px',color: '#52c41a',marginRight:'5px'}}/>,
        description: 'Müşteri alabilir.',
        actionPath: {
            action: async (id:string,status: string)=>{
                await tableService.updateStatus(id,status);
            },
            label:'Durum Değiş',
            icon: <ReloadOutlined/>
        }
    },
    [TableStatus.READY_TO_ORDER]: {
        color: '#faad14',
        bgColor: 'rgba(250, 173, 20, 0.1)',
        icon: <FormOutlined style={{ fontSize: '24px', color: '#faad14' }} />, 
        label: 'Sipariş Alınacak',
        bottomStatusIcon: <ExclamationCircleFilled style={{fontSize:'24px',color: '#faad14',marginRight:'5px'}}/>,
        description: 'Müşteri bekliyor, yönlenin.',
        actionPath: {
            action: async (id:string,status: string)=>{
                await tableService.updateStatus(id,status);
            },
            label:'Durum Değiş',
            icon: <ReloadOutlined/>
        }
    },
    [TableStatus.OCCUPIED]: {
        color: '#f5222d',
        bgColor: 'rgba(245, 34, 45, 0.1)',
        icon: <TeamOutlined style={{ fontSize: '24px', color: '#f5222d' }} />,
        label: 'Dolu',
        bottomStatusIcon: <ClockCircleOutlined style={{fontSize:'24px',color: '#f5222d',marginRight:'5px'}}/>,
        description: 'Sipariş verildi, servis sürüyor.',
        actionPath: {
            action: async (id:string,status: string)=>{
                await tableService.updateStatus(id,status);
            },
            label:'Durum Değiş',
            icon: <ReloadOutlined/>
        }
    },
    [TableStatus.RESERVED]: {
        color: '#1890ff',
        bgColor: 'rgba(24, 144, 255, 0.1)',
        icon: <CalendarOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
        label: 'Rezerve',
        bottomStatusIcon: <CalendarOutlined style={{fontSize:'24px',color: '#1890ff',marginRight:'5px'}}/>,
        description: 'Yakında gelecek.',
        actionPath: {
            action: async (id:string,status: string)=>{
                await tableService.updateStatus(id,status);
            },
            label:'Durum Değiş',
            icon: <ReloadOutlined/>
        }
    },
    [TableStatus.CLOSED]: {
        color: '#8c8c8c',
        bgColor: 'rgba(140, 140, 140, 0.1)',
        icon: <StopOutlined style={{ fontSize: '24px', color: '#8c8c8c' }} />,
        label: 'Kapalı',
        bottomStatusIcon: <StopOutlined style={{fontSize:'24px',color: '#8c8c8c',marginRight:'5px'}}/>,
        description: 'Kullanım dışı.',
        actionPath: {
            action: async(id:string,status: string)=>{
                await tableService.updateStatus(id,status);
            },
            label:'Aktif Et',
            icon: <PlusOutlined/>
        }
    }
};

export default function Tables() {
    const { data: tables, isLoading, error } = useTables();
    const {isDark} = useTheme();

    if (isLoading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
    if (error) return <Alert title="Hata" description="Masalar yüklenemedi" type="error" style={{ margin: '25px' }} />;

    return (
        <Row gutter={[16, 16]} style={{ width: '100%', padding: '25px'}}>
            {tables?.map((table) => {
                const config = statusConfig[table.status] || statusConfig[TableStatus.CLOSED]
                return (
                    <Col key={table.id} xs={24} sm={12} md={8} lg={6} xl={6} style={{display:"flex"}}>
                        <Card
                            hoverable
                            variant='outlined'
                            className={styles.tableCards}
                            style={{borderColor:config.color,backgroundColor:isDark ? "rgba(255, 255, 255, 0.1)":'#fff'}}
                        >
                            <Tag className={styles.statusTag} style={{backgroundColor:config.bgColor,color:config.color}}>{config.label}</Tag>
                            <div className={styles.cardContent}>
                                <div className={styles.iconBg} style={{backgroundColor:config.bgColor}}>
                                    {config.icon}
                                </div>
                                <div>
                                    <Title level={4}>{`${table.location.location} - ${table.table_number}`}</Title>
                                    <Paragraph><TeamOutlined style={{marginRight:4}}/>{`${table.capacity} Kişilik`}</Paragraph>
                                </div>
                                
                            </div>
                            <div style={{backgroundColor:config.bgColor}} className={styles.bottomBar}>
                                {config.bottomStatusIcon}
                                <Paragraph style={{margin:0,color:config.color,fontWeight:500}}>
                                    {config.description}   
                                </Paragraph>
                            </div>
                            <div style={{display:'flex',justifyContent:'space-evenly',height:50}}>
                                <Button onClick={config.actionPath.action(table.id,TableStatus.CLOSED)} type="text" style={{width:'100%',height:'100%'}} icon={config.actionPath.icon}>{config.actionPath.label}</Button>
                                <Button onClick={config.actionPath.action(table.id,TableStatus.AVAILABLE)} type="text" style={{width:'100%',height:'100%'}}><BarsOutlined/>Detay</Button>
                            </div>
                        </Card>
                    </Col>
                )
            })
            }
        </Row>
    );
}