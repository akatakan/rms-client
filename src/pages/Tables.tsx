import { Spin, Alert, Card, Row, Col, Badge } from "antd";
import { useTables, useUpdateTableStatus } from "../hooks/useTables";

export default function Tables() {
    const { data: tables, isLoading, error } = useTables();
    
    const updateStatusMutation = useUpdateTableStatus();

    if (isLoading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
    if (error) return <Alert title="Hata" description="Masalar yüklenemedi" type="error" />;

    return (
        <Row gutter={[16, 16]}>
            {tables?.map((table) => (
                <Col key={table.id} span={6}>
                    <Badge.Ribbon text={table.status} color={table.status === 'AVAILABLE' ? 'green' : 'red'}>
                        <Card 
                            title={table.table_number}
                            hoverable
                            onClick={() => {
                                updateStatusMutation.mutate({ 
                                    id: table.id, 
                                    status: 'OCCUPIED' 
                                });
                            }}
                        >
                            Kapasite: {table.capacity}
                        </Card>
                    </Badge.Ribbon>
                </Col>
            ))}
        </Row>
    );
}