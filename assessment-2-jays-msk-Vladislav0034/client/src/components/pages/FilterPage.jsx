import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function FilterPage() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    axios.get('/api/filter')  // Замените этот URL на ваш реальный эндпоинт
      .then(response => {
        setTasks(response.data);
        setFilteredTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the task data!', error);
      });
  }, []);

  const filterTasksByStatus = (status) => {
    setSelectedStatus(status);
    if (status === '') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task => task.status === status);
      setFilteredTasks(filtered);
    }
  };

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-center my-3">
        <Button variant="outline-secondary" onClick={() => filterTasksByStatus('не начато')} className="mx-2">
          Не начато
        </Button>
        <Button variant="outline-secondary" onClick={() => filterTasksByStatus('в процессе')} className="mx-2">
          В процессе
        </Button>
        <Button variant="outline-secondary" onClick={() => filterTasksByStatus('Выполнено')} className="mx-2">
          Выполнено
        </Button>
        <Button variant="outline-secondary" onClick={() => filterTasksByStatus('')} className="mx-2">
          Все задачи
        </Button>
      </div>
      <Row>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Col md={4} className="mt-2" key={task.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{task.name}</Card.Title>
                  <Card.Text>{task.description}</Card.Text>
                  <Card.Text><strong>Статус:</strong> {task.status}</Card.Text>
                  <Card.Text><strong>Сроки выполнения:</strong> {task.deadlines}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">Нет задач с выбранным статусом.</p>
        )}
      </Row>
    </div>
  )
}
