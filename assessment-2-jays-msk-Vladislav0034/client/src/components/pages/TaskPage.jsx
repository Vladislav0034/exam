import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import AppModal from '../ui/AppModal';
import axiosInstance from '../api/axiosInstance';
import CardsWrapper from '../ui/CardsWrapper';
import TaskForm from '../ui/TaskForm';

export default function TaskPage({ user }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axiosInstance.get('/').then((res) => setCards(res.data));
  }, []);

  const cardSubmitHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (!data.name || !data.status) return; // название колонок

    axiosInstance
      .post('/', data)
      .then((res) => {
        setCards((prev) => [res.data, ...prev]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = (id) => {
    axiosInstance.delete(`/${id}`).then(() => {
      setCards((prev) => prev.filter((el) => el.id !== id));
    });
  };
  const editHandler = (id, updatedData) => {
    axiosInstance.put(`/${id}`, updatedData)
      .then((response) => {
        // Обновляем состояние карт после успешного обновления
        setCards((prev) => prev.map((card) => (card.id === id ? response.data : card)));
      })
      .catch((error) => {
        console.error("Ошибка при обновлении карточки:", error);
      });
  };

  return (
    <Row>
      {user.data && (
        <Col>
          <AppModal title="Создать" buttonText="Создать задачу">
            <TaskForm cardSubmitHandler={cardSubmitHandler} />
          </AppModal>
        </Col>
      )}
        <CardsWrapper
        cards={cards}
        deleteHandler={deleteHandler}
        user={user}
        showDeleteButton={true}
        editHandler={editHandler}
      />
    </Row>
  );
}

