import React, { useState } from 'react';
import { render } from 'react-dom';
import { DateCalendar, Time } from './lib';

const PluginExample = () => {
  const [date, setDate] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);

  const style = {
    first: '#005E86',
    secondary: '#d70d2f'
  };

  const getSelectedDate = date => {
    setDate(date);
  };

  const getSelectedHours = (hours, meridiem) => {
    if (hours <= 12 && meridiem) {
      if (meridiem === 'PM') {
        hours += 12;
      }
    }

    setHours(hours);
  };

  const getSelectedMinutes = minutes => {
    setMinutes(minutes);
  };

  return (
    <div className="App">
      <DateCalendar
        lang={'it'}
        style={style}
        systemUS={false}
        image={'assets/calendar.svg'}
        arrow={'assets/arrowMonth.svg'}
        setDate={date}
        getSelectedDate={getSelectedDate}
        todayTxt={'AuJoUrDhUi'}
      />
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum odio id dui mattis, vel fermentum ex
        tempor. Aliquam venenatis in arcu a maximus. Maecenas tempus ac neque eget sollicitudin. Vestibulum interdum
        pretium pulvinar. Praesent lobortis aliquet placerat. Curabitur efficitur consectetur quam, nec interdum mauris
        dignissim sit amet. Praesent eros dolor, iaculis in convallis at, scelerisque quis enim. Pellentesque at turpis
        quis felis dapibus ullamcorper. Nunc vel luctus mi, eu congue neque. Nulla ornare arcu mauris. Nullam pretium,
        justo vitae lacinia dignissim, sapien arcu blandit arcu, eget auctor orci turpis ac urna. Duis quis lobortis
        urna. Vivamus aliquet, orci quis sodales ultrices, risus nibh volutpat diam, at blandit est libero quis erat.
        Phasellus ac rutrum risus, quis lacinia libero. Vivamus in ultrices mi. Vestibulum sit amet porta orci, quis
        tempor magna. Vestibulum blandit justo bibendum ligula aliquet consectetur. Curabitur ullamcorper felis id
        lobortis interdum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        Quisque odio est, gravida ut interdum ut, ultrices nec enim. Suspendisse mattis quis massa in semper. Morbi
        facilisis molestie imperdiet. Praesent condimentum dolor nisl, non congue magna finibus ut. Nunc sagittis enim
        vitae diam bibendum, consequat suscipit purus fringilla. Praesent tempor ante est, a condimentum dui venenatis
        ac. Nullam dictum, nisi nec fermentum pharetra, libero augue pretium urna, sed dapibus mauris ipsum eget enim.
        Ut ac volutpat orci. Mauris quam ipsum, eleifend vel erat at, auctor faucibus tellus. Aenean imperdiet, enim
        pretium consequat gravida, nisl est scelerisque nisi, ac ullamcorper arcu lectus vitae ipsum. Nunc ante erat,
        mattis ut nunc eget, maximus molestie eros. Suspendisse posuere finibus dapibus. Suspendisse feugiat egestas sem
        vitae vulputate. Proin viverra justo velit, et bibendum tortor placerat id. Morbi porta orci dolor, non porta
        libero porttitor at. Morbi dapibus ipsum at sollicitudin semper. Nunc ornare egestas lorem, ut aliquet risus
        ornare et. Pellentesque nisl massa, sollicitudin in tincidunt nec, placerat vel mauris. Duis vel scelerisque
        urna. Curabitur nulla sapien, scelerisque ac consectetur quis, lacinia non odio. Nunc volutpat purus dapibus
        velit aliquam dignissim. Donec convallis est at dignissim tincidunt. Nulla quis porta nibh, tristique volutpat
        libero. Etiam consequat velit convallis, viverra nisi a, iaculis dolor. Donec ut mi eget libero auctor ultrices.
        Curabitur id quam turpis. Ut sed accumsan sem, ac elementum magna. Nam ligula mi, dictum vehicula eros sit amet,
        pharetra cursus metus. Fusce non luctus lacus. Nulla sollicitudin, nibh nec rhoncus fringilla, turpis elit
        tempor lacus, eget dignissim magna nibh quis purus. In hac habitasse platea dictumst. Aliquam dignissim diam eu
        est vulputate sollicitudin. Proin viverra augue ut tortor dignissim lacinia. Suspendisse porttitor imperdiet
        augue quis malesuada. In hac habitasse platea dictumst. Nunc nec libero mauris. Proin vitae ultrices lorem.
        Vivamus ullamcorper venenatis gravida. Nulla diam eros, sagittis at purus ut, euismod blandit lectus. Nam a
        maximus libero. Suspendisse pretium egestas gravida. Vestibulum ex orci, suscipit vitae eros vitae, fermentum
        tempus quam.
      </div>
      <Time
        systemUS={true}
        style={style}
        isMobile={false}
        image={'assets/calendar.svg'}
        getSelectedHours={getSelectedHours}
        getSelectedMinutes={getSelectedMinutes}
        setHours={hours}
        setMinutes={minutes}
      />
    </div>
  );
};

const App = () => (
  <div style={{ width: 640, margin: '15px auto' }}>
    <h1>Hello React</h1>
    <PluginExample />
  </div>
);

render(<App />, document.getElementById('root'));
