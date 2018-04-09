import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './_team.scss';
import Icon from '../icon';
import Github from '../icon/github.icon';
import LinkedIn from '../icon/linkedin.icon';
import Twitter from '../icon/twitter.icon'

const TeamListing = props =>
  (<section className="team" id="team">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h4 className="team-title">The Dream Team</h4>
        </div>
      </div>
      <div className="row">
        {props.data.map((item, i) =>
          (<div className="col-sm-4">
            <div className="card" key={i}>
              <div className="card-header">{item.name}</div>
              <img className="card-img-top" src={item.picture} alt="Card image" />
              <div className="card-body">{item.description}</div>
              <div className="card-footer">
                { item.linkedin !== '' ? (
                  <a href={item.linkedin}>
                    <Icon icon={LinkedIn} width={30} height={24} fill={'#fff'}/>
                  </a>
                ) : (
                  <Icon icon={LinkedIn} width={30} height={24} fill={'#fff'}/>
                )

                }
                { item.github !== '' ? (
                  <a href={item.github}>
                    <Icon icon={Github} width={30} height={24} fill={'#000'}/>
                  </a>
                ) : (
                  <Icon icon={Github} width={30} height={24} fill={'#000'}/>
                )
                }
                <Icon icon={Twitter} width={30} height={24} fill={'#fff'}/>
              </div>
            </div>
          </div>),
        )}
      </div>
    </div>
  </section>);

export default TeamListing;
