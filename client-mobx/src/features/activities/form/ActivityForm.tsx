import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import { RouteComponentProps } from 'react-router-dom';

interface IParams {
  id: string;
}
export const ActivityForm: React.FC<RouteComponentProps<IParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity: create,
    editActivity: edit,
    submitting,
    activity,
    loadActivity,
    clearActivity
  } = activityStore;

  useEffect(() => {
    const { id } = match.params;
    if (id && activity && activity.id > 0) {
      loadActivity(parseInt(id)).then(() => activity && setActivity(activity));
    }
    return () => {
      clearActivity();
    };
  }, [loadActivity, clearActivity, match.params, activity]);

  const [sactivity, setActivity] = useState<IActivity>({
    id: 0,
    title: '',
    description: '',
    category: '',
    date: '',
    city: '',
    venue: ''
  });
  const { id, title, description, category, date, city, venue } = sactivity;
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...sactivity, [name]: value });
  };
  const handleSubmit = () => {
    //console.log(sactivity);
    id > 0
      ? edit(sactivity).then(() => history.push(`/activities/${sactivity.id}`))
      : create(sactivity).then(() =>
          history.push(`/activities/${sactivity.id}`)
        );
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
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push('/activities')}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
