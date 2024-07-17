import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function TaskForm({ cardSubmitHandler }) {
  return (
    <Form onSubmit={cardSubmitHandler}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Имя задачи</Form.Label>
        <Form.Control name="name" type="text" placeholder="Введите имя" /> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Описание задачи</Form.Label>
        <Form.Control name="description" type="text" placeholder="Введите описание" /> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDeadlines">
        <Form.Label>Сроки выполнения</Form.Label>
        <Form.Control name="deadlines" type="text" placeholder="Введите сроки выполнения" /> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Изображение</Form.Label>
        <Form.Control name="image" type="text" placeholder="Введите URL изображения" /> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStatus">
        <Form.Label>Статус выполнения</Form.Label>
        <Form.Select name="status">
          <option value="не начато">Не начато</option>
          <option value="в процессе">В процессе</option>
          <option value="завершено">Выполнено</option>
        </Form.Select>
      </Form.Group>
      <Button variant="outline-primary" type="submit">
        Добавить
      </Button>
    </Form>
  );
}