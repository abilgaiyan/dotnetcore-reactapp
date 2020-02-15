import React, { SyntheticEvent } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
interface IProps {
  activities: IActivity[];
  selectActivity: (id: number) => void;
  deleteActivity: (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => void;
  submitting: boolean;
  target: string;
}

export const ActivityList: React.FC<IProps> = props => {
  const {
    activities,
    selectActivity,
    deleteActivity,
    submitting,
    target
  } = props;
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map((activity: IActivity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city} ,{activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => selectActivity(activity.id)}
                />
                <Button
                  name={activity.id}
                  loading={target === activity.id.toString() && submitting}
                  floated="right"
                  content="Delete"
                  color="red"
                  onClick={(event: SyntheticEvent<HTMLButtonElement>) =>
                    deleteActivity(event, activity.id)
                  }
                />

                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
