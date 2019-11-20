/* eslint-disable */

const mockApiWrapper = data => new Promise((resolve) => {
  setTimeout(() => {
    resolve(data);
  }, 1000);
});

export const MOCK_API = {
  auth: {
    login: () => mockApiWrapper(
      {
        'token': '05d09e685402a68710fece84186547e58fb93353',
        'profile': {
          'id': 20,
          'avatar': 'http://67.205.159.190:8000/media/images/syta-logo-2019_icuDYM5.png',
          'last_login': null,
          'is_superuser': false,
          'username': 'ankit@1337lab.io',
          'email': 'ankit@1337lab.io',
          'is_staff': false,
          'is_active': true,
          'date_joined': '2019-08-01T13:45:54Z',
          'first_name': 'Ankit',
          'last_name': 'Mhatre',
          'email_work': 'ankit@1337lab.io',
          'email_home': '',
          'phone_work': '',
          'phone_cell': '',
          'address1': '',
          'address2': '',
          'city': '',
          'state': '',
          'zip': '',
          'allow_email_work': false,
          'allow_email_home': false,
          'allow_mobile_sms': false,
          'company': {
            'id': 6,
            'name': '1337lab',
            'logo': 'http://67.205.159.190:8000/media/images/logo_sq.png',
            'address1': 'Mulund',
            'address2': '',
            'city': 'Mumbai',
            'state': 'MH',
            'zip': '400080',
            'phone': '9082633634',
            'url': 'www.1337lab.io',
            'contact_f_name': '',
            'contact_l_name': '',
            'contact_email': '',
            'contact_phone_work': '',
            'contact_phone_mobile': '',
          },
          'groups': [
            {
              'id': 4,
              'name': 'Registration',
              'permissions': [],
            },
            {
              'id': 5,
              'name': 'Attendee',
              'permissions': [],
            },
          ],
          'user_permissions': [],
        },
      },
    ),
    getProfile: () => mockApiWrapper(
      {
        'id': 3,
        'avatar': 'http://67.205.159.190:8000/media/images/IMG_20190501_151305.jpg',
        'last_login': null,
        'is_superuser': true,
        'username': 'ankit@1337lab.io',
        'email': 'ankit@1337lab.io',
        'is_staff': false,
        'is_active': true,
        'date_joined': '2019-08-07T13:07:27Z',
        'first_name': 'Ankit',
        'last_name': 'Mhatre(1337)',
        'email_work': 'ankit@1337lab.io',
        'email_home': '',
        'phone_work': '',
        'phone_cell': '',
        'address1': '',
        'address2': '',
        'city': '',
        'state': '',
        'zip': '',
        'allow_email_work': false,
        'allow_email_home': false,
        'allow_mobile_sms': false,
        'company': {
          'id': 2,
          'name': '1337 Lab',
          'logo': 'http://67.205.159.190:8000/media/images/logo_sq.png',
          'address1': 'Mulund West',
          'address2': '',
          'city': 'Mumbai',
          'state': 'Maharashtra',
          'zip': '400080',
          'phone': '9833301314',
          'url': 'www.1337lab.io',
          'contact_f_name': '',
          'contact_l_name': '',
          'contact_email': '',
          'contact_phone_work': '',
          'contact_phone_mobile': '',
        },
        'groups': [
          {
            'id': 2,
            'name': 'Registration',
            'permissions': [],
          },
          {
            'id': 3,
            'name': 'Security',
            'permissions': [],
          },
          {
            'id': 5,
            'name': 'Attendee',
            'permissions': [],
          },
        ],
        'user_permissions': [],
      },
    ),
    patchProfile: () => mockApiWrapper(
      {
        'id': 3,
        'avatar': 'http://67.205.159.190:8000/media/images/IMG_20190501_151305.jpg',
        'last_login': null,
        'is_superuser': true,
        'username': 'ankit@1337lab.io',
        'email': 'ankit@1337lab.io',
        'is_staff': false,
        'is_active': true,
        'date_joined': '2019-08-07T13:07:27Z',
        'first_name': 'Anket',
        'last_name': 'Mhatree',
        'email_work': 'ankit@1337lab.io',
        'email_home': '',
        'phone_work': '',
        'phone_cell': '',
        'address1': '',
        'address2': '',
        'city': '',
        'state': '',
        'zip': '',
        'allow_email_work': false,
        'allow_email_home': false,
        'allow_mobile_sms': false,
        'company': {
          'id': 2,
          'name': '1337 Lab',
          'logo': 'http://67.205.159.190:8000/media/images/logo_sq.png',
          'address1': 'Mulund West',
          'address2': '',
          'city': 'Mumbai',
          'state': 'Maharashtra',
          'zip': '400080',
          'phone': '9833301314',
          'url': 'www.1337lab.io',
          'contact_f_name': '',
          'contact_l_name': '',
          'contact_email': '',
          'contact_phone_work': '',
          'contact_phone_mobile': '',
        },
        'groups': [
          {
            'id': 2,
            'name': 'Registration',
            'permissions': [],
          },
          {
            'id': 3,
            'name': 'Security',
            'permissions': [],
          },
          {
            'id': 5,
            'name': 'Attendee',
            'permissions': [],
          },
        ],
        'user_permissions': [],
      },
    ),
  },
  home: {
    getHomeEventLive: () => mockApiWrapper(
      [
        {
          'event': {
            'id': 1,
            'name': '2019 SYTA Annual Conference',
            'logo': '/media/syta-logo-2019.png',
            'start_datetime': '2019-08-10T12:00:00Z',
            'end_datetime': '2019-09-15T22:00:00Z',
            'url': 'https://www.bjcc.org/',
            'description': '2019 Annual Conference of the Student & Youth Travel Association',
            'enable': true,
            'company': {
              'id': 3,
              'name': 'SYTA',
              'logo': '/media/images/SYTALogo09_4c-whitetext.png',
              'address1': '2231 Crystal Drive',
              'address2': 'Suite 204',
              'city': 'Arlington',
              'state': 'VA',
              'zip': '22202',
              'phone': '(703) 610-1263',
              'url': 'https://syta.org',
              'contact_f_name': '',
              'contact_l_name': '',
              'contact_email': '',
              'contact_phone_work': '',
              'contact_phone_mobile': '',
            },
            'venue': {
              'id': 1,
              'name': 'Birmingham-Jefferson Convention Complex',
              'logo': '/media/bjcc-logo.png',
              'address1': '2100 Richard Arrington',
              'address2': 'Jr. Blvd. N',
              'city': 'Birmingham',
              'state': 'AL',
              'zip': '35203',
              'opening_hours': '00:00:00',
              'closing_hours': '10:00:00',
              'closed_on_days': 'XXXXXXX',
              'url': 'https://www.bjcc.org/',
              'phone': '(205) 458-8400',
              'email': 'x@x.com',
              'manager_f_name': 'x',
              'manager_l_name': 'x',
              'manager_email': 'x@x.com',
              'manager_phone_work': '0',
              'manager_phone_mobile': '0',
              'enable': true,
              'category': {
                'id': 1,
                'name': 'Uncategorized',
              },
            },
          },
          'schedule': [
            {
              'id': 2,
              'name': 'Subevent02',
              'start_datetime': '2019-08-27T08:30:00Z',
              'end_datetime': '2019-08-27T10:30:00Z',
              'description': 'This is sub event 02 description.',
              'enable': true,
              'event': {
                'id': 1,
                'name': 'Event01',
                'logo': '/media/images/syta-logo-2019.png',
                'start_datetime': '2019-08-25T03:30:00Z',
                'end_datetime': '2019-08-28T10:30:00Z',
                'url': 'http://www.google.co.in',
                'description': 'This is a test event.',
                'enable': true,
                'company': 6,
                'venue': 1,
              },
            },
            {
              'id': 1,
              'name': 'Subevent01',
              'start_datetime': '2019-08-25T05:30:00Z',
              'end_datetime': '2019-08-25T07:30:00Z',
              'description': 'this is sub event 01 description',
              'enable': true,
              'event': {
                'id': 1,
                'name': 'Event01',
                'logo': '/media/images/syta-logo-2019.png',
                'start_datetime': '2019-08-25T03:30:00Z',
                'end_datetime': '2019-08-28T10:30:00Z',
                'url': 'http://www.google.co.in',
                'description': 'This is a test event.',
                'enable': true,
                'company': 6,
                'venue': 1,
              },
            },
          ],
        },
      ],
    ),
  },
  events: {
    getEventsComingUp: () => mockApiWrapper(
      [
        {
          'id': 1,
          'name': '2019 SYTA Annual Conference',
          'logo': '/media/syta-logo-2019.png',
          'start_datetime': '2019-08-10T12:00:00Z',
          'end_datetime': '2019-09-15T22:00:00Z',
          'url': 'https://www.bjcc.org/',
          'description': '2019 Annual Conference of the Student & Youth Travel Association',
          'enable': true,
          'company': {
            'id': 3,
            'name': 'SYTA',
            'logo': '/media/images/SYTALogo09_4c-whitetext.png',
            'address1': '2231 Crystal Drive',
            'address2': 'Suite 204',
            'city': 'Arlington',
            'state': 'VA',
            'zip': '22202',
            'phone': '(703) 610-1263',
            'url': 'https://syta.org',
            'contact_f_name': '',
            'contact_l_name': '',
            'contact_email': '',
            'contact_phone_work': '',
            'contact_phone_mobile': '',
          },
          'venue': {
            'id': 1,
            'name': 'Birmingham-Jefferson Convention Complex',
            'logo': '/media/bjcc-logo.png',
            'address1': '2100 Richard Arrington',
            'address2': 'Jr. Blvd. N',
            'city': 'Birmingham',
            'state': 'AL',
            'zip': '35203',
            'opening_hours': '00:00:00',
            'closing_hours': '10:00:00',
            'closed_on_days': 'XXXXXXX',
            'url': 'https://www.bjcc.org/',
            'phone': '(205) 458-8400',
            'email': 'x@x.com',
            'manager_f_name': 'x',
            'manager_l_name': 'x',
            'manager_email': 'x@x.com',
            'manager_phone_work': '0',
            'manager_phone_mobile': '0',
            'enable': true,
            'category': {
              'id': 1,
              'name': 'Uncategorized',
            },
          },
        },
      ],
    ),
    getEventsPast: () => mockApiWrapper(
      [
        {
          'id': 1,
          'name': '2019 SYTA Annual Conference',
          'logo': '/media/syta-logo-2019.png',
          'start_datetime': '2019-08-10T12:00:00Z',
          'end_datetime': '2019-09-15T22:00:00Z',
          'url': 'https://www.bjcc.org/',
          'description': '2019 Annual Conference of the Student & Youth Travel Association',
          'enable': true,
          'company': {
            'id': 3,
            'name': 'SYTA',
            'logo': '/media/images/SYTALogo09_4c-whitetext.png',
            'address1': '2231 Crystal Drive',
            'address2': 'Suite 204',
            'city': 'Arlington',
            'state': 'VA',
            'zip': '22202',
            'phone': '(703) 610-1263',
            'url': 'https://syta.org',
            'contact_f_name': '',
            'contact_l_name': '',
            'contact_email': '',
            'contact_phone_work': '',
            'contact_phone_mobile': '',
          },
          'venue': {
            'id': 1,
            'name': 'Birmingham-Jefferson Convention Complex',
            'logo': '/media/bjcc-logo.png',
            'address1': '2100 Richard Arrington',
            'address2': 'Jr. Blvd. N',
            'city': 'Birmingham',
            'state': 'AL',
            'zip': '35203',
            'opening_hours': '00:00:00',
            'closing_hours': '10:00:00',
            'closed_on_days': 'XXXXXXX',
            'url': 'https://www.bjcc.org/',
            'phone': '(205) 458-8400',
            'email': 'x@x.com',
            'manager_f_name': 'x',
            'manager_l_name': 'x',
            'manager_email': 'x@x.com',
            'manager_phone_work': '0',
            'manager_phone_mobile': '0',
            'enable': true,
            'category': {
              'id': 1,
              'name': 'Uncategorized',
            },
          },
        },
      ],
    ),
    getEventDetails: () => mockApiWrapper(
      {
        'event': {
          'id': 1,
          'name': '2019 SYTA Annual Conference',
          'logo': '/media/syta-logo-2019.png',
          'start_datetime': '2019-08-10T12:00:00Z',
          'end_datetime': '2019-09-15T22:00:00Z',
          'url': 'https://www.bjcc.org/',
          'description': '2019 Annual Conference of the Student & Youth Travel Association',
          'enable': true,
          'company': {
            'id': 3,
            'name': 'SYTA',
            'logo': '/media/images/SYTALogo09_4c-whitetext.png',
            'address1': '2231 Crystal Drive',
            'address2': 'Suite 204',
            'city': 'Arlington',
            'state': 'VA',
            'zip': '22202',
            'phone': '(703) 610-1263',
            'url': 'https://syta.org',
            'contact_f_name': '',
            'contact_l_name': '',
            'contact_email': '',
            'contact_phone_work': '',
            'contact_phone_mobile': '',
          },
          'venue': {
            'id': 1,
            'name': 'Birmingham-Jefferson Convention Complex',
            'logo': '/media/bjcc-logo.png',
            'address1': '2100 Richard Arrington',
            'address2': 'Jr. Blvd. N',
            'city': 'Birmingham',
            'state': 'AL',
            'zip': '35203',
            'latitude': 0.0,
            'longitude': 0.0,
            'opening_hours': '00:00:00',
            'closing_hours': '10:00:00',
            'closed_on_days': 'XXXXXXX',
            'url': 'https://www.bjcc.org/',
            'phone': '(205) 458-8400',
            'email': 'x@x.com',
            'manager_f_name': 'x',
            'manager_l_name': 'x',
            'manager_email': 'x@x.com',
            'manager_phone_work': '0',
            'manager_phone_mobile': '0',
            'enable': true,
            'category': {
              'id': 1,
              'name': 'Uncategorized',
            },
          },
        },

        'schedule': [
          {
            'id': 2,
            'name': 'Subevent02',
            'start_datetime': '2019-08-27T08:30:00Z',
            'end_datetime': '2019-08-27T10:30:00Z',
            'description': 'This is sub event 02 description.',
            'enable': true,
            'event': {
              'id': 1,
              'name': 'Event01',
              'logo': '/media/images/syta-logo-2019.png',
              'start_datetime': '2019-08-25T03:30:00Z',
              'end_datetime': '2019-08-28T10:30:00Z',
              'url': 'http://www.google.co.in',
              'description': 'This is a test event.',
              'enable': true,
              'company': 6,
              'venue': 1,
            },
          },
          {
            'id': 1,
            'name': 'Subevent01',
            'start_datetime': '2019-08-25T05:30:00Z',
            'end_datetime': '2019-08-25T07:30:00Z',
            'description': 'this is sub event 01 description',
            'enable': true,
            'event': {
              'id': 1,
              'name': 'Event01',
              'logo': '/media/images/syta-logo-2019.png',
              'start_datetime': '2019-08-25T03:30:00Z',
              'end_datetime': '2019-08-28T10:30:00Z',
              'url': 'http://www.google.co.in',
              'description': 'This is a test event.',
              'enable': true,
              'company': 6,
              'venue': 1,
            },
          },
        ],
        'venueinfo': [
          {
            'info': {
              'id': 1,
              'info': 'Route to Venue from Goregaon Station',
              'plans': '/media/x53637265656e5f53686f745f323031392d30382d30365f61745f31302e33392e32365f414d5f312e706e67',
              'venue': 1,
              'venue_info_type': 3,
            },
            'infotype': 'Route',
          },
        ],
      },
    ),
    getEventSchedules: () => mockApiWrapper(
      {
        'count': 4,
        'next': null,
        'previous': null,
        'results': [
          {
            'id': 1,
            'event_id': 1,
            'room_id': 1,
            'name': 'Education Session: Safety and Security Gaps During Tour Events',
            'start_datetime': '2019-08-12T13:30:00Z',
            'end_datetime': '2019-08-12T14:30:00Z',
            'description': 'Technological Application to Address Safety and Security Gaps During Tour Events',
            'enable': true,
            'event': {
              'id': 1,
              'name': '2019 SYTA Annual Conference',
              'logo': 'http://67.205.159.190:8000/media/syta-logo-2019.png',
              'start_datetime': '2019-08-10T12:00:00Z',
              'end_datetime': '2019-09-15T22:00:00Z',
              'url': 'https://www.bjcc.org/',
              'description': '2019 Annual Conference of the Student & Youth Travel Association',
              'enable': true,
              'company': {
                'id': 3,
                'name': 'SYTA',
                'logo': 'http://67.205.159.190:8000/media/images/SYTALogo09_4c-whitetext.png',
                'address1': '2231 Crystal Drive',
                'address2': 'Suite 204',
                'city': 'Arlington',
                'state': 'VA',
                'zip': '22202',
                'phone': '(703) 610-1263',
                'url': 'https://syta.org',
                'contact_f_name': '',
                'contact_l_name': '',
                'contact_email': '',
                'contact_phone_work': '',
                'contact_phone_mobile': '',
              },
              'venue': {
                'id': 1,
                'name': 'Birmingham-Jefferson Convention Complex',
                'logo': 'http://67.205.159.190:8000/media/bjcc-logo.png',
                'address1': '2100 Richard Arrington',
                'address2': 'Jr. Blvd. N',
                'city': 'Birmingham',
                'state': 'AL',
                'zip': '35203',
                'latitude': 0,
                'longitude': 0,
                'opening_hours': '00:00:00',
                'closing_hours': '10:00:00',
                'closed_on_days': 'XXXXXXX',
                'url': 'https://www.bjcc.org/',
                'phone': '(205) 458-8400',
                'email': 'x@x.com',
                'manager_f_name': 'x',
                'manager_l_name': 'x',
                'manager_email': 'x@x.com',
                'manager_phone_work': '0',
                'manager_phone_mobile': '0',
                'enable': true,
                'category': 3,
              },
            },
            'room': {
              'id': 1,
              'name': 'NA',
              'description': 'No Room Defined',
              'capacity': 0,
              'venue': {
                'id': 1,
                'name': 'Birmingham-Jefferson Convention Complex',
                'logo': 'http://67.205.159.190:8000/media/bjcc-logo.png',
                'address1': '2100 Richard Arrington',
                'address2': 'Jr. Blvd. N',
                'city': 'Birmingham',
                'state': 'AL',
                'zip': '35203',
                'latitude': 0,
                'longitude': 0,
                'opening_hours': '00:00:00',
                'closing_hours': '10:00:00',
                'closed_on_days': 'XXXXXXX',
                'url': 'https://www.bjcc.org/',
                'phone': '(205) 458-8400',
                'email': 'x@x.com',
                'manager_f_name': 'x',
                'manager_l_name': 'x',
                'manager_email': 'x@x.com',
                'manager_phone_work': '0',
                'manager_phone_mobile': '0',
                'enable': true,
                'category': 3,
              },
            },
          },
          {
            'id': 4,
            'event_id': 1,
            'room_id': 1,
            'name': 'The K Street Group / SecureMe Booth 1',
            'start_datetime': '2019-08-12T12:00:00Z',
            'end_datetime': '2019-08-12T22:00:00Z',
            'description': 'Demo of Secure Me product at Booth 1',
            'enable': false,
            'event': {
              'id': 1,
              'name': '2019 SYTA Annual Conference',
              'logo': 'http://67.205.159.190:8000/media/syta-logo-2019.png',
              'start_datetime': '2019-08-10T12:00:00Z',
              'end_datetime': '2019-09-15T22:00:00Z',
              'url': 'https://www.bjcc.org/',
              'description': '2019 Annual Conference of the Student & Youth Travel Association',
              'enable': true,
              'company': {
                'id': 3,
                'name': 'SYTA',
                'logo': 'http://67.205.159.190:8000/media/images/SYTALogo09_4c-whitetext.png',
                'address1': '2231 Crystal Drive',
                'address2': 'Suite 204',
                'city': 'Arlington',
                'state': 'VA',
                'zip': '22202',
                'phone': '(703) 610-1263',
                'url': 'https://syta.org',
                'contact_f_name': '',
                'contact_l_name': '',
                'contact_email': '',
                'contact_phone_work': '',
                'contact_phone_mobile': '',
              },
              'venue': {
                'id': 1,
                'name': 'Birmingham-Jefferson Convention Complex',
                'logo': 'http://67.205.159.190:8000/media/bjcc-logo.png',
                'address1': '2100 Richard Arrington',
                'address2': 'Jr. Blvd. N',
                'city': 'Birmingham',
                'state': 'AL',
                'zip': '35203',
                'latitude': 0,
                'longitude': 0,
                'opening_hours': '00:00:00',
                'closing_hours': '10:00:00',
                'closed_on_days': 'XXXXXXX',
                'url': 'https://www.bjcc.org/',
                'phone': '(205) 458-8400',
                'email': 'x@x.com',
                'manager_f_name': 'x',
                'manager_l_name': 'x',
                'manager_email': 'x@x.com',
                'manager_phone_work': '0',
                'manager_phone_mobile': '0',
                'enable': true,
                'category': 3,
              },
            },
            'room': {
              'id': 1,
              'name': 'NA',
              'description': 'No Room Defined',
              'capacity': 0,
              'venue': {
                'id': 1,
                'name': 'Birmingham-Jefferson Convention Complex',
                'logo': 'http://67.205.159.190:8000/media/bjcc-logo.png',
                'address1': '2100 Richard Arrington',
                'address2': 'Jr. Blvd. N',
                'city': 'Birmingham',
                'state': 'AL',
                'zip': '35203',
                'latitude': 0,
                'longitude': 0,
                'opening_hours': '00:00:00',
                'closing_hours': '10:00:00',
                'closed_on_days': 'XXXXXXX',
                'url': 'https://www.bjcc.org/',
                'phone': '(205) 458-8400',
                'email': 'x@x.com',
                'manager_f_name': 'x',
                'manager_l_name': 'x',
                'manager_email': 'x@x.com',
                'manager_phone_work': '0',
                'manager_phone_mobile': '0',
                'enable': true,
                'category': 3,
              },
            },
          },
          {
            'id': 3,
            'event_id': 1,
            'room_id': 1,
            'name': 'The K Street Group / SecureMe Booth 2',
            'start_datetime': '2019-08-11T12:00:00Z',
            'end_datetime': '2019-08-11T22:00:00Z',
            'description': 'Demo of Secure Me product at Booth 2',
            'enable': true,
            'event': {
              'id': 1,
              'name': '2019 SYTA Annual Conference',
              'logo': 'http://67.205.159.190:8000/media/syta-logo-2019.png',
              'start_datetime': '2019-08-10T12:00:00Z',
              'end_datetime': '2019-09-15T22:00:00Z',
              'url': 'https://www.bjcc.org/',
              'description': '2019 Annual Conference of the Student & Youth Travel Association',
              'enable': true,
              'company': {
                'id': 3,
                'name': 'SYTA',
                'logo': 'http://67.205.159.190:8000/media/images/SYTALogo09_4c-whitetext.png',
                'address1': '2231 Crystal Drive',
                'address2': 'Suite 204',
                'city': 'Arlington',
                'state': 'VA',
                'zip': '22202',
                'phone': '(703) 610-1263',
                'url': 'https://syta.org',
                'contact_f_name': '',
                'contact_l_name': '',
                'contact_email': '',
                'contact_phone_work': '',
                'contact_phone_mobile': '',
              },
              'venue': {
                'id': 1,
                'name': 'Birmingham-Jefferson Convention Complex',
                'logo': 'http://67.205.159.190:8000/media/bjcc-logo.png',
                'address1': '2100 Richard Arrington',
                'address2': 'Jr. Blvd. N',
                'city': 'Birmingham',
                'state': 'AL',
                'zip': '35203',
                'latitude': 0,
                'longitude': 0,
                'opening_hours': '00:00:00',
                'closing_hours': '10:00:00',
                'closed_on_days': 'XXXXXXX',
                'url': 'https://www.bjcc.org/',
                'phone': '(205) 458-8400',
                'email': 'x@x.com',
                'manager_f_name': 'x',
                'manager_l_name': 'x',
                'manager_email': 'x@x.com',
                'manager_phone_work': '0',
                'manager_phone_mobile': '0',
                'enable': true,
                'category': 3,
              },
            },
            'room': {
              'id': 1,
              'name': 'NA',
              'description': 'No Room Defined',
              'capacity': 0,
              'venue': {
                'id': 1,
                'name': 'Birmingham-Jefferson Convention Complex',
                'logo': 'http://67.205.159.190:8000/media/bjcc-logo.png',
                'address1': '2100 Richard Arrington',
                'address2': 'Jr. Blvd. N',
                'city': 'Birmingham',
                'state': 'AL',
                'zip': '35203',
                'latitude': 0,
                'longitude': 0,
                'opening_hours': '00:00:00',
                'closing_hours': '10:00:00',
                'closed_on_days': 'XXXXXXX',
                'url': 'https://www.bjcc.org/',
                'phone': '(205) 458-8400',
                'email': 'x@x.com',
                'manager_f_name': 'x',
                'manager_l_name': 'x',
                'manager_email': 'x@x.com',
                'manager_phone_work': '0',
                'manager_phone_mobile': '0',
                'enable': true,
                'category': 3,
              },
            },
          },
          {
            'id': 2,
            'event_id': 1,
            'room_id': 1,
            'name': 'The K Street Group / SecureMe Booth 3',
            'start_datetime': '2019-08-10T12:00:00Z',
            'end_datetime': '2019-08-10T22:00:00Z',
            'description': 'Demo of Secure Me product at booth 3',
            'enable': true,
            'event': {
              'id': 1,
              'name': '2019 SYTA Annual Conference',
              'logo': 'http://67.205.159.190:8000/media/syta-logo-2019.png',
              'start_datetime': '2019-08-10T12:00:00Z',
              'end_datetime': '2019-09-15T22:00:00Z',
              'url': 'https://www.bjcc.org/',
              'description': '2019 Annual Conference of the Student & Youth Travel Association',
              'enable': true,
              'company': {
                'id': 3,
                'name': 'SYTA',
                'logo': 'http://67.205.159.190:8000/media/images/SYTALogo09_4c-whitetext.png',
                'address1': '2231 Crystal Drive',
                'address2': 'Suite 204',
                'city': 'Arlington',
                'state': 'VA',
                'zip': '22202',
                'phone': '(703) 610-1263',
                'url': 'https://syta.org',
                'contact_f_name': '',
                'contact_l_name': '',
                'contact_email': '',
                'contact_phone_work': '',
                'contact_phone_mobile': '',
              },
              'venue': {
                'id': 1,
                'name': 'Birmingham-Jefferson Convention Complex',
                'logo': 'http://67.205.159.190:8000/media/bjcc-logo.png',
                'address1': '2100 Richard Arrington',
                'address2': 'Jr. Blvd. N',
                'city': 'Birmingham',
                'state': 'AL',
                'zip': '35203',
                'latitude': 0,
                'longitude': 0,
                'opening_hours': '00:00:00',
                'closing_hours': '10:00:00',
                'closed_on_days': 'XXXXXXX',
                'url': 'https://www.bjcc.org/',
                'phone': '(205) 458-8400',
                'email': 'x@x.com',
                'manager_f_name': 'x',
                'manager_l_name': 'x',
                'manager_email': 'x@x.com',
                'manager_phone_work': '0',
                'manager_phone_mobile': '0',
                'enable': true,
                'category': 3,
              },
            },
            'room': {
              'id': 1,
              'name': 'NA',
              'description': 'No Room Defined',
              'capacity': 0,
              'venue': {
                'id': 1,
                'name': 'Birmingham-Jefferson Convention Complex',
                'logo': 'http://67.205.159.190:8000/media/bjcc-logo.png',
                'address1': '2100 Richard Arrington',
                'address2': 'Jr. Blvd. N',
                'city': 'Birmingham',
                'state': 'AL',
                'zip': '35203',
                'latitude': 0,
                'longitude': 0,
                'opening_hours': '00:00:00',
                'closing_hours': '10:00:00',
                'closed_on_days': 'XXXXXXX',
                'url': 'https://www.bjcc.org/',
                'phone': '(205) 458-8400',
                'email': 'x@x.com',
                'manager_f_name': 'x',
                'manager_l_name': 'x',
                'manager_email': 'x@x.com',
                'manager_phone_work': '0',
                'manager_phone_mobile': '0',
                'enable': true,
                'category': 3,
              },
            },
          },
        ],
      },
    ),
  },
};