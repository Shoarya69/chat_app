// import './user-profile.scss';
import React, { useState, useCallback, useEffect } from 'react';

// import notify from 'devextreme/ui/notify';

// import Toolbar, { Item } from 'devextreme-react/toolbar';
// import Button from 'devextreme-react/button';
// import ScrollView from 'devextreme-react/scroll-view';
// import { service } from '../../data/user-profile-service';
// import { FormPhoto } from '../../components';
// import { ProfileCard } from '../../components/library/profile-card/ProfileCard';
// import { withLoadPanel } from '../../utils/withLoadPanel';
// import { useScreenSize } from '../../utils/media-query';
// import { ChangeProfilePasswordForm } from '../../components/library/change-profile-password-form/ChangeProfilePasswordForm';

// import { getSupervisors, getProfile } from 'dx-template-gallery-data';

const PROFILE_ID = 22;

const copyToClipboard = (text) => (evt) => {
  window.navigator.clipboard?.writeText(text);
  notify(
    {
      message: 'Text copied',
      width: 'auto',
      position: { of: evt.element, offset: '0 -30' }
    },
    'info',
    500
  );
};

const formatPhone = (value) =>
  String(value).replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

const UserProfileContent = ({
  basicInfoItems,
  contactItems,
  addressItems,
  profileData,
  handleDataChanged,
  handleChangePasswordClick,
  handleContentScrolled,
}) => {
  const { isXSmall } = useScreenSize();

  const onScroll = useCallback(
    (reachedTop) => handleContentScrolled(reachedTop),
    [handleContentScrolled]
  );

  return (
    <ScrollView className="view-wrapper-scroll" onScroll={onScroll}>
      <div className="cards-container">
        <ProfileCard
          wrapperCssClass="profile-card basic-info-card"
          title="Basic Info"
          colCount={4}
          cardData={profileData}
          items={basicInfoItems}
          onDataChanged={handleDataChanged}
        >
          <div className="basic-info-top-item profile-card-top-item">
            <FormPhoto link={profileData?.image} editable size={80} />
            <div>
              <div className="title-text">{profileData?.name}</div>
              <div className="subtitle-text with-clipboard-copy">
                <span>ID: {profileData?.id}</span>
                <Button
                  icon="copy"
                  stylingMode="text"
                  onClick={copyToClipboard(profileData?.id)}
                />
              </div>
              <Button
                text="Change Password"
                icon={isXSmall ? undefined : 'lock'}
                onClick={handleChangePasswordClick}
              />
            </div>
          </div>
        </ProfileCard>
      </div>
    </ScrollView>
  );
};

const UserProfileContentWithLoadPanel = withLoadPanel(UserProfileContent);

const SelfProfile = () => {
  const [profileData, setProfileData] = useState();
  const [savedProfileData, setSavedProfileData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isChangePasswordPopupOpened, setIsChangedPasswordPopupOpened] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [basicInfoItems, setBasicInfoItems] = useState([]);
  const [contactItems, setContactItems] = useState([]);
  const [addressItems, setAddressItems] = useState([]);
  const [isContentScrolled, setIsContentScrolled] = useState(false);

  const dataChanged = useCallback(
    (data) => {
      setProfileData((prev) => ({ ...prev, ...data }));
      setIsDataChanged(true);
    },
    []
  );

  useEffect(() => {
    Promise.all([getSupervisors(), getProfile(PROFILE_ID)]).then(
      ([supervisors, profile]) => {
        setContactItems(service.getContactItems(supervisors));
        setProfileData(profile);
        setSavedProfileData(profile);
        setIsLoading(false);
      }
    );

    setBasicInfoItems(service.getBasicInfoItems());
    setAddressItems(service.getAddressItems());
  }, []);

  return <div className="view-host user-profile">...</div>;
};

export default SelfProfile;
