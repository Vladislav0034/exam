import Row from 'react-bootstrap/esm/Row';
import TaskCard from './TaskCard';

export default function CardsWrapper({ cards, user, deleteHandler, showDeleteButton, editHandler }) {
  return (
    <Row className="mt-3">
      {cards.map((card) => (
        <TaskCard
          key={card.id}
          card={card}
          user={user}
          deleteHandler={deleteHandler}
          showDeleteButton={showDeleteButton}
          editHandler={editHandler}
        />
      ))}
    </Row>
  );
}
