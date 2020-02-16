import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agents from '../api/agents';

configure({ enforceActions: 'always' });
class ActivityStore {
  @observable activitiesRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined = undefined;
  @observable intialLoading = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = '';

  @computed get activitiesByDate() {
    return Array.from(this.activitiesRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.intialLoading = true;
    try {
      const activities = await agents.Activities.list();
      runInAction('loading activites', () => {
        activities.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          this.activitiesRegistry.set(activity.id, activity);
        });
        this.intialLoading = false;
      });
    } catch (error) {
      runInAction('error in loading activities', () => {
        this.intialLoading = false;
      });
      console.log(error);
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      const ids = this.activities.map(a => a.id);

      await agents.Activities.create(activity);
      runInAction('create Activity', () => {
        activity.id = Math.max(...ids) + 1;
        this.activitiesRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction('error in create activity', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agents.Activities.update(activity);
      runInAction('update activity', () => {
        this.activitiesRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction('error in update activity', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;

    try {
      await agents.Activities.delete(id);
      runInAction(() => {
        this.activitiesRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.selectedActivity = undefined;
    this.editMode = true;
  };

  @action openEditForm = (id: number) => {
    this.selectedActivity = this.activitiesRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };
  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action selectActivity = (id: number) => {
    this.selectedActivity = this.activitiesRegistry.get(id);
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
