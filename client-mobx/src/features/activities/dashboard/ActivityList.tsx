import React, { useContext } from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import { ActivityListItem } from './ActivityListItem';

export const ActivityList: React.FC = () => {
  const storeActivity = useContext(ActivityStore);
  const { activitiesByDate } = storeActivity;

  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity: IActivity) => (
          <ActivityListItem key={activity.id} activity={activity} />
        ))}
      </Item.Group>
    </Segment>
  );
};
export default observer(ActivityList);
