<div class="row" v-for="(address, j) in addresses" :key="j">
          <div class="col-md-3">
            <div class="form-group">
              <label for="organizer-province">Provincia</label>
              <input type="text"
              :class="{'form-control': true, 'is-input-danger': errors.has('address.province')}"
              name="address.province"
              v-model="address.province"
              id="Organizer-Province"
              placeholder="Provincia"
              v-validate="'required'"
              :disabled="isEditable"
              data-vv-as="Provincia" />
              <span v-show="errors.has('address.province')" class="help is-danger">{{ errors.first('address.province') }}</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="organizer-municipality">Municipio</label>
              <input type="text"
              :class="{'form-control': true, 'is-input-danger': errors.has('address.municipality')}"
              name="address.municipality"
              v-model="address.municipality"
              id="Organizer-Municipality"
              placeholder="Municipio"
              v-validate="'required'"
              :disabled="isEditable"
              data-vv-as="Municipio" />
              <span v-show="errors.has('address.municipality')" class="help is-danger">{{ errors.first('address.municipality') }}</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="organizer-address">Bairro</label>
              <input type="text"
              :class="{'form-control': true, 'is-input-danger': errors.has('address.address')}"
              name="address.address"
              v-model="address.address"
              id="Organizer-Address"
              placeholder="Bairro"
              v-validate="'required'"
              :disabled="isEditable"
              data-vv-as="bairro" />
              <span v-show="errors.has('address.address')" class="help is-danger">{{ errors.first('address.address') }}</span>
            </div>
          </div>
          <div class="col-md-1 btns">
              <span class="addOrRemove">
                  <i class="fa fa-minus-circle" @click="removeAddress(j)" v-show="(j  || ( !j && addresses.length > 1)) && (j != addresses.length-1) "></i>
                  <i class="fa fa-plus-circle" @click="addNewAddress(j)" v-show="j == addresses.length-1"></i>
                  <b-button variant="success" size="sm" class="float-right" @click="addAddress" v-show="j == addresses.length-1">
                    <span v-if="!isRequestingAddress">Salvar</span>
                    <div class="loading-dots" v-if="isRequestingAddress">
                      <div class="loading-dots--dot"></div>
                      <div class="loading-dots--dot"></div>
                      <div class="loading-dots--dot"></div>
                    </div>
                </b-button>
              </span>
          </div>
      </div>
      <div class="row">
        <div class="col-md-3" >
            <label for="">Email</label>
            <div class="form-group" >
              <div class="col-md-12" v-for="(email,k) in emails" :key="k">
                <input type="text"
                :class="{'form-control': true, 'is-input-danger': errors.has('email.email')}"
                id="Organizer-email"
                name="email.email"
                placeholder="Email(s) de Contacto"
                v-model="email.email"
                :disabled="isEditable"
                v-validate="'required|email'"
                data-vv-as="Email(s)"/>
                <span class="addOrRemove">
                    <i class="fa fa-minus-circle" @click="remove(k,'email')" v-show="(k  || ( !k && emails.length > 1)) && (k != emails.length-1) "></i>
                    <i class="fa fa-plus-circle" @click="add(k,'email')" v-show="k == emails.length-1"></i>
                </span>
            </div>
              <p><span v-show="errors.has('email.email')" class="help is-danger">{{ errors.first('email.email') }}</span></p>
              <b-button
                variant="success"
                size="sm"
                class="float-left"
                @click="addEmail"
              >
                <span v-if="!isRequestingEmail">Salvar</span>
                <div class="loading-dots" v-if="isRequestingEmail">
                  <div class="loading-dots--dot"></div>
                  <div class="loading-dots--dot"></div>
                  <div class="loading-dots--dot"></div>
                </div>
              </b-button>
          </div>
        </div>
        <div class="col-md-3" >
            <label for="">Telefone</label>
            <div class="form-group" >
              <div class="col-md-12" v-for="(telephone,k) in telephones" :key="k">
                <input type="text"
                :class="{'form-control': true, 'is-input-danger': errors.has('telephone.phone_number')}"
                id="Organizer-Telephone"
                name="telephone.phone_number"
                placeholder="Telefone(s) de Contacto"
                v-model="telephone.phone_number"
                :disabled="isEditable"
                v-validate="'required'"
                data-vv-as="Telefone(s)" />
                <span class="addOrRemove">
                    <i class="fa fa-minus-circle" @click="remove(k,'phone')" v-show="(k  || ( !k && telephones.length > 1)) && (k != telephones.length-1) "></i>
                    <i class="fa fa-plus-circle" @click="add(k,'phone')" v-show="k == telephones.length-1"></i>
                </span>
            </div>
              <span v-show="errors.has('telephone.phone_number')" class="help is-danger">{{ errors.first('telephone.phone_number') }}</span>
              <b-button
                  variant="success"
                  size="sm"
                  class="float-left"
                  @click="addTelephone"
              >
                <span v-if="!isRequestingTel">Salvar</span>
                <div class="loading-dots" v-if="isRequestingTel">
                  <div class="loading-dots--dot"></div>
                  <div class="loading-dots--dot"></div>
                  <div class="loading-dots--dot"></div>
                </div>
              </b-button>
          </div>
        </div>
      </div>

<div class="organizer-text">
                <div class="organizer-name-box">
                  <h3>{{ form.name }}</h3>
                </div>
                <div class="organizer-description">
                  <p>sdlkfskjfhsd dsflkhdslifhfds sd dsofhdsifhidsf souhdsfoishdfoihdsfs d sdpdsfpihsdpihfsfd phdsfihdsfihsdfihfds  spohfdsihidshoifdshois sdfdsfdsf</p>
                </div>
              </div>
            </div>
