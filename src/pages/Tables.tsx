import { Spin, Alert, Card, Row, Col } from "antd";
import { useTables } from "../hooks/useTables";
import { TableStatus } from "../enums/table";

export default function Tables() {
    const { data: tables, isLoading, error } = useTables();
    
    const statusToColor = {
        [TableStatus.AVAILABLE]: 'green',
        [TableStatus.READY_TO_ORDER]:'blue',
        [TableStatus.OCCUPIED]:"red",
        [TableStatus.RESERVED]: 'gold',
        [TableStatus.CLOSED]: 'gray'
    }

    if (isLoading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
    if (error) return <Alert title="Hata" description="Masalar yüklenemedi" type="error" />;

    return (
        <Row gutter={[16, 16]} style={{width:'100%', padding:'25px'}}>
            {tables?.map((table) => (
                <Col key={table.id} span={6}>
                    <Card style={{backgroundColor:statusToColor[table.status]}}>
                        
                    </Card>
                </Col>
            ))}
        </Row>
    );
}