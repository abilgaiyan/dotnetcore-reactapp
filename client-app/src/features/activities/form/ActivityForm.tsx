import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null;
  create: (activity: IActivity) => void;
  edit: (activity: IActivity) => void;
}
export const ActivityForm: React.FC<IProps> = props => {
  const { setEditMode, activity, create, edit } = props;
  const intializeForm = (): IActivity => {
    if (activity) {
      return activity;
    } else {
      return {
        id: 0,
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
      };
    }
  };

  const [sactivity, setActivity] = useState<IActivity>(intializeForm);
  const { id, title, description, category, date, city, venue } = sactivity;
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...sactivity, [name]: value });
  };
  const handleSubmit = () => {
    //console.log(sactivity);
    id > 0 ? edit(sactivity) : create(sactivity);
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          name="title"
          value={title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          name="description"
          value={description}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          value={category}
          onChange={handleInputChange}
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          name="date"
          value={date}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          name="city"
          value={city}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          name="venue"
          value={venue}
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
