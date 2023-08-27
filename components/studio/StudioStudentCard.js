import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { unenrollStudio } from '../../utils/data/studioData';
import assignment from '../../src/assets/images/assignment-icon.png';
import trash from '../../src/assets/images/delete-icon.png';

function StudioStudentCard({ studioStudentObj, onUpdate }) {
  const router = useRouter();
  const { id } = router.query;

  const unenroll = () => {
    if (window.confirm(`Unenroll ${studioStudentObj.student_id.first_name}?`)) {
      unenrollStudio(id, studioStudentObj.student_id.uid).then(() => onUpdate());
    }
  };

  const handleClick = () => {
    router.push(`/students/${studioStudentObj.student_id.id}`);
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header>{studioStudentObj.student_id.first_name} {studioStudentObj.student_id.last_name}</Card.Header>
        <Card.Body>
          <div className="btn-container">
            <Button onClick={handleClick}>
              <Image src={assignment} alt="assignment icon" />
            </Button>
            <Button onClick={unenroll} className="delete-btn">
              <Image src={trash} alt="remove student icon" />
            </Button>
          </div>
          <Card.Text>{studioStudentObj.student_id.pronouns}</Card.Text>
          <Card.Img className="img" src={studioStudentObj.student_id.profile_image_url} alt="student" />
        </Card.Body>
        <Card.Footer className="text-muted">{studioStudentObj.student_id.instrument}</Card.Footer>
      </Card>
    </>
  );
}

StudioStudentCard.propTypes = {
  studioStudentObj: PropTypes.shape({
    id: PropTypes.number,
    student_id: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      pronouns: PropTypes.string,
      instrument: PropTypes.string,
      profile_image_url: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default StudioStudentCard;
