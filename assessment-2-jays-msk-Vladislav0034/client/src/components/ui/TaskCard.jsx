import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function TaskCard({ card, user, deleteHandler, showDeleteButton, editHandler }) {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: card.name,
    description: card.description,
    image: card.image,
    deadlines: card.deadlines,
    status: card.status,
  });
 

  const handleViewDetails = () => {
    setShowModal(true);
    setEditMode(false);
  };

  const handleEditClick = () => {
    setShowModal(true);
    setEditMode(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editHandler(card.id, formData);
    setShowModal(false);
  };
  return (
    <>
      <Col md={4} className="mt-2 position-relative">
        <Card>
          <Card.Img variant="top" src={card.image} alt={`${card.name} image`} />
          <Card.Body>
            <h2 className="p-2">Название задачи: {card.name}</h2>
            <p className="p-2">Описание: {card.description}</p>
            <p className="p-2">Сроки выполнения: {card.deadlines}</p>
            <p className="p-2">Статус: {card.status}</p>
            <div className="d-flex flex-row justify-content-end gap-2 p-2">
              <Button
                onClick={handleViewDetails}
                variant="outline-primary"
                className="mb-2"
              >
                Подробнее
              </Button>
              {showDeleteButton && user.data && user.data.id === card.userId && (
                <>
                  <Button
                    onClick={() => handleEditClick()}
                    variant="outline-warning"
                    className="mb-2"
                  >
                    Редактировать
                  </Button>
                  <Button
                    onClick={() => deleteHandler(card.id)}
                    variant="outline-danger"
                    className="mb-2"
                  >
                    Удалить
                  </Button>
                </>
              )}
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Редактировать задачу' : 'Подробнее о задаче'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editMode ? (
            <Form onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Имя задачи</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Описание задачи</Form.Label>
                <Form.Control
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDeadline">
                <Form.Label>Сроки выполнения</Form.Label>
                <Form.Control
                  name="deadlines"
                  type="text"
                  value={formData.deadlines}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStatus">
        <Form.Label>Статус выполнения</Form.Label>
        <Form.Select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="не начато">Не начато</option>
          <option value="В процессе">В процессе</option>
          <option value="Выполнено">Выполнено</option>
        </Form.Select>
      </Form.Group>
              <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>URL изображения</Form.Label>
                <Form.Control
                  name="image"
                  type="text"
                  value={formData.image}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Сохранить изменения
              </Button>
            </Form>
          ) : (
            <>
              <Card.Img variant="top" src={card.image} alt={`${card.name} image`} />
              <h2>{card.name}</h2>
              <p>Описание: {card.description}</p>
              <p>Сроки выполнения: {card.deadlines}</p>
              <p>Статус: {card.status}</p>
               {/* доп инфу сюда */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


