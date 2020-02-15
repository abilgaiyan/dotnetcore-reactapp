import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from './../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agents from '../api/agents';
import LoadingComponent from './LoadingComponent';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectedActivity = (id: number) => {
    setSelectedActivity(activities.filter(activity => activity.id === id)[0]);
    setEditMode(false);
    //console.log(id, selectedActivity);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = async (activity: IActivity) => {
    //activity.id = Math.max.apply(activities.map(a => a.id)) + 1;
    const ids = activities.map(a => a.id);

    activity.id = Math.max(...ids) + 1;
    setSubmitting(true);
    await agents.Activities.create(activity);

    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
    setSubmitting(false);

    // console.log(activity);
    // console.log(activities);
  };

  const handleEditActivity = async (activity: IActivity) => {
    setSubmitting(true);
    await agents.Activities.update(activity);
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
    setSubmitting(false);
  };
  const handleDeleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    await agents.Activities.delete(id);
    setActivities([...activities.filter(a => a.id !== id)]);
    setSubmitting(false);
  };
  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      const result = await agents.Activities.list();
      // .then(response => {
      //   setActivities(response.data);
      // });
      let activities: IActivity[] = [];
      result.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
    };
    fetchActivities();
  }, []);

  if (loading) return <LoadingComponent content="Loading activities ..." />;
  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectedActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
