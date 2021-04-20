// import React from 'react';
// import 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAURsom7c-jmbNERN0wVqb4OzVten2Hy24&callback=initAutocomplete&libraries=places&v=weekly';

// class ParlorForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = this.initialState();
//     this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.autocomplete = null;
//   }

//   componentDidMount() {
//     this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {});

//     this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
//   }

//   initialState() {
//     return {
//       name: '',
//       street_address: '',
//       city: '',
//       state: '',

//       googleMapLink: '',
//     };
//   }

//   handleChange(event) {
//     this.setState({ [event.target.name]: event.target.value });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     this.props.dispatch(addParlor(this.state));
//     this.clearForm();
//   }

//   handlePlaceSelect() {
//     let addressObject = this.autocomplete.getPlace();
//     let address = addressObject.address_components;
//     console.log(address);
//     this.setState({
//       name: addressObject.name,
//       street_address: `${address[2].long_name}  `,
//       city: address[4].long_name,
//       state: address[6].short_name,
//       googleMapLink: addressObject.url,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <h1>Add New Parlor</h1>
//         <form onSubmit={this.handleSubmit}>
//           <input id="autocomplete" className="input-field" ref="input" type="text" />
//           <input name={'name'} value={this.state.name} placeholder={'Name'} onChange={this.handleChange} />
//           <input name={'street_address'} value={this.state.street_address} placeholder={'Ville'} onChange={this.handleChange} />
//           <input name={'city'} value={this.state.city} placeholder={'City'} onChange={this.handleChange} />
//           <input name={'state'} value={this.state.state} placeholder={'Postal'} onChange={this.handleChange} />
//         </form>
//       </div>
//     );
//   }
// }

// export default ParlorForm;
