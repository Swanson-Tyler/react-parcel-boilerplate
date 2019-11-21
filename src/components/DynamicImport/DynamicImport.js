import React from 'react';

class DynamicImport extends React.Component {
  constructor() {
    super();
    this.state = {
      component: null
    };
  }

  componentDidMount() {
    const { load } = this.props;
    load().then(component => {
      this.setState(() => ({
        component: component.default ? component.default : component
      }));
    });
  }

  render() {
    const { children } = this.props;
    const { component } = this.state;

    return children(component);
  }
}

export default DynamicImport;
